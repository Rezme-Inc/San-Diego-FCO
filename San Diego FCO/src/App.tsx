import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ProcessOverview } from './components/ProcessOverview'
import { AssessmentForm } from './components/AssessmentForm'
import { RevocationForm } from './components/RevocationForm'
import { IndividualReassessmentForm } from './components/IndividualReassessmentForm'
import { FinalRevocationNotice } from './components/FinalRevocationNotice'
import { LegalOverview } from './components/LegalOverview'
import { ComplaintProcess } from './components/ComplaintProcess'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProcessOverview />} />
        <Route path="/assessment" element={<AssessmentForm />} />
        <Route path="/preliminary-notice" element={<RevocationForm assessmentData={null} onBack={() => {}} />} />
        <Route path="/reassessment" element={<IndividualReassessmentForm assessmentData={null} />} />
        <Route 
          path="/final-decision" 
          element={
            <FinalRevocationNotice 
              initialData={{
                applicantName: '',
                dateOfNotice: '',
                position: '',
                employerName: '',
                employerCompany: ''
              }} 
            />
          } 
        />
        <Route path="/legal-overview" element={<LegalOverview />} />
        <Route path="/complaint-process" element={<ComplaintProcess />} />
      </Routes>
    </Router>
  )
}

export default App