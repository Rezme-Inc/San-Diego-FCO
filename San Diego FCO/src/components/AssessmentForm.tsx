import { useForm } from 'react-hook-form'
import { Button } from './ui/Button'
import { ClipboardList, Info, CheckCircle2 } from 'lucide-react'
import { Tooltip } from './ui/Tooltip'
import { Navigation } from './ui/Navigation'
import { useState, useEffect } from 'react'
import { RevocationForm } from './RevocationForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { saveFormData, loadFormData } from '../lib/storage'
import { useNavigate } from 'react-router-dom'

const activitySchema = z.object({
  workExperience: z.enum(['yes', 'unknown'], {
    required_error: "Please select whether the candidate has work experience"
  }),
  workExperienceDetails: z.string().optional(),
  jobTraining: z.enum(['yes', 'unknown'], {
    required_error: "Please select whether the candidate has job training"
  }),
  jobTrainingDetails: z.string().optional(),
  education: z.enum(['yes', 'unknown'], {
    required_error: "Please select whether the candidate has educational programming"
  }),
  educationDetails: z.string().optional(),
  counseling: z.enum(['yes', 'unknown'], {
    required_error: "Please select whether the candidate has counseling"
  }),
  counselingDetails: z.string().optional(),
  rehabilitation: z.enum(['yes', 'unknown'], {
    required_error: "Please select whether the candidate has rehabilitation efforts"
  }),
  rehabilitationDetails: z.string().optional(),
  communityService: z.enum(['yes', 'unknown'], {
    required_error: "Please select whether the candidate has community service"
  }),
  communityServiceDetails: z.string().optional(),
})

const assessmentFormSchema = z.object({
  employerName: z.string().min(1, "Employer name is required"),
  applicantName: z.string().min(1, "Applicant name is required"),
  positionApplied: z.string().min(1, "Position is required"),
  dateConditionalOffer: z.string().min(1, "Conditional offer date is required"),
  dateAssessment: z.string().min(1, "Assessment date is required"),
  dateCriminalHistory: z.string().min(1, "Criminal history date is required"),
  assessmentPerformer: z.string().min(1, "Assessment performer is required"),
  jobDuties: z.array(z.string()),
  criminalConduct: z.string().min(1, "Criminal conduct description is required"),
  convictionMonth: z.string(),
  convictionYear: z.string(),
  activities: activitySchema,
  decision: z.enum(['extend', 'rescind']),
  rescindReason: z.string().optional(),
  storeAssessment: z.boolean().optional()
})

type AssessmentFormData = z.infer<typeof assessmentFormSchema>

