'use client'

import { useState } from 'react'
import Card from '../ui/Card'

interface WordFrequency {
  text: string
  size: number
}

function SimpleWordCloud({ words }: { words: WordFrequency[] }) {
  if (words.length === 0) return <div className="text-center py-8">No words to display</div>

  const maxSize = Math.max(...words.map(w => w.size))
  const minSize = Math.min(...words.map(w => w.size))
  const sizeRange = maxSize - minSize || 1

  return (
    <div className="flex flex-wrap justify-center items-center p-4 min-h-[300px] bg-white border rounded">
      {words.map((word, index) => {
        const normalizedSize = ((word.size - minSize) / sizeRange) * 40 + 12
        const colors = [
          '#3b82f6', '#ef4444', '#10b981', '#f59e0b', 
          '#8b5cf6', '#06b6d4', '#f97316', '#84cc16'
        ]
        const color = colors[index % colors.length]
        
        return (
          <span
            key={index}
            className="inline-block m-1 font-bold cursor-default transition-all hover:scale-110"
            style={{
              fontSize: `${normalizedSize}px`,
              color: color,
              lineHeight: 1.2
            }}
            title={`${word.text}: ${word.size}`}
          >
            {word.text}
          </span>
        )
      })}
    </div>
  )
}

export default function WordCloudTab() {
  const [textSource, setTextSource] = useState('datasci')
  const [customText, setCustomText] = useState('Enter your own text here for analysis...')
  const [maxWords, setMaxWords] = useState(50)
  const [colorPalette, setColorPalette] = useState('Dark2')
  const [wordCloudData, setWordCloudData] = useState<WordFrequency[]>([])

  const sampleTexts = {
    datasci: "Data science is an interdisciplinary field that uses scientific methods processes algorithms and systems to extract knowledge and insights from structured and unstructured data. Machine learning artificial intelligence statistics and big data analytics are core components of data science",
    literature: "It was the best of times it was the worst of times it was the age of wisdom it was the age of foolishness it was the epoch of belief it was the epoch of incredulity it was the season of light it was the season of darkness",
    custom: customText
  }

  const createWordCloud = () => {
    const textData = sampleTexts[textSource as keyof typeof sampleTexts]
    
    // Preprocess text
    let textClean = textData.toLowerCase()
    textClean = textClean.replace(/[^\w\s]/g, ' ')
    textClean = textClean.replace(/\d+/g, ' ')
    const words = textClean.split(/\s+/).filter(word => word.length > 0)
    
    // Basic stopwords
    const basicStopwords = new Set([
      'the', 'and', 'is', 'it', 'was', 'of', 'to', 'a', 'an', 'in', 'on', 
      'at', 'for', 'with', 'by', 'from', 'as', 'be', 'are', 'been', 'being'
    ])
    const filteredWords = words.filter(word => !basicStopwords.has(word) && word.length > 2)
    
    // Calculate frequencies
    const wordFreq: Record<string, number> = {}
    filteredWords.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1
    })
    
    // Convert to word cloud format
    const wordCloudWords = Object.entries(wordFreq)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, Math.min(maxWords, Object.keys(wordFreq).length))
      .map(([text, size]) => ({ text, size: size as number }))
    
    setWordCloudData(wordCloudWords)
  }

  return (
    <div className="space-y-6">
      <Card title="Word Clouds" status="primary">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Visualizing Text with Word Clouds</h4>
          <p className="text-gray-700">
            Word clouds provide an intuitive way to visualize word frequencies. 
            Larger words appear more frequently in the text.
          </p>
          
          <div className="warning-box">
            <strong>Note:</strong> Word clouds are great for exploration but should be supplemented with quantitative analysis for serious research.
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Create Your Word Cloud" status="success">
          <div className="space-y-4">
            <div>
              <h5 className="font-semibold mb-2">Sample Text Options:</h5>
              <select
                value={textSource}
                onChange={(e) => setTextSource(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="datasci">Sample Data Science Text</option>
                <option value="literature">Literature Sample</option>
                <option value="custom">Custom Text</option>
              </select>
            </div>
            
            {textSource === 'custom' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter your text:
                </label>
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  rows={5}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            )}
            
            <div>
              <h5 className="font-semibold mb-2">Word Cloud Settings:</h5>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum words: {maxWords}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={maxWords}
                    onChange={(e) => setMaxWords(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Color scheme:
                  </label>
                  <select
                    value={colorPalette}
                    onChange={(e) => setColorPalette(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="Dark2">Dark2</option>
                    <option value="Set1">Set1</option>
                    <option value="Pastel1">Pastel1</option>
                    <option value="Blues">Blues</option>
                  </select>
                </div>
              </div>
            </div>
            
            <button
              onClick={createWordCloud}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Create Word Cloud
            </button>
          </div>
        </Card>

        <Card title="Your Word Cloud" status="info">
          <SimpleWordCloud words={wordCloudData} />
        </Card>
      </div>
    </div>
  )
}