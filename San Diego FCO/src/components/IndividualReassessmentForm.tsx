import { useForm } from 'react-hook-form'
import { Button } from './ui/Button'
import { Navigation } from './ui/Navigation'
import { useState, useEffect } from 'react'
import { CheckCircle2, Info } from 'lucide-react'
import { Tooltip } from './ui/Tooltip'
import { FinalRevocationNotice } from './FinalRevocationNotice'
import { loadFormData, saveFormData } from '../lib/storage'
import { useNavigate } from 'react-router-dom'

interface ReassessmentFormData {
  employerName: string
  applicantName: string
  positionApplied: string
  dateConditionalOffer: string
  dateReassessment: string
  dateCriminalHistory: string
  assessmentPerformer: string
  hasError: 'yes' | 'no'
  errorDescription?: string
  rehabilitationEvidence: {
    schoolAttendance: 'yes' | 'no'
    schoolAttendanceNotes?: string
    religiousInstitution: 'yes' | 'no'
    religiousInstitutionNotes?: string
    jobTraining: 'yes' | 'no'
    jobTrainingNotes?: string
    counseling: 'yes' | 'no'
    counselingNotes?: string
    communityInvolvement: 'yes' | 'no'
    communityInvolvementNotes?: string
    lettersOfSupport: 'yes' | 'no'
    lettersOfSupportNotes?: string
    additionalEvidence?: string
  }
  decision: 'extend' | 'rescind'
  rescindReason?: string
}

interface IndividualReassessmentFormProps {
  assessmentData: {
    employerName: string
    applicantName: string
    positionApplied: string
    dateConditionalOffer: string
    dateCriminalHistory: string
    assessmentPerformer: string
    jobDuties: string[]
    criminalConduct: string
    convictionMonth: string
    convictionYear: string
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
    rescindReason?: string
  } | null
}

