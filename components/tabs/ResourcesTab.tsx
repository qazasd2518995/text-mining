'use client'

import Card from '../ui/Card'

export default function ResourcesTab() {
  return (
    <div className="space-y-6">
      <Card title="Text Mining Resources" status="primary">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Essential JavaScript Libraries</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li><strong>Natural</strong> - Natural language processing toolkit</li>
              <li><strong>compromise</strong> - Natural language understanding</li>
              <li><strong>sentiment</strong> - Sentiment analysis</li>
              <li><strong>d3.js</strong> - Data visualization</li>
              <li><strong>ml-matrix</strong> - Matrix operations for ML</li>
              <li><strong>stopword</strong> - Multilingual stopword removal</li>
            </ul>
            
            <h4 className="text-lg font-semibold mt-6">Installation Commands</h4>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`# Install with npm:
npm install natural compromise sentiment

# Or with yarn:
yarn add natural compromise sentiment`}
            </pre>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Native JavaScript Text Functions</h4>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`// String manipulation
text.length, text.substring()
text.toUpperCase(), text.toLowerCase()
text.includes(), text.indexOf()
text.replace(), text.match()
text.split(), text.trim()

// Regular expressions
/[^\\w\\s]/g    // Punctuation
/\\d+/g         // Numbers
/[a-zA-Z]/g     // Letters
/\\s+/g         // Whitespace`}
            </pre>
            
            <h4 className="text-lg font-semibold mt-6">Common Tasks</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Text cleaning and preprocessing</li>
              <li>Word frequency analysis</li>
              <li>Sentiment analysis</li>
              <li>Document classification</li>
              <li>N-gram analysis</li>
            </ul>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Browser Compatibility" status="warning">
          <div className="space-y-3">
            <h5 className="font-semibold">Modern JavaScript Features Used:</h5>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>ES6+ array methods (map, filter, reduce)</li>
              <li>Regular expressions</li>
              <li>Object.entries() and destructuring</li>
              <li>Template literals</li>
            </ul>
            
            <div className="tip-box">
              <strong>Tip:</strong> All features work in modern browsers (Chrome, Firefox, Safari, Edge).
            </div>
          </div>
        </Card>

        <Card title="Next Steps" status="success">
          <div className="space-y-3">
            <h5 className="font-semibold">Continue Learning:</h5>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Practice with real text data</li>
              <li>Learn advanced preprocessing techniques</li>
              <li>Explore sentiment analysis libraries</li>
              <li>Study topic modeling algorithms</li>
              <li>Try text classification with ML</li>
            </ul>
            
            <h5 className="font-semibold mt-4">Useful Datasets:</h5>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>News articles for topic modeling</li>
              <li>Movie reviews for sentiment analysis</li>
              <li>Social media data for trend analysis</li>
              <li>Customer reviews for business insights</li>
            </ul>
          </div>
        </Card>
      </div>

      <Card title="Web APIs and External Data" status="info">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Working with External Text Data</h4>
          <p className="text-gray-700">
            In web applications, you can fetch text data from various sources:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-semibold mb-2">Fetch API Example:</h5>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`// Fetch text data from an API
fetch('/api/text-data')
  .then(response => response.text())
  .then(text => {
    // Process the text
    const words = text.toLowerCase()
      .replace(/[^\\w\\s]/g, ' ')
      .split(/\\s+/);
    console.log(words);
  });`}
              </pre>
            </div>
            <div>
              <h5 className="font-semibold mb-2">File Input:</h5>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`// Read text from uploaded files
const input = document.querySelector('input[type="file"]');
input.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    // Process the text
  };
  reader.readAsText(file);
});`}
              </pre>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}