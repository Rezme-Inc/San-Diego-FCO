import { z } from 'zod'

const storedDataSchema = z.object({
  employerName: z.string(),
  applicantName: z.string(),
  positionApplied: z.string(),
  dateConditionalOffer: z.string(),
  dateAssessment: z.string(),
  dateCriminalHistory: z.string(),
  assessmentPerformer: z.string(),
  jobDuties: z.array(z.string()),
  criminalConduct: z.string(),
  convictionMonth: z.string(),
  convictionYear: z.string(),
  activities: z.object({
    workExperience: z.enum(['yes', 'unknown']).optional(),
    workExperienceDetails: z.string().optional(),
    jobTraining: z.enum(['yes', 'unknown']).optional(),
    jobTrainingDetails: z.string().optional(),
    education: z.enum(['yes', 'unknown']).optional(),
    educationDetails: z.string().optional(),
    counseling: z.enum(['yes', 'unknown']).optional(),
    counselingDetails: z.string().optional(),
    rehabilitation: z.enum(['yes', 'unknown']).optional(),
    rehabilitationDetails: z.string().optional(),
    communityService: z.enum(['yes', 'unknown']).optional(),
    communityServiceDetails: z.string().optional(),
  }).partial(),
  decision: z.enum(['extend', 'rescind']).optional().nullable(),
  rescindReason: z.string().optional(),
  storeAssessment: z.boolean().optional()
}).partial()

export type StoredData = z.infer<typeof storedDataSchema>

const STORAGE_KEY = 'fair-chance-assessment-data'

export function saveFormData(data: StoredData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving form data:', error)
  }
}

export function loadFormData(): StoredData | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return null

    const parsedData = JSON.parse(data)
    const validatedData = storedDataSchema.safeParse(parsedData)
    
    if (!validatedData.success) {
      console.error('Invalid stored data:', validatedData.error)
      return null
    }

    return validatedData.data
  } catch (error) {
    console.error('Error loading form data:', error)
    return null
  }
}

export function clearFormData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing form data:', error)
  }
}