import { ArrowLeft } from 'lucide-react'
import { Button } from './Button'
import { Link } from 'react-router-dom'

interface NavigationProps {
  onBack?: () => void
  showBack?: boolean
  currentStep?: string
}

export function Navigation({ onBack, showBack = true, currentStep }: NavigationProps) {
  return (
    <div className="flex h-screen">
      {/* Side Navigation */}
      <div className="w-64 bg-gray-900">
        <div className="h-full flex flex-col">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-white">Fair Chance Hiring</h1>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              <Link
                to="/"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Process Overview
              </Link>
              <Link
                to="/assessment"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Individual Assessment
              </Link>
              <Link
                to="/preliminary-notice"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Preliminary Notice
              </Link>
              <Link
                to="/reassessment"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Reassessment
              </Link>
              <Link
                to="/final-decision"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Final Decision
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b">
          <div className="px-4 py-4 sm:px-6 lg:px-8">
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
        <div className="flex-1 overflow-y-auto">
          {/* Content will be rendered here */}
        </div>
      </div>
    </div>
  )
}