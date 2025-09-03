'use client'

import { useState } from 'react'
import Card from '../ui/Card'
import CodeEditor from '../ui/CodeEditor'

export default function BasicsTab() {
  const [code, setCode] = useState(`// Sample text
const myText = "JavaScript is great for Data Science and Text Mining!";

// Basic operations
console.log("Original:", myText);
console.log("Length:", myText.length);
console.log("Lowercase:", myText.toLowerCase());
console.log("First 10 chars:", myText.substring(0, 10));

// Count specific letters
const countA = (myText.toLowerCase().match(/a/g) || []).length;
console.log("Count of 'a':", countA);`)

  const [output, setOutput] = useState('')

  const runCode = () => {
    try {
      const logs: string[] = []
      const originalLog = console.log
      console.log = (...args) => {
        logs.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' '))
      }

      eval(code)
      
      console.log = originalLog
      setOutput(logs.join('\n'))
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  return (
    <div className="space-y-6">
      <Card title="Working with Text in JavaScript" status="primary">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Basic Text Operations</h4>
          <p className="text-gray-700">Before we dive into complex analysis, let's learn basic text manipulation in JavaScript:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-semibold mb-2">String Methods:</h5>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`// Basic string operations
text.length              // Count characters
text.toUpperCase()       // Convert to uppercase
text.toLowerCase()       // Convert to lowercase
text.substring(0, 5)     // Extract substring
text1 + ' ' + text2      // Combine strings`}
              </pre>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Pattern Matching:</h5>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`// Find and replace patterns
text.includes('word')       // Check if contains word
text.indexOf('pattern')     // Find position
text.replace('old', 'new')  // Replace pattern
text.match(/word/g)         // Match all occurrences
(text.match(/word/g) || []).length  // Count`}
              </pre>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Practice Text Operations" status="success">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <CodeEditor
              value={code}
              onChange={setCode}
              height="350px"
            />
          </div>
          <div className="space-y-4">
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
        </div>
      </Card>
    </div>
  )
}