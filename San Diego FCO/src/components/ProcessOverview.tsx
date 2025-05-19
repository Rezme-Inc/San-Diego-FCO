import React from 'react'
import { ClipboardList, CheckCircle2, FileText, AlertTriangle, ArrowRight, Scale } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/Button'

interface Step {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  status: 'upcoming' | 'current' | 'completed'
}

const steps: Step[] = [
  {
    id: 'assessment',
    title: 'Individual Assessment',
    description: 'Complete the initial assessment form evaluating the candidate\'s criminal history in relation to job duties.',
    icon: <ClipboardList className="w-6 h-6" />,
    status: 'current'
  },
  {
    id: 'preliminary-notice',
    title: 'Preliminary Notice',
    description: 'If considering revocation, send a preliminary notice and wait for candidate response.',
    icon: <FileText className="w-6 h-6" />,
    status: 'upcoming'
  },
  {
    id: 'reassessment',
    title: 'Reassessment',
    description: 'Review any evidence provided by the candidate and reassess the decision.',
    icon: <AlertTriangle className="w-6 h-6" />,
    status: 'upcoming'
  },
  {
    id: 'final-decision',
    title: 'Final Decision',
    description: 'Make and communicate the final employment decision.',
    icon: <CheckCircle2 className="w-6 h-6" />,
    status: 'upcoming'
  }
]

export function ProcessOverview() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">
            Fair Chance Hiring Assessment Process
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Follow these steps to conduct a compliant individualized assessment under the 
            San Diego Fair Chance Ordinance
          </p>
        </div>

        {/* Legal Overview and Complaint Process Cards - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* San Diego Fair Chance Ordinance Legal Overview */}
          <div 
            className="bg-white rounded-lg shadow-lg border border-blue-100 p-6 h-full cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => navigate('/legal-overview')}
          >
            {/* Status Row */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-900">Legal Scan Completed</span>
              <span className="flex items-center gap-2 bg-green-100 px-4 py-1 rounded-full">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600">
                  <CheckCircle2 className="w-4 h-4 text-white" fill="currentColor" />
                </span>
                <span className="text-sm font-semibold text-green-800">Updated 33 hours ago</span>
              </span>
            </div>
            {/* Card Title Row */}
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                San Diego Fair Chance Ordinance Legal Overview
              </h2>
            </div>
          </div>

          {/* San Diego Fair Chance Ordinance Complaint Process */}
          <div 
            className="bg-white rounded-lg shadow-lg border border-blue-100 p-6 h-full cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => navigate('/complaint-process')}
          >
            {/* Status Row */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-900">Legal Scan Completed</span>
              <span className="flex items-center gap-2 bg-green-100 px-4 py-1 rounded-full">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600">
                  <CheckCircle2 className="w-4 h-4 text-white" fill="currentColor" />
                </span>
                <span className="text-sm font-semibold text-green-800">Updated 33 hours ago</span>
              </span>
            </div>
            {/* Card Title Row */}
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                San Diego Fair Chance Ordinance Complaint Process
              </h2>
            </div>
          </div>
        </div>

        {/* Introduction Card */}
        <div className="bg-white rounded-lg shadow-lg border border-blue-100 p-8 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Scale className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              About the Fair Chance Hiring Ordinance
            </h2>
          </div>
          
          <div className="prose max-w-none">
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Why Fair Chance Hiring Matters</h3>
              <p className="text-gray-600 leading-relaxed">
                Ensuring individuals with criminal records have fair and equitable access to opportunities 
                for gainful employment is critical to making communities safer and achieving rehabilitative 
                outcomes. Research has found that system-impacted individuals perform the same as or better 
                than employees without criminal records and are more loyal to their employers than their 
                counterparts.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">The County's Commitment</h3>
              <p className="text-gray-600 leading-relaxed">
                In collaboration with community groups and business organizations supporting formerly 
                incarcerated individuals, the Office of Labor Standards and Enforcement (OLSE) has 
                established a local Fair Chance Ordinance to complement the state FCA and clarify 
                justice-involved worker rights. This Ordinance creates additional protections and 
                enforcement mechanisms to ensure meaningful implementation.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-blue-900 mb-3">Impact and Benefits</h3>
              <ul className="space-y-3 text-blue-800">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Supports successful reintegration into the workforce</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Reduces recidivism rates in our community</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Creates a streamlined process for addressing discriminatory hiring practices</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Demonstrates commitment to equitable employment opportunities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-between">
            {steps.map((step, stepIdx) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`relative flex h-12 w-12 items-center justify-center rounded-full ${
                    step.status === 'completed' 
                      ? 'bg-blue-600' 
                      : step.status === 'current'
                      ? 'bg-blue-600'
                      : 'bg-gray-300'
                  }`}
                >
                  <span className="text-white">{step.icon}</span>
                </div>
                {stepIdx < steps.length - 1 && (
                  <div className="hidden sm:block">
                    <ArrowRight className="w-6 h-6 text-gray-400 mx-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Details */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`relative rounded-lg border ${
                step.status === 'current' 
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-300 bg-white'
              } p-6 shadow-sm`}
            >
              <div className="flex items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    step.status === 'completed'
                      ? 'bg-blue-600'
                      : step.status === 'current'
                      ? 'bg-blue-600'
                      : 'bg-gray-300'
                  }`}
                >
                  <span className="text-white">{step.icon}</span>
                </div>
                <h3 className="ml-4 text-lg font-medium text-gray-900">{step.title}</h3>
              </div>
              <p className="mt-4 text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Important Information */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-300 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Important Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Required Documentation</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Criminal history report</li>
                <li>Job description and duties</li>
                <li>Evidence of rehabilitation (if provided)</li>
                <li>Written assessment documentation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Time Requirements</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Minimum 5 business days for candidate response</li>
                <li>Additional 5 business days if accuracy is challenged</li>
                <li>Prompt final decision after reassessment</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Start Assessment Button */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => navigate('/assessment')}
            className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Begin Assessment
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}