'use client'

import { useState } from 'react'
import Card from '../ui/Card'
import CodeEditor from '../ui/CodeEditor'
import { TextProcessor } from '../../lib/textProcessing'

export default function PreprocessingTab() {
  const [code, setCode] = useState(`// Sample messy text
const rawText = "Hello!!! This is SAMPLE text with 123 numbers, punctuation... and LOTS of issues???";

// Step by step cleaning
const step1 = rawText.toLowerCase();
console.log("Step 1 - Lowercase:", step1);

// Remove punctuation (replace with spaces)
const step2 = step1.replace(/[^\\w\\s]/g, ' ');
console.log("Step 2 - No punctuation:", step2);

// Remove numbers
const step3 = step2.replace(/\\d+/g, ' ');
console.log("Step 3 - No numbers:", step3);

// Strip extra whitespace
const step4 = step3.replace(/\\s+/g, ' ').trim();
console.log("Step 4 - Clean whitespace:", step4);

console.log("\\nOriginal:", rawText);
console.log("Cleaned:", step4);

// Remove stopwords
const basicStopwords = new Set(['the', 'and', 'is', 'this', 'with', 'of', 'a', 'an']);
const words = step4.split(' ').filter(word => word.length > 0);
const cleanedWords = words.filter(word => !basicStopwords.has(word));
const finalText = cleanedWords.join(' ');
console.log("No stopwords:", finalText);`)

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
      <Card title="Text Preprocessing" status="primary">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Why Preprocess Text?</h4>
          <p className="text-gray-700">
            Raw text contains noise that can interfere with analysis. Preprocessing cleans and standardizes text:
          </p>
          
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Remove punctuation and special characters</li>
            <li>Convert to lowercase</li>
            <li>Remove stopwords (common words like 'the', 'and')</li>
            <li>Remove extra whitespace</li>
            <li>Stem or lemmatize words</li>
          </ul>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Preprocessing Functions" status="warning">
          <div className="space-y-4">
            <h5 className="font-semibold">Common Preprocessing Steps:</h5>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`// Basic text cleaning in JavaScript

// Remove punctuation
text.replace(/[^\\w\\s]/g, ' ')

// Remove numbers  
text.replace(/\\d+/g, ' ')

// Remove extra whitespace
text.replace(/\\s+/g, ' ').trim()

// Convert to lowercase
text.toLowerCase()

// Remove stopwords
words.filter(word => !stopwords.has(word))

// Basic stemming
word.replace(/ing$|ed$|s$/g, '')`}
            </pre>
          </div>
        </Card>

        <Card title="Interactive Preprocessing" status="success">
          <div className="space-y-4">
            <CodeEditor
              value={code}
              onChange={setCode}
              height="350px"
            />
            <button
              onClick={runCode}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Run Code
            </button>
          </div>
        </Card>
      </div>

      <Card title="Preprocessing Output" status="info">
        {output && (
          <div className="code-output">{output}</div>
        )}
        <div className="tip-box mt-4">
          <strong>Best Practice:</strong> Always examine your text before and after preprocessing to ensure you're not removing important information!
        </div>
      </Card>
    </div>
  )
}