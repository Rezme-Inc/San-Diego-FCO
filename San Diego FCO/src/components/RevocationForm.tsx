import { useForm } from 'react-hook-form'
import { Button } from './ui/Button'
import { Navigation } from './ui/Navigation'
import { useState, useEffect } from 'react'
import { Mail, CheckCircle2, FileText } from 'lucide-react'
import { CountdownTimer } from './ui/CountdownTimer'
import { IndividualReassessmentForm } from './IndividualReassessmentForm'
import { loadFormData } from '../lib/storage'

interface RevocationFormData {
  date: string
  applicantName: string
  position: string
  convictions: string[]
  conductSeriousness: string
  timeElapsedSinceConduct: string
  timeElapsedSinceRelease: string
  jobDuties: string[]
  reasoningForRevocation: string
  employerName: string
  employerCompany: string
  responseDeadline: number
  responseEmail: string
}

interface AssessmentData {
  employerName: string
  applicantName: string
  positionApplied: string
  jobDuties: string[]
  criminalConduct: string
  convictionMonth: string
  convictionYear: string
  dateConditionalOffer: string
  assessmentPerformer: string
  rescindReason?: string
  activities: {
    workExperience: 'yes' | 'no'
    workExperienceDetails?: string
    jobTraining: 'yes' | 'no'
    jobTrainingDetails?: string
    education: 'yes' | 'no'
    educationDetails?: string
    counseling: 'yes' | 'no'
    counselingDetails?: string
    rehabilitation: 'yes' | 'no'
    rehabilitationDetails?: string
    communityService: 'yes' | 'no'
    communityServiceDetails?: string
  }
}

interface RevocationFormProps {
  assessmentData: AssessmentData | null
  onBack: () => void
}

