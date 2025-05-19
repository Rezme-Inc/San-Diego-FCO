import { useForm } from 'react-hook-form'
import { Button } from './ui/Button'
import { Navigation } from './ui/Navigation'
import { useState } from 'react'
import { CheckCircle2, Mail, Printer } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface FinalRevocationNoticeData {
  date: string
  applicantName: string
  dateOfNotice: string
  receivedResponse: 'yes' | 'no'
  submittedInformation?: string[]
  hasError: 'yes' | 'no'
  convictions: string[]
  conductSeriousness: string
  timeElapsedSinceConduct: string
  timeElapsedSinceRelease: string
  position: string
  jobDuties: string[]
  reasoningForRevocation: string
  allowsReconsideration: 'yes' | 'no'
  reconsiderationProcedure?: string
  employerName: string
  employerCompany: string
  employerAddress: string
  employerPhone: string
}

interface FinalRevocationNoticeProps {
  initialData: {
    applicantName: string
    dateOfNotice: string
    position: string
    employerName: string
    employerCompany: string
  }
}

export function FinalRevocationNotice({ initialData }: FinalRevocationNoticeProps) {
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const { register, handleSubmit, watch } = useForm<FinalRevocationNoticeData>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      applicantName: initialData.applicantName,
      dateOfNotice: initialData.dateOfNotice,
      position: initialData.position,
      employerName: initialData.employerName,
      employerCompany: initialData.employerCompany,
      receivedResponse: 'no',
      hasError: 'no'
    }
  })

  const receivedResponse = watch('receivedResponse')
  const allowsReconsideration = watch('allowsReconsideration')
  const formData = watch()

  const onSubmit = (data: FinalRevocationNoticeData) => {
    setShowPreview(true)
  }

  const sendNotice = async () => {
    setIsSending(true)
    try {
      // Simulate sending email
      await new Promise(resolve => setTimeout(resolve, 1500))
      setShowSuccess(true)
    } catch (error) {
      console.error('Failed to send notice:', error)
      alert('Failed to send notice. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  if (showSuccess) {
    return (
      <>
        <Navigation currentStep="Final Notice Sent" showBack={false} />
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Final Revocation Notice Sent
            </h2>
            <p className="text-gray-600 mb-6">
              The final decision notice has been sent to the candidate. This completes the Fair Chance hiring process.
            </p>
            <div className="mt-6">
              <Button onClick={() => navigate('/')}>
                Return to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (showPreview) {
    return (
      <>
        <Navigation currentStep="Final Notice Preview" showBack={true} onBack={() => setShowPreview(false)} />
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Final Revocation Notice Preview</h2>
              <div className="space-x-4">
                <Button 
                  onClick={() => setShowPreview(false)} 
                  variant="secondary"
                >
                  Edit Notice
                </Button>
                <Button 
                  onClick={sendNotice}
                  disabled={isSending}
                  className="flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  {isSending ? 'Sending...' : 'Send to Candidate'}
                </Button>
                <Button 
                  onClick={() => window.print()}
                  className="flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Print Notice
                </Button>
              </div>
            </div>

            <div className="prose max-w-none">
              {/* Letter Header */}
              <div className="text-right mb-8">
                <p className="text-sm text-gray-600">{formData.date}</p>
              </div>

              {/* Subject Line */}
              <div className="mb-8">
                <p className="font-bold text-gray-900">
                  Re: Final Decision to Revoke Job Offer Because of Conviction History
                </p>
                <p className="mt-4">Dear {formData.applicantName}:</p>
              </div>

              {/* Opening Paragraph */}
              <div className="mb-6">
                <p className="mb-4">
                  We are following up about our letter dated {formData.dateOfNotice} which notified you of our initial 
                  decision to revoke (take back) the conditional job offer.
                </p>

                {/* Response Status */}
                <div className="pl-6 mb-4">
                  {formData.receivedResponse === 'no' ? (
                    <p className="mb-4">
                      ☒ We did not receive a timely response from you after sending you that letter, and our decision 
                      to revoke the job offer is now final.
                    </p>
                  ) : (
                    <>
                      <p className="mb-2">
                        ☒ We made a final decision to revoke the job offer after considering the information you 
                        submitted, which included:
                      </p>
                      <ul className="list-disc pl-8 space-y-1">
                        {formData.submittedInformation?.filter(Boolean).map((info, index) => (
                          <li key={index} className="text-gray-700">{info}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>

              {/* Error Status */}
              <div className="mb-6">
                <p className="mb-4">
                  After reviewing the information you submitted, we have determined that there 
                  {formData.hasError === 'yes' ? ' ☒ was ' : ' ☐ was '}
                  {formData.hasError === 'no' ? ' ☒ was not ' : ' ☐ was not '}
                  an error on your conviction history report. We have decided to revoke our job offer because of the 
                  following conviction(s):
                </p>

                <ul className="list-disc pl-8 space-y-1">
                  {formData.convictions?.filter(Boolean).map((conviction, index) => (
                    <li key={index} className="text-gray-700">{conviction}</li>
                  ))}
                </ul>
              </div>

              {/* Assessment Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Individualized Assessment:</h3>
                <p className="mb-4">
                  We have individually assessed whether your conviction history is directly related to the duties of 
                  the job we offered you. We considered the following:
                </p>

                <ol className="list-decimal pl-8 space-y-4">
                  <li>
                    <p className="font-medium mb-2">The nature and seriousness of the conduct that led to your conviction(s):</p>
                    <p className="pl-4 text-gray-700">{formData.conductSeriousness}</p>
                  </li>
                  <li>
                    <p className="mb-2">Time elapsed since the conduct:</p>
                    <ul className="pl-4 space-y-1">
                      <li>Since conduct occurred: {formData.timeElapsedSinceConduct}</li>
                      <li>Since sentence completion: {formData.timeElapsedSinceRelease}</li>
                    </ul>
                  </li>
                  <li>
                    <p className="font-medium mb-2">The specific duties and responsibilities of the position of {formData.position}:</p>
                    <ul className="list-disc pl-8 space-y-1">
                      {formData.jobDuties?.filter(Boolean).map((duty, index) => (
                        <li key={index} className="text-gray-700">{duty}</li>
                      ))}
                    </ul>
                  </li>
                </ol>
              </div>

              {/* Decision Reasoning */}
              <div className="mb-8 bg-gray-50 p-6 rounded-lg">
                <p className="font-medium mb-2">
                  We believe your conviction record lessens your fitness/ability to perform the job duties because:
                </p>
                <p className="text-gray-700">{formData.reasoningForRevocation}</p>
              </div>

              {/* Reconsideration Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Request for Reconsideration:</h3>
                {formData.allowsReconsideration === 'no' ? (
                  <p className="pl-6">☒ We do not offer any way to challenge this decision or request reconsideration.</p>
                ) : (
                  <div className="pl-6">
                    <p className="mb-2">☒ If you would like to challenge this decision or request reconsideration, you may:</p>
                    <p className="pl-4 text-gray-700">{formData.reconsiderationProcedure}</p>
                  </div>
                )}
              </div>

              {/* Complaint Rights Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Right to File a Complaint:</h3>
                <p className="mb-4">
                  If you believe your rights under the California Fair Chance Act or the San Diego County Fair Chance 
                  Ordinance have been violated during this job application process, you have the right to file a complaint 
                  with the California Civil Rights Department (CRD) and/or the San Diego County Office of Labor Standards 
                  and Enforcement (OLSE).
                </p>

                <div className="space-y-6">
                  <div>
                    <p className="font-medium mb-2">California CRD:</p>
                    <ul className="list-disc pl-8 space-y-1">
                      <li>File a complaint online at: <span className="text-blue-600">ccrs.calcivilrights.ca.gov/s/</span></li>
                      <li>Download an intake form at: <span className="text-blue-600">calcivilrights.ca.gov/complaintprocess/filebymail/</span></li>
                      <li>Email to: <span className="text-blue-600">contact.center@calcivilrights.gov</span></li>
                      <li>Mail to: 2218 Kausen Drive, Suite 100, Elk Grove, CA 95758</li>
                      <li>Call: (800) 884-1684</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-medium mb-2">San Diego County OLSE:</p>
                    <ul className="list-disc pl-8 space-y-1">
                      <li>File a complaint online at: <span className="text-blue-600">www.sandiegocounty.gov/content/sdc/OLSE/file-a-complaint.html</span></li>
                      <li>Visit: 1600 Pacific Highway, Room 452, San Diego, CA 92101</li>
                      <li>Call: 619-531-5129</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Signature Block */}
              <div className="mt-12">
                <p>Sincerely,</p>
                <div className="mt-4">
                  <p className="font-medium">{formData.employerName}</p>
                  <p>{formData.employerCompany}</p>
                  <p>{formData.employerAddress}</p>
                  <p>{formData.employerPhone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation currentStep="Final Revocation Notice" showBack={true} />
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Final Decision to Revoke Job Offer
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    {...register('date')}
                    className="mt-1 block w-full"
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
                  <label className="block text-sm font-medium text-gray-700">Date of Initial Notice</label>
                  <input
                    type="date"
                    {...register('dateOfNotice')}
                    className="mt-1 block w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Did you receive a response from the candidate?
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register('receivedResponse')}
                      value="yes"
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register('receivedResponse')}
                      value="no"
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              {receivedResponse === 'yes' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Information Submitted by Candidate
                  </label>
                  <div className="space-y-2">
                    {[0, 1, 2].map((index) => (
                      <input
                        key={index}
                        type="text"
                        {...register(`submittedInformation.${index}`)}
                        placeholder={`Information item ${index + 1}`}
                        className="mt-1 block w-full"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Was there an error in the Criminal History Report?
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register('hasError')}
                      value="yes"
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register('hasError')}
                      value="no"
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Time Elapsed Since Conduct
                  </label>
                  <input
                    type="text"
                    {...register('timeElapsedSinceConduct')}
                    className="mt-1 block w-full"
                    placeholder="e.g., 3 years"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Time Elapsed Since Release
                  </label>
                  <input
                    type="text"
                    {...register('timeElapsedSinceRelease')}
                    className="mt-1 block w-full"
                    placeholder="e.g., 2 years"
                  />
                </div>
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
                <label className="block text-sm font-medium text-gray-700">Job Duties</label>
                <div className="space-y-2">
                  {[0, 1, 2].map((index) => (
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
                  Reasoning for Final Decision
                </label>
                <textarea
                  {...register('reasoningForRevocation')}
                  rows={4}
                  className="mt-1 block w-full"
                  placeholder="Outline reasoning for decision to revoke job offer based on relevance of conviction history to position..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Does your company allow for reconsideration of this decision?
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register('allowsReconsideration')}
                      value="yes"
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register('allowsReconsideration')}
                      value="no"
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              {allowsReconsideration === 'yes' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Reconsideration Procedure
                  </label>
                  <textarea
                    {...register('reconsiderationProcedure')}
                    rows={3}
                    className="mt-1 block w-full"
                    placeholder="Describe the procedure for requesting reconsideration..."
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Employer Contact Name</label>
                  <input
                    type="text"
                    {...register('employerName')}
                    className="mt-1 block w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    {...register('employerCompany')}
                    className="mt-1 block w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Address</label>
                  <input
                    type="text"
                    {...register('employerAddress')}
                    className="mt-1 block w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Phone Number</label>
                  <input
                    type="tel"
                    {...register('employerPhone')}
                    className="mt-1 block w-full"
                  />
                </div>
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