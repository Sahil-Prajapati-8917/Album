import React from 'react'
import { Label } from '@/shared/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/ui/tooltip'
import { Info, AlertCircle } from 'lucide-react'

const DateSelector = ({ value, onChange, error }) => {
  // Parse the date value if it exists
  const parseDate = (dateString) => {
    if (!dateString) return { day: '', month: '', year: '' }
    const date = new Date(dateString)
    return {
      day: date.getDate().toString(),
      month: (date.getMonth() + 1).toString(),
      year: date.getFullYear().toString()
    }
  }

  const [selectedDate, setSelectedDate] = React.useState(parseDate(value))

  // Update local state when prop value changes
  React.useEffect(() => {
    setSelectedDate(parseDate(value))
  }, [value])

  // Function to format date as YYYY-MM-DD
  const formatDate = (day, month, year) => {
    if (!day || !month || !year) return ''
    const d = parseInt(day)
    const m = parseInt(month)
    const y = parseInt(year)
    
    // Validate date
    if (d < 1 || d > 31) return ''
    if (m < 1 || m > 12) return ''
    if (y < 2000 || y > 2030) return ''
    
    // Create date and validate
    const date = new Date(y, m - 1, d)
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
      return '' // Invalid date (e.g., February 30)
    }
    
    return `${y}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`
  }

  // Handle date changes
  const handleDateChange = (field, fieldValue) => {
    const newDate = { ...selectedDate, [field]: fieldValue }
    setSelectedDate(newDate)
    
    // Format and call onChange
    const formattedDate = formatDate(newDate.day, newDate.month, newDate.year)
    onChange(formattedDate)
  }
  // Generate day options (1-31)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  
  // Generate month options
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  
  // Generate year options (2000 to 2030)
  const years = Array.from({ length: 31 }, (_, i) => 2000 + i)

  return (
    <div className="space-y-2">
      {/* Label with tooltip */}
      <div className="flex items-center gap-2">
        <Label htmlFor="date-selector" className="text-sm font-medium">
          Function Date
        </Label>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-muted-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Select the date for your event</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Three dropdown selectors in a row */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        {/* Day selector */}
        <Select value={selectedDate.day} onValueChange={(value) => handleDateChange('day', value)}>
          <SelectTrigger className={`flex-1 sm:flex-initial sm:w-24 ${error ? 'border-red-300' : ''}`}>
            <SelectValue placeholder="Day" />
          </SelectTrigger>
          <SelectContent>
            {days.map((day) => (
              <SelectItem key={day} value={day.toString()}>
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Month selector */}
        <Select value={selectedDate.month} onValueChange={(value) => handleDateChange('month', value)}>
          <SelectTrigger className={`flex-1 sm:flex-initial sm:w-32 ${error ? 'border-red-300' : ''}`}>
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month, index) => (
              <SelectItem key={month} value={(index + 1).toString()}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Year selector */}
        <Select value={selectedDate.year} onValueChange={(value) => handleDateChange('year', value)}>
          <SelectTrigger className={`flex-1 sm:flex-initial sm:w-28 ${error ? 'border-red-300' : ''}`}>
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Error message */}
      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

export default DateSelector
