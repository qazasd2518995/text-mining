'use client'

import { useState } from 'react'
import Card from '../ui/Card'
import CodeEditor from '../ui/CodeEditor'

export default function PracticeTab() {
  const [code, setCode] = useState(`// Practice area - write your text mining code here
// Try the challenges below!

// Challenge 1 example:
const messyText = "Hello!!! This is 123 MESSY text with punctuation... Clean it up!";

// Your solution here:
let cleaned = messyText.toLowerCase();
cleaned = cleaned.replace(/[^\\w\\s]/g, ' ');  // Remove punctuation
cleaned = cleaned.replace(/\\d+/g, ' ');       // Remove numbers
cleaned = cleaned.replace(/\\s+/g, ' ').trim(); // Clean whitespace

console.log("Original:", messyText);
console.log("Cleaned:", cleaned);`)

  const [output, setOutput] = useState('')

  const runCode = () => {
    try {
      if (!code.trim()) {
        setOutput("Write some text mining code and click 'Run Code' to see the output!")
        return
      }

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
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}\n\nTip: Check your syntax and make sure all quotes and parentheses are balanced.`)
    }
  }

  const clearCode = () => {
    setCode(`// Practice area - write your text mining code here
// Try the challenges below!

// Challenge 1 example:
const messyText = "Hello!!! This is 123 MESSY text with punctuation... Clean it up!";

// Your solution here:
let cleaned = messyText.toLowerCase();
cleaned = cleaned.replace(/[^\\w\\s]/g, ' ');  // Remove punctuation
cleaned = cleaned.replace(/\\d+/g, ' ');       // Remove numbers
cleaned = cleaned.replace(/\\s+/g, ' ').trim(); // Clean whitespace

console.log("Original:", messyText);
console.log("Cleaned:", cleaned);`)
    setOutput('')
  }

  return (
    <div className="space-y-6">
      <Card title="Text Mining Practice Lab" status="primary">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Apply Your Knowledge</h4>
          <p className="text-gray-700">Use this area to practice text mining techniques. Try these challenges:</p>
          
          <div className="space-y-4">
            <div className="exercise-box">
              <h5 className="font-semibold">Challenge 1: Text Cleaning</h5>
              <p>Clean this messy text: 'Hello!!! This is 123 MESSY text with punctuation... Clean it up!'</p>
            </div>
            
            <div className="exercise-box">
              <h5 className="font-semibold">Challenge 2: Frequency Analysis</h5>
              <p>Find the top 5 most common words in a collection of sentences (excluding stopwords).</p>
            </div>
            
            <div className="exercise-box">
              <h5 className="font-semibold">Challenge 3: Simple Pattern Matching</h5>
              <p>Count how many times specific words appear in text using regular expressions or string methods.</p>
            </div>
            
            <div className="exercise-box">
              <h5 className="font-semibold">Challenge 4: Basic Text Statistics</h5>
              <p>Calculate text statistics: number of characters, words, and sentences.</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Your Code" status="success">
          <div className="space-y-4">
            <CodeEditor
              value={code}
              onChange={setCode}
              height="450px"
            />
            <div className="flex gap-2">
              <button
                onClick={runCode}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Run Code
              </button>
              <button
                onClick={clearCode}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Reset Code
              </button>
            </div>
          </div>
        </Card>

        <Card title="Output & Notes" status="info">
          {output && (
            <div className="mb-4">
              <div className="code-output">{output}</div>
            </div>
          )}
          
          <div>
            <h5 className="font-semibold mb-2">Quick Reference:</h5>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              <li><code>toLowerCase()</code>, <code>toUpperCase()</code></li>
              <li><code>replace()</code>, <code>match()</code>, <code>includes()</code></li>
              <li><code>split()</code>, <code>join()</code></li>
              <li><code>Object.entries()</code>, <code>sort()</code></li>
              <li><code>/[^\\w\\s]/g</code> - remove punctuation</li>
              <li><code>/\\d+/g</code> - remove numbers</li>
              <li><code>/\\s+/g</code> - normalize whitespace</li>
            </ul>
          </div>
          
          <div className="tip-box mt-4">
            <strong>Note:</strong> This version works with native JavaScript functions for cross-platform compatibility.
          </div>
        </Card>
      </div>
    </div>
  )
}