'use client'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  height?: string
  placeholder?: string
}

export default function CodeEditor({ 
  value, 
  onChange, 
  height = '200px',
  placeholder = 'Enter your JavaScript code here...'
}: CodeEditorProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="code-editor"
      style={{ height }}
      placeholder={placeholder}
      spellCheck={false}
    />
  )
}