import React from 'react'
import { Navigation } from './ui/Navigation'
import { useNavigate } from 'react-router-dom'

export function LegalOverview() {
  const navigate = useNavigate()

  return (
    <>
      <Navigation 
        currentStep="San Diego Fair Chance Ordinance Legal Overview" 
        showBack={true} 
        onBack={() => navigate('/')}
      />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-md prose max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">CHAPTER 27. FAIR CHANCE ORDINANCE</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900">SEC. 21.2701. FINDINGS AND PURPOSE</h2>
              <p>In California, one in five residents has a criminal record. In San Diego, data from the Alternatives to Incarceration (ATI) initiative highlighted a significant need for employment opportunities among justice-involved populations in our County. In an effort to address this barrier on a State level, the Fair Chance Act (FCA) was enacted in January 2018 to level the playing field for job candidates with past convictions seeking new employment upon reentry into the community. Although the FCA represents a step forward, both State and local jurisdictions have identified areas for improvement in its implementation and have worked to enhance its enforcement.</p>
              <p>Ensuring individuals with criminal records have fair and equitable access to opportunities for gainful employment is critical to making communities safer and achieving rehabilitative outcomes. Further, research has found that system-impacted individuals perform the same as or better than employees without criminal records and are more loyal to their employers than their counterparts. However, the use of unlawful hiring methods surrounding criminal backgrounds persists.</p>
              <p>In collaboration with community groups and business organizations supporting formerly incarcerated individuals, the Office of Labor Standards and Enforcement (OLSE) has identified a mechanism by which the County can expand support and dismantle employment barriers in our region. This includes establishing a local Fair Chance Ordinance (Ordinance) to complement the state FCA and clarify justice-involved worker rights. This Ordinance creates additional protections and enforcement mechanisms to ensure meaningful implementation. By creating a streamlined process for lodging complaints about discriminatory hiring practices, the County demonstrates its commitment to supporting those seeking to reintegrate into the workforce, reducing recidivism rates, and supporting the successful reintegration of justice-involved individuals into our community.</p>
              <p className="text-sm text-gray-600">(Added by Ord. No. 10914 (N.S.), effective 10-10-24)</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900">SEC. 21.2702. DEFINITIONS</h2>
              <div className="space-y-4">
                <p>(a) "Adverse action" means an Employer's action or decision that materially and adversely affects the terms, conditions, or privileges of Employment of an Applicant or Employee.</p>
                <p>(b) "Applicant" means any individual applying for employment, transfer, or promotion whose employment position involves performing at least two (2) hours of work on average each week within the unincorporated areas of the County.</p>
                <p>(c) "Conditional Offer of Employment" means an Employer's offer of Employment to an Applicant conditioned on the completion of certain specified requirements or conditions.</p>
                <p>(d) "Conviction" means a record from any jurisdiction that includes information indicating that a person has been convicted of a felony or misdemeanor, provided the person was placed on probation, fined, imprisoned, or paroled because of the Conviction.</p>
                <p>(e) "County" means the County of San Diego.</p>
                <p>(f) "Criminal Background Check Report" means any Criminal History report or conviction history report.</p>
                <p>(g) "Criminal History" means information regarding one or more Convictions or Arrests.</p>
                <p>(h) "Employee" means an individual whose Employment position involves performing at least two (2) hours of work on average each week within the unincorporated areas of the County.</p>
                <p>(i) "Employer" means an Employer located or doing business in the unincorporated areas of the County, with five or more employees. "Employer" includes any entity that evaluates an Applicant's or Employee's Criminal History on behalf of an Employer or acts as an agent of Employer. "Employer" does not include the County, its departments, any other local governmental agency or unit, or any unit of the state or federal government.</p>
                <p>(j) "Employment" means any work provided in furtherance of an Employer's business enterprise within the unincorporated areas of the County, which includes remote work from a location within the unincorporated areas of the County.</p>
                <p>(k) "OLSE" means the County of San Diego Office of Labor Standards and Enforcement.</p>
                <p>(l) "Particular Conviction" means a conviction for specific criminal conduct, or a category of criminal offenses prescribed by any federal law, federal regulation, state law, or state regulation that contains requirements, exclusions, or both, expressly based on that specific criminal conduct or category of criminal offenses.</p>
              </div>
              <p className="text-sm text-gray-600 mt-4">(Added by Ord. No. 10914 (N.S.), effective 10-10-24)</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900">SEC. 21.2703. UNLAWFUL EMPLOYMENT PRACTICES</h2>
              <p>An Employer shall not:</p>
              <div className="space-y-4">
                <p>(a) Inquire about or require disclosure of an Applicant's Criminal History at any time before making a Conditional Offer of Employment to the Applicant.</p>
                <p>(b) Include any question on any Employment application that seeks the disclosure of an Applicant's Criminal History.</p>
                <p>(c) Consider, distribute, or disseminate information about any of the following while conducting a Criminal Background Check in connection with any Employment application:</p>
                <div className="pl-8">
                  <p>(1) An Arrest not followed by a valid Conviction;</p>
                  <p>(2) Participation in a diversion or deferral of judgment program;</p>
                  <p>(3) A Conviction that has been judicially dismissed, expunged, voided, invalidated, or otherwise rendered inoperative;</p>
                  <p>(4) A Conviction or any other determination or adjudication in the juvenile justice system;</p>
                  <p>(5) A Conviction that is more than seven years old, the date of the Conviction being the date of sentencing; or</p>
                  <p>(6) Information pertaining to an offense other than a felony or misdemeanor.</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">(Added by Ord. No. 10914 (N.S.), effective 10-10-24)</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900">SEC. 21.2704. NOTICE AND DUTIES</h2>
              <div className="space-y-4">
                <p>(a) Before taking any Adverse Action against an Applicant based on a Criminal Background Check Report, an Employer must:</p>
                <div className="pl-8">
                  <p>(1) Provide the Applicant with a copy of the Criminal Background Check Report;</p>
                  <p>(2) Notify the Applicant of the prospective Adverse Action and the items forming the basis for the prospective Adverse Action; and</p>
                  <p>(3) Provide the Applicant with at least five (5) business days to respond to the notice of the prospective Adverse Action before the Employer may take Adverse Action.</p>
                </div>
                <p>(b) If an Applicant provides the Employer with notice of evidence of the inaccuracy of the items forming the basis for the prospective Adverse Action during the five (5) business day period, the Employer must:</p>
                <div className="pl-8">
                  <p>(1) Delay any Adverse Action for a reasonable period; and</p>
                  <p>(2) During that time reconsider the prospective Adverse Action in light of the information provided by the Applicant.</p>
                </div>
                <p>(c) Upon taking any final Adverse Action based upon an Applicant's Criminal History, an Employer must notify the Applicant of the final Adverse Action.</p>
              </div>
              <p className="text-sm text-gray-600 mt-4">(Added by Ord. No. 10914 (N.S.), effective 10-10-24)</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900">SEC. 21.2705. RECORD KEEPING</h2>
              <p>Employers shall retain records of employment, application forms, and other pertinent data and records required under this Chapter, including but not limited to Criminal Background Check Reports and communications with the Applicant, for a period of not less than three (3) years, and shall allow OLSE access to such records to monitor compliance with this Chapter. Employers shall provide information to OLSE, or the OLSE's designee, on an annual basis as may be required to verify the Employer's compliance with this Chapter.</p>
              <p className="text-sm text-gray-600 mt-4">(Added by Ord. No. 10914 (N.S.), effective 10-10-24)</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900">SEC. 21.2706. PROMULGATION OF RULES AND REGULATIONS</h2>
              <p>OLSE may promulgate and enforce rules and regulations, and issue determinations and interpretations, consistent with and necessary for the implementation of this Chapter. Such rules and regulations shall have the force and effect of law.</p>
              <p className="text-sm text-gray-600 mt-4">(Added by Ord. No. 10914 (N.S.), effective 10-10-24)</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900">SEC. 21.2707. VIOLATIONS</h2>
              <div className="space-y-4">
                <p>(a) OLSE may investigate possible violations of this Chapter.</p>
                <p>(b) Where OLSE has reason to believe that a violation has occurred, it may order any appropriate temporary or interim relief to mitigate the violation or maintain the status quo pending completion of a full investigation or hearing.</p>
                <p>(c) After investigating a possible violation of this Chapter, where OLSE determines that a violation has occurred, it may issue a determination of violation and order any appropriate relief, including but not limited to:</p>
                <div className="pl-8">
                  <p>(1) Administrative penalties of up to one thousand dollars ($1,000) per violation;</p>
                  <p>(2) Hiring of the Applicant;</p>
                  <p>(3) Back pay;</p>
                  <p>(4) Benefits;</p>
                  <p>(5) Reasonable attorney's fees and costs.</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">(Added by Ord. No. 10914 (N.S.), effective 10-10-24)</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900">SEC. 21.2708. SEVERABILITY</h2>
              <p>If any section, subsection, sentence, clause, phrase, or word of this Chapter, or any application thereof to any person or circumstance, is held to be invalid or unconstitutional by a decision of a court of competent jurisdiction, such decision shall not affect the validity of the remaining portions or applications of this Chapter. The Board of Supervisors hereby declares that it would have passed this Chapter and each and every section, subsection, sentence, clause, phrase, and word not declared invalid or unconstitutional without regard to whether any other portion of this Chapter or application thereof would be subsequently declared invalid or unconstitutional.</p>
              <p className="text-sm text-gray-600 mt-4">(Added by Ord. No. 10914 (N.S.), effective 10-10-24)</p>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}