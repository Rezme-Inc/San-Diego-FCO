import { useEffect, useState } from 'react'

interface CountdownTimerProps {
  deadline: number // number of business days
  startDate: string
  accuracyChallenged?: boolean
  businessDays?: boolean
}

function addBusinessDays(date: Date, days: number): Date {
  const result = new Date(date)
  let addedDays = 0
  while (addedDays < days) {
    result.setDate(result.getDate() + 1)
    if (result.getDay() !== 0 && result.getDay() !== 6) {
      addedDays++
    }
  }
  return result
}

function isBusinessDay(date: Date): boolean {
  const day = date.getDay()
  return day !== 0 && day !== 6
}

function getBusinessDaysUntil(endDate: Date): number {
  const now = new Date()
  let businessDays = 0
  const currentDate = new Date(now)

  while (currentDate < endDate) {
    if (isBusinessDay(currentDate)) {
      businessDays++
    }
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return businessDays
}

export function CountdownTimer({ deadline, startDate, accuracyChallenged = false, businessDays = false }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
    businessDays?: number
  } | null>(null)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const startDateTime = new Date(startDate)
    const totalDays = accuracyChallenged ? deadline + 5 : deadline
    const endDateTime = addBusinessDays(startDateTime, totalDays)

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = endDateTime.getTime() - now.getTime()

      if (difference <= 0) {
        setIsExpired(true)
        return null
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)
      const remainingBusinessDays = getBusinessDaysUntil(endDateTime)

      return {
        days,
        hours,
        minutes,
        seconds,
        businessDays: remainingBusinessDays
      }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [deadline, startDate, accuracyChallenged])

  if (isExpired) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <p className="text-yellow-800 font-medium">Response period has expired</p>
      </div>
    )
  }

  if (!timeLeft) return null

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4">
      <h4 className="text-sm font-medium text-gray-700 mb-3">Time Remaining for Response:</h4>
      <div className="grid grid-cols-4 gap-2 text-center">
        {businessDays ? (
          <div className="col-span-4 bg-blue-50 p-4 rounded">
            <div className="text-3xl font-bold text-blue-700">{timeLeft.businessDays}</div>
            <div className="text-sm text-blue-600">Business Days Remaining</div>
          </div>
        ) : (
          <>
            <div className="bg-blue-50 p-2 rounded">
              <div className="text-2xl font-bold text-blue-700">{timeLeft.days}</div>
              <div className="text-xs text-blue-600">Days</div>
            </div>
            <div className="bg-blue-50 p-2 rounded">
              <div className="text-2xl font-bold text-blue-700">{timeLeft.hours}</div>
              <div className="text-xs text-blue-600">Hours</div>
            </div>
            <div className="bg-blue-50 p-2 rounded">
              <div className="text-2xl font-bold text-blue-700">{timeLeft.minutes}</div>
              <div className="text-xs text-blue-600">Minutes</div>
            </div>
            <div className="bg-blue-50 p-2 rounded">
              <div className="text-2xl font-bold text-blue-700">{timeLeft.seconds}</div>
              <div className="text-xs text-blue-600">Seconds</div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}