interface CardProps {
  title: string
  children: React.ReactNode
  status?: 'primary' | 'success' | 'warning' | 'info' | 'danger'
  className?: string
}

export default function Card({ title, children, status = 'primary', className = '' }: CardProps) {
  const statusColors = {
    primary: 'border-blue-200 bg-white',
    success: 'border-green-200 bg-white',
    warning: 'border-orange-200 bg-white', 
    info: 'border-cyan-200 bg-white',
    danger: 'border-red-200 bg-white'
  }

  const headerColors = {
    primary: 'bg-blue-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-orange-500 text-white',
    info: 'bg-cyan-500 text-white',
    danger: 'bg-red-500 text-white'
  }

  return (
    <div className={`border rounded-lg shadow-sm ${statusColors[status]} ${className}`}>
      <div className={`px-4 py-3 rounded-t-lg ${headerColors[status]}`}>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}