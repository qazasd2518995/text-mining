'use client'

import { useState } from 'react'
import { 
  PlayCircle, 
  Type, 
  Brush, 
  BarChart3, 
  Cloud, 
  Smile, 
  Link, 
  Table, 
  Laptop, 
  Bookmark 
} from 'lucide-react'

// Tab components
import IntroTab from './tabs/IntroTab'
import BasicsTab from './tabs/BasicsTab'
import PreprocessingTab from './tabs/PreprocessingTab'
import FrequencyTab from './tabs/FrequencyTab'
import WordCloudTab from './tabs/WordCloudTab'
import PracticeTab from './tabs/PracticeTab'
import ResourcesTab from './tabs/ResourcesTab'

const tabs = [
  { id: 'intro', name: 'Getting Started', icon: PlayCircle, component: IntroTab },
  { id: 'basics', name: 'Text Basics', icon: Type, component: BasicsTab },
  { id: 'preprocessing', name: 'Text Preprocessing', icon: Brush, component: PreprocessingTab },
  { id: 'frequency', name: 'Word Frequency', icon: BarChart3, component: FrequencyTab },
  { id: 'wordcloud', name: 'Word Clouds', icon: Cloud, component: WordCloudTab },
  { id: 'practice', name: 'Practice Lab', icon: Laptop, component: PracticeTab },
  { id: 'resources', name: 'Resources', icon: Bookmark, component: ResourcesTab },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('intro')
  
  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || IntroTab

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-bold">
              Learn Text Mining in JavaScript - Interactive Tutorial
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-md min-h-screen">
            <nav className="mt-8">
              <ul className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="mr-3 h-5 w-5" />
                        {tab.name}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 bg-gray-50">
            <div className="tab-content">
              <ActiveComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}