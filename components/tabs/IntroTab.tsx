'use client'

import { useState } from 'react'
import Card from '../ui/Card'
import CodeEditor from '../ui/CodeEditor'

export default function IntroTab() {
  const [code, setCode] = useState(`// Your first text analysis
const text = "Text mining is fun and useful for data science";

// Split into words
const words = text.split(" ");
console.log(words);

// Count words
console.log("Word count:", words.length);`)

  const [output, setOutput] = useState('')

  const runCode = () => {
    try {
      // Capture console.log output
      const logs: string[] = []
      const originalLog = console.log
      console.log = (...args) => {
        logs.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' '))
      }

      // Execute the code
      eval(code)
      
      // Restore original console.log
      console.log = originalLog
      
      setOutput(logs.join('\n'))
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  return (
    <div className="space-y-6">
      <Card title="Welcome to Text Mining with JavaScript!" status="primary">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">What is Text Mining?</h3>
            <p className="text-gray-700">
              Text mining (also called text analytics) is the process of extracting meaningful information 
              from unstructured text data. It combines techniques from statistics, linguistics, and machine learning.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-2">What Can You Do with Text Mining?</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Analyze customer feedback and reviews</li>
              <li>Study social media sentiment</li>
              <li>Extract topics from documents</li>
              <li>Classify documents automatically</li>
              <li>Find patterns in literature or news</li>
              <li>Create word clouds and visualizations</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-2">JavaScript Libraries for Text Mining</h4>
            <p className="text-gray-700 mb-2">JavaScript has excellent libraries for text analysis:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li><strong>Natural</strong> - Natural language processing toolkit</li>
              <li><strong>compromise</strong> - Natural language understanding</li>
              <li><strong>sentiment</strong> - Sentiment analysis</li>
              <li><strong>wordcloud</strong> - Create beautiful word clouds</li>
              <li><strong>d3.js</strong> - Data visualization</li>
            </ul>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Your First Text Analysis" status="success">
          <div className="space-y-4">
            <p className="text-gray-700">Let's start by analyzing a simple text:</p>
            <div className="exercise-box">
              <strong>Try this:</strong> Count words in a sentence
            </div>
            <CodeEditor
              value={code}
              onChange={setCode}
              height="150px"
            />
            <button
              onClick={runCode}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Run Code
            </button>
            {output && (
              <div>
                <h5 className="font-semibold mb-2">Output:</h5>
                <div className="code-output">{output}</div>
              </div>
            )}
          </div>
        </Card>

        <Card title="Text Mining Workflow" status="info">
          <div className="space-y-4">
            <h5 className="font-semibold">Typical Steps in Text Mining:</h5>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
              <li>Data Collection</li>
              <li>Text Preprocessing</li>
              <li>Tokenization</li>
              <li>Cleaning (remove stopwords, punctuation)</li>
              <li>Analysis (frequency, sentiment, topics)</li>
              <li>Visualization and Interpretation</li>
            </ol>
            <div className="tip-box">
              <strong>Tip:</strong> Most time in text mining is spent on preprocessing and cleaning!
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}