export function AssessmentForm() {
  const [formData, setFormData] = useState<AssessmentFormData | null>(null)
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentFormSchema),
    defaultValues: formData || {
      convictionMonth: new Date().getMonth().toString().padStart(2, '0'),
      convictionYear: new Date().getFullYear().toString(),
      activities: {
        workExperience: undefined,
        jobTraining: undefined,
        education: undefined,
        counseling: undefined,
        rehabilitation: undefined,
        communityService: undefined
      }
    }
  })

  const navigate = useNavigate()

  useEffect(() => {
    const savedData = loadFormData()
    if (savedData) {
      reset(savedData)
      setFormData(savedData)
    }
  }, [reset])

  const decision = watch('decision')
  const activities = watch('activities') || {}
  const [showSuccess, setShowSuccess] = useState(false)
  const [showRevocation, setShowRevocation] = useState(false)

  const onSubmit = (data: AssessmentFormData) => {
    setFormData(data)
    saveFormData(data)
    
    if (data.decision === 'extend') {
      setShowSuccess(true)
      if (data.storeAssessment) {
        // Store assessment logic here
      }
    } else {
      setShowRevocation(true)
    }
  }

  const handleBack = () => {
    setShowSuccess(false)
    setShowRevocation(false)
    if (formData) {
      reset(formData)
    }
  }

  if (showSuccess) {
    return (
      <>
        <Navigation currentStep="Assessment Complete" showBack={true} onBack={handleBack} />
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Congratulations on Your Employment Decision!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for advancing second chances in compliance with the San Diego Fair Chance Hiring Ordinance. 
              Your decision helps increase economic participation in our community.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-blue-700">
                The assessment and candidate's restorative record have been saved to their profile in your admin panel.
              </p>
            </div>
            <Button 
              onClick={() => window.location.href = '/admin/candidates'}
              className="w-full sm:w-auto"
            >
              Return to Admin Panel
            </Button>
          </div>
        </div>
      </>
    )
  }

  if (showRevocation) {
    return <RevocationForm assessmentData={formData} onBack={handleBack} />
  }

  return (
    <>
      <Navigation currentStep="Individual Assessment" showBack={true} onBack={() => navigate('/')} />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-2 mb-6">
              <ClipboardList className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold">Criminal History Individual Assessment Form</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  {...register('employerName')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.employerName && (
                  <p className="mt-1 text-sm text-red-600">{errors.employerName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Applicant Name</label>
                <input
                  {...register('applicantName')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.applicantName && (
                  <p className="mt-1 text-sm text-red-600">{errors.applicantName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Position Applied For</label>
                <input
                  {...register('positionApplied')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.positionApplied && (
                  <p className="mt-1 text-sm text-red-600">{errors.positionApplied.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Conditional Offer</label>
                <input
                  type="date"
                  {...register('dateConditionalOffer')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.dateConditionalOffer && (
                  <p className="mt-1 text-sm text-red-600">{errors.dateConditionalOffer.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Assessment</label>
                <input
                  type="date"
                  {...register('dateAssessment')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.dateAssessment && (
                  <p className="mt-1 text-sm text-red-600">{errors.dateAssessment.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Criminal History Report</label>
                <input
                  type="date"
                  {...register('dateCriminalHistory')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.dateCriminalHistory && (
                  <p className="mt-1 text-sm text-red-600">{errors.dateCriminalHistory.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Assessment Performed by</label>
                <input
                  {...register('assessmentPerformer')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.assessmentPerformer && (
                  <p className="mt-1 text-sm text-red-600">{errors.assessmentPerformer.message}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Job Duties and Responsibilities</h3>
              <div className="space-y-4">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index}>
                    <input
                      {...register(`jobDuties.${index}`)}
                      placeholder={`Duty ${index + 1}`}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description of Criminal Conduct
                </label>
                <Tooltip content="The following conduct cannot be considered: infractions or arrests that didn't lead to a conviction, convictions that have been sealed or expunged, adjudications in the juvenile justice system, or participation in a pre- or post-trial diversion program.">
                  <Info className="w-4 h-4 text-gray-400" />
                </Tooltip>
              </div>
              <textarea
                {...register('criminalConduct')}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Describe the criminal conduct and its relevance to the position..."
              />
              {errors.criminalConduct && (
                <p className="mt-1 text-sm text-red-600">{errors.criminalConduct.message}</p>
              )}
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  Date of Conviction
                </label>
                <Tooltip content="Enter the month and year when the conviction occurred. This helps determine how much time has passed since the offense.">
                  <Info className="w-4 h-4 text-gray-400" />
                </Tooltip>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">Month</label>
                  <select
                    {...register('convictionMonth')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Year</label>
                  <input
                    type="number"
                    {...register('convictionYear')}
                    min="1900"
                    max={new Date().getFullYear()}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Activities Since Criminal Activity</h3>
              <p className="text-sm text-gray-600 mb-4">
                Please indicate whether the candidate has engaged in any of the following activities. All questions must be answered.
                If you select "Yes", you may optionally provide additional notes or context.
              </p>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Has the candidate presented efforts to acquire work experience?</p>
                  <div className="flex items-center space-x-4 mb-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        {...register('activities.workExperience')}
                        value="yes"
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        {...register('activities.workExperience')}
                        value="unknown"
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>Unknown</span>
                    </label>
                  </div>
                  {errors.activities?.workExperience && (
                    <p className="text-sm text-red-600">{errors.activities.workExperience.message}</p>
                  )}
                  {activities.workExperience === 'yes' && (
                    <div>
                      <label className="block text-sm text-gray-600 italic mb-1">Optional: Add any additional notes about the work experience</label>
                      <textarea
                        {...register('activities.workExperienceDetails')}
                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        rows={2}
                        placeholder="Additional notes about work experience (optional)..."
                      />
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Has the candidate engaged in job training?</p>
                  <div className="flex items-center space-x-4 mb-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        {...register('activities.jobTraining')}
                        value="yes"
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        {...register('activities.jobTraining')}
                        value="unknown"
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>Unknown</span>
                    </label>
                  </div>
                  {errors.activities?.jobTraining && (
                    <p className="text-sm text-red-600">{errors.activities.jobTraining.message}</p>
                  )}
                  {activities.jobTraining === 'yes' && (
                    <div>
                      <label className="block text-sm text-gray-600 italic mb-1">Optional: Add any additional notes about the job training</label>
                      <textarea
                        {...register('activities.jobTrainingDetails')}
                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        rows={2}
                        placeholder="Additional notes about job training (optional)..."
                      />
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Has the candidate engaged in any educational programming?</p>
                  <div className="flex items-center space-x-4 mb-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        {...register('activities.education')}
                        value="yes"
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        {...register('activities.education')}
                        value="unknown"
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>Unknown</span>
                    </label>
                  </div>
                  {errors.activities?.education && (
                    <p className="text-sm text-red-600">{errors.activities.education.message}</p>
                  )}
                  {activities.education === 'yes' && (
                    <div>
                      <label className="block text-sm text-gray-600 italic mb-1">Optional: Add any additional notes about the educational programming</label>
                      <textarea
                        {...register('activities.educationDetails')}
                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        rows={2}
                        placeholder="Additional notes about educational programming (optional)..."
                      />
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Has the candidate engaged in counseling?</p>
                  <div className="flex items-center space-x-4 mb-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        {...register('activities.counseling')}
                        value="yes"
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        {...register('activities.counseling')}
                        value="unknown"
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>Unknown</span>
                    </label>
                  </div>
                  {errors.activities?.counseling && (
                    <p className="text-sm text-red-600">{errors.activities.counseling.message}</p>
                  )}
                  {activities.counseling === 'yes' && (
                    <div>
                      <label className="block text-sm text-gray-600 italic mb-1">Optional: Add any additional notes about the counseling</label>
                      <textarea
                        {...register('activities.counselingDetails')}
                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        rows={2}
                        placeholder="Additional notes about counseling (optional)..."
                      />
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Has the candidate engaged in rehabilitation efforts?</p>
                  <div className="flex items-center space-x-4 mb-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        {...register('activities.rehabilitation')}
                        value="yes"
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        {...register('activities.rehabilitation')}
                        value="unknown"
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>Unknown</span>
                    </label>
                  </div>
                  {errors.activities?.rehabilitation && (
                    <p className="text-sm text-red-600">{errors.activities.rehabilitation.message}</p>
                  )}
                  {activities.rehabilitation === 'yes' && (
                    <div>
                      <label className="block text-sm text-gray-600 italic mb-1">Optional: Add any additional notes about the rehabilitation efforts</label>
                      <textarea
                        {...register('activities.rehabilitationDetails')}
                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        rows={2}
                        placeholder="Additional notes about rehabilitation efforts (optional)..."
                      />
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Has the candidate engaged in community service?</p>
                  <div className="flex items-center space-x-4 mb-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        {...register('activities.communityService')}
                        value="yes"
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        {...register('activities.communityService')}
                        value="unknown"
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span>Unknown</span>
                    </label>
                  </div>
                  {errors.activities?.communityService && (
                    <p className="text-sm text-red-600">{errors.activities.communityService.message}</p>
                  )}
                  {activities.communityService === 'yes' && (
                    <div>
                      <label className="block text-sm text-gray-600 italic mb-1">Optional: Add any additional notes about the community service</label>
                      <textarea
                        {...register('activities.communityServiceDetails')}
                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        rows={2}
                        placeholder="Additional notes about community service (optional)..."
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Decision</h3>
              <div className="space-y-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    {...register('decision')}
                    value="extend"
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>Extend Offer of Employment</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    {...register('decision')}
                    value="rescind"
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>Consider Rescinding Offer</span>
                </label>
              </div>

              {decision === 'extend' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register('storeAssessment')}
                      className="text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Store this assessment and the candidate's restorative record in their profile
                    </span>
                  </label>
                </div>
              )}

              {decision === 'rescind' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Reason for Considering Rescinding Offer
                  </label>
                  <textarea
                    {...register('rescindReason')}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Describe the link between the specific aspects of the applicant's criminal history with risks inherent in the duties of the employment position..."
                  />
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <Button type="button" variant="secondary">
                Save Draft
              </Button>
              <Button type="submit">
                {decision === 'extend' ? 'Confirm & Submit' : 'Proceed to Revocation Process'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}