function formatActivityDetails(activity: 'yes' | 'no' | undefined, details?: string): string {
  if (!activity || activity === 'no') return 'No'
  return details ? `Yes - ${details}` : 'Yes'
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

export function IndividualReassessmentForm({ assessmentData }: IndividualReassessmentFormProps) {
  const [showSuccess, setShowSuccess] = useState(false)
  const [showFinalNotice, setShowFinalNotice] = useState(false)
  const savedData = loadFormData()
  const combinedData = {
    ...savedData,
    ...assessmentData
  }
  const timeElapsed = assessmentData ? 
    calculateTimeElapsed(
      assessmentData.convictionMonth,
      assessmentData.convictionYear,
      assessmentData.dateConditionalOffer
    ) : ''

  const { register, handleSubmit, watch } = useForm<ReassessmentFormData>({
    defaultValues: {
      employerName: combinedData?.employerName || '',
      applicantName: combinedData?.applicantName || '',
      positionApplied: combinedData?.positionApplied || '',
      dateConditionalOffer: combinedData?.dateConditionalOffer || '',
      dateCriminalHistory: combinedData?.dateCriminalHistory || '',
      assessmentPerformer: combinedData?.assessmentPerformer || '',
      dateReassessment: new Date().toISOString().split('T')[0],
      rehabilitationEvidence: {
        schoolAttendance: 'no',
        religiousInstitution: 'no',
        jobTraining: 'no',
        counseling: 'no',
        communityInvolvement: 'no',
        lettersOfSupport: 'no'
      }
    }
  })

  const decision = watch('decision')
  const hasError = watch('hasError')
  const rehabilitationEvidence = watch('rehabilitationEvidence')
  const formData = watch()

  const onSubmit = (data: ReassessmentFormData) => {
    saveFormData({
      ...combinedData,
      ...data
    })
    
    if (data.decision === 'extend') {
      setShowSuccess(true)
    } else {
      setShowFinalNotice(true)
    }
  }

  const navigate = useNavigate()

  if (showFinalNotice) {
    return (
      <FinalRevocationNotice
        initialData={{
          applicantName: formData.applicantName,
          dateOfNotice: formData.dateReassessment,
          position: formData.positionApplied,
          employerName: formData.assessmentPerformer,
          employerCompany: formData.employerName,
          timeElapsedSinceConduct: timeElapsed,
          jobDuties: assessmentData?.jobDuties || [],
          criminalConduct: assessmentData?.criminalConduct || '',
          rescindReason: formData.rescindReason
        }}
      />
    )
  }

  if (showSuccess) {
    return (
      <>
        <Navigation currentStep="Reassessment Complete" showBack={false} />
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Congratulations on Your Fair Chance Hiring Decision!
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                You've made a positive impact by extending employment opportunities to individuals seeking a second chance.
              </p>
              <p className="text-gray-600">
                This decision not only aligns with fair chance hiring laws but also:
              </p>
              <ul className="text-left text-gray-600 space-y-2 max-w-md mx-auto">
                <li>✓ Promotes greater economic participation in our community</li>
                <li>✓ Demonstrates inclusive business practices</li>
                <li>✓ Supports successful reintegration</li>
                <li>✓ Creates opportunities for qualified candidates</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation currentStep="Individual Reassessment" showBack={true} onBack={() => navigate('/preliminary-notice')} />
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left side - Form */}
        <div className="w-1/2 overflow-y-auto px-4 py-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Criminal History Individualized Reassessment Form
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Employer Name</label>
                    <input
                      type="text"
                      {...register('employerName')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Applicant Name</label>
                    <input
                      type="text"
                      {...register('applicantName')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Position Applied For</label>
                    <input
                      type="text"
                      {...register('positionApplied')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Conditional Offer</label>
                    <input
                      type="date"
                      {...register('dateConditionalOffer')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Reassessment</label>
                    <input
                      type="date"
                      {...register('dateReassessment')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Criminal History Report</label>
                    <input
                      type="date"
                      {...register('dateCriminalHistory')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Assessment Performed by</label>
                    <input
                      type="text"
                      {...register('assessmentPerformer')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {assessmentData && (
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Initial Assessment Summary</h3>
                    <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-700">Criminal Conduct:</h4>
                        <p className="mt-1 text-gray-600">{assessmentData.criminalConduct}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700">Time Elapsed Since Conduct:</h4>
                        <p className="mt-1 text-gray-600">{timeElapsed}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-700">Job Duties:</h4>
                        <ul className="mt-1 list-disc pl-5 space-y-1">
                          {(assessmentData.jobDuties || []).filter(Boolean).map((duty, index) => (
                            <li key={index} className="text-gray-600">{duty}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-700">Previous Activities and Rehabilitation:</h4>
                        <dl className="mt-2 grid grid-cols-1 gap-2">
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Work Experience:</dt>
                            <dd className="text-sm text-gray-700">
                              {formatActivityDetails(assessmentData?.activities?.workExperience, assessmentData?.activities?.workExperienceDetails)}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Job Training:</dt>
                            <dd className="text-sm text-gray-700">
                              {formatActivityDetails(assessmentData?.activities?.jobTraining, assessmentData?.activities?.jobTrainingDetails)}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Education:</dt>
                            <dd className="text-sm text-gray-700">
                              {formatActivityDetails(assessmentData?.activities?.education, assessmentData?.activities?.educationDetails)}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Counseling:</dt>
                            <dd className="text-sm text-gray-700">
                              {formatActivityDetails(assessmentData?.activities?.counseling, assessmentData?.activities?.counselingDetails)}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Rehabilitation:</dt>
                            <dd className="text-sm text-gray-700">
                              {formatActivityDetails(assessmentData?.activities?.rehabilitation, assessmentData?.activities?.rehabilitationDetails)}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Community Service:</dt>
                            <dd className="text-sm text-gray-700">
                              {formatActivityDetails(assessmentData?.activities?.communityService, assessmentData?.activities?.communityServiceDetails)}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      {assessmentData.rescindReason && (
                        <div>
                          <h4 className="font-medium text-gray-700">Initial Reasoning for Revocation:</h4>
                          <p className="mt-1 text-gray-600">{assessmentData.rescindReason}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Reassessment</h3>
                  
                  <div className="space-y-6">
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

                    {hasError === 'yes' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Describe the error:
                        </label>
                        <textarea
                          {...register('errorDescription')}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <h4 className="text-lg font-medium text-gray-900">Evidence of Rehabilitation and Good Conduct</h4>
                        <Tooltip content="Review and assess all evidence provided by the applicant demonstrating rehabilitation and good conduct. Check 'Yes' if evidence has been provided and add relevant notes for each category.">
                          <Info className="w-4 h-4 text-gray-400" />
                        </Tooltip>
                      </div>

                      <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                        {/* School Attendance */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-gray-700">
                              School Attendance
                            </label>
                            <div className="flex items-center space-x-4">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  {...register('rehabilitationEvidence.schoolAttendance')}
                                  value="yes"
                                  className="text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  {...register('rehabilitationEvidence.schoolAttendance')}
                                  value="no"
                                  className="text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          {rehabilitationEvidence.schoolAttendance === 'yes' && (
                            <textarea
                              {...register('rehabilitationEvidence.schoolAttendanceNotes')}
                              placeholder="Enter notes about school attendance evidence..."
                              rows={2}
                              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          )}
                        </div>

                        {/* Religious Institution */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-gray-700">
                              Religious Institution Attendance
                            </label>
                            <div className="flex items-center space-x-4">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  {...register('rehabilitationEvidence.religiousInstitution')}
                                  value="yes"
                                  className="text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  {...register('rehabilitationEvidence.religiousInstitution')}
                                  value="no"
                                  className="text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          {rehabilitationEvidence.religiousInstitution === 'yes' && (
                            <textarea
                              {...register('rehabilitationEvidence.religiousInstitutionNotes')}
                              placeholder="Enter notes about religious institution attendance..."
                              rows={2}
                              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          )}
                        </div>

                        {/* Job Training */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-gray-700">
                              Job Training Participation
                            </label>
                            <div className="flex items-center space-x-4">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  {...register('rehabilitationEvidence.jobTraining')}
                                  value="yes"
                                  className="text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  {...register('rehabilitationEvidence.jobTraining')}
                                  value="no"
                                  className="text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          {rehabilitationEvidence.jobTraining === 'yes' && (
                            <textarea
                              {...register('rehabilitationEvidence.jobTrainingNotes')}
                              placeholder="Enter notes about job training participation..."
                              rows={2}
                              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          )}
                        </div>

                        {/* Counseling */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-gray-700">
                              Counseling Participation
                            </label>
                            <div className="flex items-center space-x-4">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  {...register('rehabilitationEvidence.counseling')}
                                  value="yes"
                                  className="text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  {...register('rehabilitationEvidence.counseling')}
                                  value="no"
                                  className="text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          {rehabilitationEvidence.counseling === 'yes' && (
                            <textarea
                              {...register('rehabilitationEvidence.counselingNotes')}
                              placeholder="Enter notes about counseling participation..."
                              rows={2}
                              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          )}
                        </div>

                        {/* Community Involvement */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-gray-700">
                              Community Involvement
                            </label>
                            <div className="flex items-center space-x-4">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  {...register('rehabilitationEvidence.communityInvolvement')}
                                  value="yes"
                                  className="text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  {...register('rehabilitationEvidence.communityInvolvement')}
                                  value="no"
                                  className="text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          {rehabilitationEvidence.communityInvolvement === 'yes' && (
                            <textarea
                              {...register('rehabilitationEvidence.communityInvolvementNotes')}
                              placeholder="Enter notes about community involvement..."
                              rows={2}
                              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          )}
                        </div>

                        {/* Letters of Support */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-gray-700">
                              Letters of Support
                            </label>
                            <div className="flex items-center space-x-4">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  {...register('rehabilitationEvidence.lettersOfSupport')}
                                  value="yes"
                                  className="text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2">Yes</span>
                              </label>
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  {...register('rehabilitationEvidence.lettersOfSupport')}
                                  value="no"
                                  className="text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2">No</span>
                              </label>
                            </div>
                          </div>
                          {rehabilitationEvidence.lettersOfSupport === 'yes' && (
                            <textarea
                              {...register('rehabilitationEvidence.lettersOfSupportNotes')}
                              placeholder="Enter notes about letters of support..."
                              rows={2}
                              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          )}
                        </div>

                        {/* Additional Evidence */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Additional Evidence or Notes
                          </label>
                          <textarea
                            {...register('rehabilitationEvidence.additionalEvidence')}
                            placeholder="Enter any additional evidence or general notes..."
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Final Decision</label>
                      <div className="space-y-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            {...register('decision')}
                            value="extend"
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2">BASED ON THE FACTORS ABOVE, WE ARE EXTENDING OUR OFFER OF EMPLOYMENT</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            {...register('decision')}
                            value="rescind"
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2">BASED ON THE FACTORS ABOVE, WE ARE RESCINDING OUR OFFER OF EMPLOYMENT</span>
                        </label>
                      </div>
                    </div>

                    {decision === 'rescind' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Reason for Rescinding Offer
                        </label>
                        <p className="text-sm text-gray-500 mb-2">
                          Describe the link between the specific aspects of the applicant's criminal history with risks 
                          inherent in the duties of the employment position
                        </p>
                        <textarea
                          {...register('rescindReason')}
                          rows={4}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <Button type="button" variant="secondary">
                  Save Draft
                </Button>
                <Button type="submit">
                  Submit Reassessment
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Right side - PDF Viewer */}
        <div className="w-1/2 bg-gray-100 p-4">
          <div className="bg-white rounded-lg shadow-md h-full p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Candidate's Response</h3>
            <div className="h-[calc(100%-2rem)] border border-gray-200 rounded">
              <iframe 
                src="/candidate-response.pdf" 
                className="w-full h-full"
                title="Candidate Response"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}