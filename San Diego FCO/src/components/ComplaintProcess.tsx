import React from 'react'
import { Navigation } from './ui/Navigation'
import { useNavigate } from 'react-router-dom'

export function ComplaintProcess() {
  const navigate = useNavigate()

  return (
    <>
      <Navigation 
        currentStep="San Diego Fair Chance Ordinance Complaint Process" 
        showBack={true} 
        onBack={() => navigate('/')}
      />
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-md prose max-w-none">
          <div className="space-y-6">
            <p>
              Under the San Diego Fair Chance Ordinance, a candidate alleging that an employer has violated any of the provisions of the Ordinance, within one year of the alleged violation, can file a complaint with OLSE. A complaint could be filed by contacting OLSE by email, phone, or in person at our Office located at the County Administration Center (CAC).
            </p>

            <p>
              Upon receiving a complaint, OLSE will engage in a formal intake process with the candidate. OLSE has staff that can complete intake in Spanish or English and will incorporate interpretation services for candidates who speak other languages. OLSE will also provide the candidate with a letter acknowledging their claim submittal, and the legal right to pursue civil action against the employer instead of continuing with a claim with OLSE.
            </p>

            <p>
              Cases falling outside OLSE's jurisdiction will be referred to our partners at other agencies or local non-profits, like the Employee Rights Center (ERC), who support workers, especially disadvantaged workers without union representation, by providing education on workplace, health, and immigration issues.
            </p>

            <p>
              Simultaneously, OLSE will contact the employer and inform them of the alleged violation and provide an opportunity to respond to the notice. If OLSE has reason to believe that an employer has violated any provision of this Ordinance, OLSE will investigate the alleged violation.
            </p>

            <p>
              Investigation can include access to inspect books and records such as the individualized written assessment and to interview persons, including employees. If, during the course of an investigation, OLSE has determined a violation likely has occurred, OLSE may issue a correction order to the employer. This order will outline the specific violation necessitating rectification and specify a reasonable timeframe for compliance.
            </p>

            <p>
              OLSE will also provide the employer with training, resources, and educational material to assist with compliance. If during the course of the investigation, OLSE determined a violation did not occur, OLSE will notify the candidate and refer them to employment programs including but not limited to the Center for Employment Opportunities (CEO), Second Chance, or the San Diego Workforce Partnership, programs able to aid the candidate with locating suitable employment.
            </p>

            <p>
              If the employer does not comply with the corrective action issued by OLSE or has additional subsequent claims by other candidates that were determined to be a violation, OLSE shall issue a written notice requiring the employer to immediately remedy the violation and impose an administrative penalty and/or order any appropriate relief.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg my-8">
              <h3 className="text-lg font-semibold mb-4">Administrative Penalties (Effective July 1, 2025)</h3>
              <p className="mb-4">
                Beginning on July 1, 2025, OLSE may issue administrative penalties for violation of this Ordinance, with no less than half of the penalties collected by OLSE awarded to each aggrieved candidate, as follows:
              </p>
              <ul className="list-none space-y-2">
                <li>• For a first violation, a penalty of up to five thousand dollars ($5,000)</li>
                <li>• For a second violation, a penalty of up to ten thousand ($10,000)</li>
                <li>• For the third and subsequent violations, a penalty of up to twenty thousand ($20,000)</li>
              </ul>
            </div>

            <p>
              OLSE will also provide both the employer and the candidate the opportunity to appeal the findings of a claim with a County hearing officer which will constitute the County's final decision.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}