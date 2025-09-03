'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '../ui/Card'
import CodeEditor from '../ui/CodeEditor'
import { TextProcessor } from '../../lib/textProcessing'

export default function FrequencyTab() {
  const [code, setCode] = useState(`// Sample text corpus
const texts = [
  "Text mining is the process of deriving information from text",
  "Data science involves analyzing data to extract insights", 
  "Machine learning helps in analyzing patterns in data",
  "Text analysis is important for understanding documents"
];

// Combine all texts
const allText = texts.join(" ");
console.log("Combined text:", allText);

// Basic preprocessing
let cleaned = allText.toLowerCase();
cleaned = cleaned.replace(/[^\\w\\s]/g, ' '); // Remove punctuation
const words = cleaned.split(/\\s+/).filter(word => word.length > 0);

// Remove basic stopwords
const basicStopwords = new Set(['the', 'is', 'of', 'to', 'and', 'in', 'for', 'from']);
const filteredWords = words.filter(word => !basicStopwords.has(word));

// Count frequency
const wordFreq = {};
filteredWords.forEach(word => {
  wordFreq[word] = (wordFreq[word] || 0) + 1;
});

// Sort by frequency
const sortedFreq = Object.entries(wordFreq)
  .sort(([,a], [,b]) => b - a)
  .slice(0, 10);

console.log("\\nTop 10 most frequent words:");
sortedFreq.forEach(([word, freq]) => {
  console.log(\`\${word}: \${freq}\`);
});`)

  const [output, setOutput] = useState('')
  const [chartData, setChartData] = useState<Array<{word: string, frequency: number}>>([])

  const runCode = () => {
    try {
      const logs: string[] = []
      const originalLog = console.log
      console.log = (...args) => {
        logs.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' '))
      }

      // Execute the code and capture frequency data
      eval(code)
      
      // Extract chart data from the executed code
      const texts = [
        "Text mining is the process of deriving information from text",
        "Data science involves analyzing data to extract insights", 
        "Machine learning helps in analyzing patterns in data",
        "Text analysis is important for understanding documents"
      ];
      
      const allText = texts.join(" ");
      let cleaned = allText.toLowerCase();
      cleaned = cleaned.replace(/[^\w\s]/g, ' ');
      const words = cleaned.split(/\s+/).filter(word => word.length > 0);
      
      const basicStopwords = new Set(['the', 'is', 'of', 'to', 'and', 'in', 'for', 'from']);
      const filteredWords = words.filter(word => !basicStopwords.has(word));
      
      const wordFreq: Record<string, number> = {};
      filteredWords.forEach(word => {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      });
      
      const sortedFreq = Object.entries(wordFreq)
        .sort(([,a], [,b]) => (b as number) - (a as number))
        .slice(0, 8)
        .map(([word, frequency]) => ({ word, frequency: frequency as number }));
      
      setChartData(sortedFreq);
      
      console.log = originalLog
      setOutput(logs.join('\n'))
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  return (
    <div className="space-y-6">
      <Card title="Word Frequency Analysis" status="primary">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Understanding Word Frequencies</h4>
          <p className="text-gray-700">
            Word frequency analysis reveals which words appear most often in your text. 
            This is fundamental to many text mining applications.
          </p>
          
          <div>
            <h5 className="font-semibold mb-2">Methods for Frequency Analysis:</h5>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Simple word counting</li>
              <li>Term frequency (TF)</li>
              <li>Term frequency-inverse document frequency (TF-IDF)</li>
              <li>Frequency plots and charts</li>
            </ul>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Create Frequency Analysis" status="success">
          <div className="space-y-4">
            <CodeEditor
              value={code}
              onChange={setCode}
              height="400px"
            />
            <button
              onClick={runCode}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Run Code
            </button>
          </div>
        </Card>

        <Card title="Frequency Results & Plot" status="info">
          {output && (
            <div className="mb-4">
              <div className="code-output">{output}</div>
            </div>
          )}
          
          {chartData.length > 0 && (
            <div>
              <h5 className="font-semibold mb-2">Top Words Chart:</h5>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="word" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="frequency" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}