function calculateTimeElapsed(convictionMonth: string, convictionYear: string, conditionalOfferDate: string): string {
  const conviction = new Date(parseInt(convictionYear), parseInt(convictionMonth) - 1)
  const offer = new Date(conditionalOfferDate)
  
  const yearDiff = offer.getFullYear() - conviction.getFullYear()
  const monthDiff = offer.getMonth() - conviction.getMonth()
  
  const totalMonths = yearDiff * 12 + monthDiff
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12

  if (years === 0) {
    return `${months} month${months !== 1 ? 's' : ''}`
  } else if (months === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`
  } else {
    return `${years} year${years !== 1 ? 's' : ''} and ${months} month${months !== 1 ? 's' : ''}`
  }
}

function formatActivityDetails(activity: 'yes' | 'no', details?: string): string {
  if (activity === 'no') return 'No'
  return details ? `Yes - ${details}` : 'Yes'
}

export function RevocationForm({ assessmentData, onBack }: RevocationFormProps) {
  const savedData = loadFormData()
  const combinedData = {
    ...savedData,
    ...assessmentData
  }

  const timeElapsed = combinedData ? 
    calculateTimeElapsed(
      combinedData.convictionMonth,
      combinedData.convictionYear,
      combinedData.dateConditionalOffer
    ) : ''

  const { register, handleSubmit, watch } = useForm<RevocationFormData>({
    defaultValues: {
      applicantName: combinedData?.applicantName || '',
      position: combinedData?.positionApplied || '',
      jobDuties: combinedData?.jobDuties || [''],
      employerName: combinedData?.assessmentPerformer || '',
      employerCompany: combinedData?.employerName || '',
      conductSeriousness: combinedData?.criminalConduct || '',
      timeElapsedSinceConduct: timeElapsed,
      reasoningForRevocation: combinedData?.rescindReason || '',
      responseDeadline: 5
    }
  })
  const [letterPreview, setLetterPreview] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [hasResponse, setHasResponse] = useState(false)
  const [showReassessment, setShowReassessment] = useState(false)
  const formData = watch()

  const sendEmail = async () => {
    setIsSending(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setEmailSent(true)
      setShowSuccess(true)
    } catch (error) {
      console.error('Failed to send email:', error)
      alert('Failed to send email. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  const onSubmit = (data: RevocationFormData) => {
    setLetterPreview(true)
  }

  const viewCandidateResponse = () => {
    setShowReassessment(true)
  }

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setHasResponse(true)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess])

  if (showReassessment) {
    return (
      <IndividualReassessmentForm
        assessmentData={combinedData}
      />
    )
  }

  if (showSuccess) {
    return (
      <>
        <Navigation currentStep="Notice Sent" showBack={false} />
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Preliminary Decision Notice Sent Successfully
            </h2>
            
            <div className="mb-6">
              <CountdownTimer
                deadline={formData.responseDeadline}
                startDate={new Date().toISOString()}
                accuracyChallenged={false}
                businessDays={true}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-6 mb-6 text-left">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Next Steps:</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• The candidate has {formData.responseDeadline} business days to respond with mitigating evidence</li>
                <li>• If they challenge the accuracy of the criminal history report, they will receive an additional 5 business days</li>
                <li>• You will be notified when the candidate submits their response</li>
                <li>• After reviewing their response, you must make a final decision</li>
              </ul>
            </div>

            {hasResponse && (
              <div className="mt-6">
                <Button
                  onClick={viewCandidateResponse}
                  className="flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  View Candidate Response
                </Button>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }

  if (letterPreview) {
    return (
      <>
        <Navigation currentStep="Notice Preview" showBack={true} onBack={() => setLetterPreview(false)} />
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Preliminary Decision Notice Preview</h2>
                <div className="space-x-4">
                  <Button 
                    onClick={() => setLetterPreview(false)} 
                    variant="secondary"
                  >
                    Edit Notice
                  </Button>
                  <Button 
                    onClick={sendEmail}
                    disabled={isSending || emailSent}
                    className="flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    {isSending ? 'Sending...' : emailSent ? 'Email Sent' : 'Send to Candidate'}
                  </Button>
                  <Button onClick={() => window.print()}>
                    Print Notice
                  </Button>
                </div>
              </div>
              
              {emailSent && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                  <p className="text-green-800">
                    The Preliminary Decision Notice has been sent to {formData.responseEmail}. 
                    The candidate has {formData.responseDeadline} business days to respond with mitigating evidence. 
                    If they challenge the accuracy of the criminal history report, they will receive an additional 5 business days.
                  </p>
                </div>
              )}
            </div>

            <div className="prose max-w-none">
              <div className="text-right mb-8">
                {formData.date}
              </div>

              <div className="mb-8">
                <p>Re: Preliminary Decision to Revoke Job Offer Because of Conviction History</p>
                <p>Dear {formData.applicantName}:</p>
              </div>

              <p>
                After reviewing the results of your conviction history background check, we have made a preliminary (non-final) 
                decision to revoke (take back) our previous job offer for the position of {formData.position} because of the 
                following conviction(s):
              </p>

              <ul className="list-disc pl-6 mb-6">
                {formData.convictions?.filter(Boolean).map((conviction, index) => (
                  <li key={index}>{conviction}</li>
                ))}
              </ul>

              <p>
                A copy of your conviction history report is attached to this letter. More information about our concerns is 
                included in the "Individualized Assessment" below.
              </p>

              <p className="font-medium">As prohibited by Local and California law, we have NOT considered any of the following:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Arrest(s) not followed by conviction;</li>
                <li>Participation in a pretrial or posttrial diversion program; or</li>
                <li>Convictions that have been sealed, dismissed, expunged, or pardoned.</li>
              </ul>

              <h3 className="text-lg font-semibold mb-4">Your Right to Respond:</h3>
              <p>
                The conditional job you were offered will remain available for five business days so that you may respond to 
                this letter before our decision to revoke the job offer becomes final. Within {formData.responseDeadline} business 
                days* from when you first receive this notice, you may send us:
              </p>
              <ol className="list-decimal pl-6 mb-6">
                <li>Evidence of rehabilitation or mitigating circumstances</li>
                <li>
                  Information challenging the accuracy of the conviction history listed above. If, within 5 business days, 
                  you notify us that you are challenging the accuracy of the attached conviction history report, you shall 
                  have another 5 business days to respond to this notice with evidence of inaccuracy.
                </li>
              </ol>

              <p>Please send any additional information you would like us to consider to: {formData.responseEmail}</p>

              <p className="font-medium mt-6">Here are some examples of information you may send us:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Evidence that you were not convicted of one or more of the offenses we listed above or that the conviction record is inaccurate;</li>
                <li>Facts or circumstances surrounding the offense or conduct, showing that the conduct was less serious than the conviction seems;</li>
                <li>The time that has passed since the conduct that led to your conviction(s) or since your release from incarceration;</li>
                <li>The length and consistency of employment history or community involvement before and after the offense(s);</li>
                <li>Employment or character references;</li>
                <li>Evidence that you attended school, job training, or counseling;</li>
                <li>Evidence that you have performed the same type of work since your conviction;</li>
                <li>Whether you are bonded under a federal, state, or local bonding program;</li>
                <li>Evidence of rehabilitation efforts.</li>
              </ul>

              <p>
                We are required to review the information you submit and make another individualized assessment of whether 
                to hire you or revoke the job offer. We will notify you in writing if we make a final decision to revoke 
                the job offer.
              </p>

              <h3 className="text-lg font-semibold mt-8 mb-4">Original Individualized Assessment:</h3>
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h4 className="font-medium mb-4">Activities and Rehabilitation Efforts Considered:</h4>
                <dl className="grid grid-cols-1 gap-4">
                  <div>
                    <dt className="font-medium">Work Experience:</dt>
                    <dd>{formatActivityDetails(combinedData?.activities.workExperience || 'no', combinedData?.activities.workExperienceDetails)}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Job Training:</dt>
                    <dd>{formatActivityDetails(combinedData?.activities.jobTraining || 'no', combinedData?.activities.jobTrainingDetails)}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Education:</dt>
                    <dd>{formatActivityDetails(combinedData?.activities.education || 'no', combinedData?.activities.educationDetails)}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Counseling:</dt>
                    <dd>{formatActivityDetails(combinedData?.activities.counseling || 'no', combinedData?.activities.counselingDetails)}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Rehabilitation:</dt>
                    <dd>{formatActivityDetails(combinedData?.activities.rehabilitation || 'no', combinedData?.activities.rehabilitationDetails)}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Community Service:</dt>
                    <dd>{formatActivityDetails(combinedData?.activities.communityService || 'no', combinedData?.activities.communityServiceDetails)}</dd>
                  </div>
                </dl>
              </div>

              <h3 className="text-lg font-semibold mb-4">Current Assessment:</h3>
              <p>
                We have individually assessed whether your conviction history is directly related to the duties of the job 
                we offered you. We considered the following:
              </p>

              <ol className="list-decimal pl-6 mb-6">
                <li>
                  The nature and seriousness of the conduct that led to your conviction(s), which we assessed as follows:<br />
                  {formData.conductSeriousness}
                </li>
                <li>
                  How long ago the conduct occurred that led to your conviction, which was: {formData.timeElapsedSinceConduct} and 
                  how long ago you completed your sentence, which was: {formData.timeElapsedSinceRelease}.
                </li>
                <li>
                  The specific duties and responsibilities of the position of {formData.position}, which are:
                  <ul className="list-disc pl-6 mt-2">
                    {formData.jobDuties?.filter(Boolean).map((duty, index) => (
                      <li key={index}>{duty}</li>
                    ))}
                  </ul>
                </li>
              </ol>

              <p className="mb-6">
                We believe your conviction record lessens your fitness/ability to perform the job duties because:<br />
                {formData.reasoningForRevocation}
              </p>

              <h3 className="text-lg font-semibold mb-4">Your Right to File a Complaint:</h3>
              <p>
                If you believe your rights under the California Fair Chance Act or the San Diego County Fair Chance 
                Ordinance have been violated during this job application process, you have the right to file a complaint 
                with the California Civil Rights Department (CRD) and/or the San Diego County Office of Labor Standards 
                and Enforcement (OLSE).
              </p>

              <p className="font-medium mt-4">California CRD:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>File a complaint online at: ccrs.calcivilrights.ca.gov/s/</li>
                <li>Download an intake form at: calcivilrights.ca.gov/complaintprocess/filebymail/</li>
                <li>Email to: contact.center@calcivilrights.gov</li>
                <li>Mail to: 2218  Kausen Drive, Suite 100, Elk Grove, CA 95758</li>
                <li>Call: (800) 884-1684</li>
              </ul>

              <p className="font-medium">San Diego County OLSE:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>File a complaint online at: www.sandiegocounty.gov/content/sdc/OLSE/file-a-complaint.html</li>
                <li>Visit: 1600 Pacific Highway, Room 452, San Diego, CA 92101</li>
                <li>Call: 619-531-5129</li>
              </ul>

              <div className="mt-12">
                <p>Sincerely,</p>
                <p className="mt-4">
                  {formData.employerName}<br />
                  {formData.employerCompany}
                </p>
              </div>

              <p className="text-sm mt-8">
                * The applicant must be allowed at least 5 business days to respond. If the applicant indicates their 
                intent to provide such evidence, they must be given an additional  5 business days to gather and deliver 
                the information.
              </p>

              <p className="text-sm italic mt-4">
                Enclosure: Copy of conviction history report
              </p>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation currentStep="Preliminary Job Offer Revocation" showBack={true} onBack={onBack} />
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Preliminary Job Offer Revocation Notice
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  {...register('date')}
                  className="mt-1 block w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Applicant Name</label>
                <input
                  type="text"
                  {...register('applicantName')}
                  className="mt-1 block w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <input
                  type="text"
                  {...register('position')}
                  className="mt-1 block w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Convictions Leading to Decision
                </label>
                <div className="space-y-2">
                  {[0, 1, 2].map((index) => (
                    <input
                      key={index}
                      type="text"
                      {...register(`convictions.${index}`)}
                      placeholder={`Conviction ${index + 1}`}
                      className="mt-1 block w-full"
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nature and Seriousness of the Conduct
                </label>
                <textarea
                  {...register('conductSeriousness')}
                  rows={3}
                  className="mt-1 block w-full"
                  placeholder="Describe why the conduct is considered serious..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Time Elapsed Since Conduct
                </label>
                <input
                  type="text"
                  {...register('timeElapsedSinceConduct')}
                  className="mt-1 block w-full"
                  readOnly
                />
                <p className="mt-1 text-sm text-gray-500">
                  This is automatically calculated from the conviction date to the conditional offer date.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Time Elapsed Since Release
                </label>
                <input
                  type="text"
                  {...register('timeElapsedSinceRelease')}
                  className="mt-1 block w-full"
                  placeholder="e.g., 3 years"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Job Duties</label>
                <div className="space-y-2">
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key={index}
                      type="text"
                      {...register(`jobDuties.${index}`)}
                      placeholder={`Duty ${index + 1}`}
                      className="mt-1 block w-full"
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reasoning for Revoking Job Offer
                </label>
                <textarea
                  {...register('reasoningForRevocation')}
                  rows={4}
                  className="mt-1 block w-full"
                  placeholder="Explain how the conviction history relates to job duties and why it lessens fitness for the position..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Response Period (Business Days)
                </label>
                <input
                  type="number"
                  min="5"
                  {...register('responseDeadline')}
                  className="mt-1 block w-full"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Minimum 5 business days required. Additional 5 days will be added if accuracy is challenged.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Response Email
                </label>
                <input
                  type="email"
                  {...register('responseEmail')}
                  className="mt-1 block w-full"
                  placeholder="Email address where candidate should send their response"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <Button type="button" variant="secondary">
                Save Draft
              </Button>
              <Button type="submit">
                Preview Notice
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}