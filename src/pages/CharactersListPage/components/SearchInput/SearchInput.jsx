import { useState, useEffect, useCallback } from 'react'

// Libs
import Input from 'antd/es/input'

const SearchInput = props => {
  const { onChange, value, ...rest } = props

  // State
  const [timedQuery, setTimedQuery] = useState(value)
  const [endedQuery, setEndedQuery] = useState(value)

  // Effects
  useEffect(() => {
    const timeoutId = setTimeout(setEndedQuery, 500, timedQuery)
    return () => clearTimeout(timeoutId)
  }, [timedQuery])

  useEffect(() => {
    debugger
    if (value === endedQuery) {
      return
    }
    onChange(endedQuery)
  }, [endedQuery, onChange])

  const handleChange = useCallback(event => {
    setTimedQuery(event.target.value)
  }, [])

  return (
    <Input
      {...rest}
      type="text"
      size="large"
      value={timedQuery}
      placeholder="Write character's name"
      onChange={handleChange}
      allowClear
    />
  )
}

export default SearchInput
