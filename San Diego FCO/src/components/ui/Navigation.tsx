import { ArrowLeft } from 'lucide-react'
import { Button } from './Button'

interface NavigationProps {
  onBack?: () => void
  showBack?: boolean
  currentStep?: string
}

export function Navigation({ onBack, showBack = true, currentStep }: NavigationProps) {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBack && (
              <Button
                variant="ghost"
                onClick={onBack || (() => window.history.back())}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
            )}
            {currentStep && (
              <span className="text-sm text-gray-500">{currentStep}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}