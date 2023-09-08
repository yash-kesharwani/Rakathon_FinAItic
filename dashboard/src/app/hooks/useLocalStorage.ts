import { useState } from 'react'

export const useLocalStorage = <T>(keyName: string, value: T) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const localValue = localStorage.getItem(keyName)
      if (localValue != null) {
        return JSON.parse(localValue)
      } else {
        localStorage.setItem(keyName, JSON.stringify(value))
        return value
      }
    } catch (err) {
      return value
    }
  })
  const setValue = (newValue: T) => {
    try {
      localStorage.setItem(keyName, JSON.stringify(newValue))
    } catch (err) {}
    setStoredValue(newValue)
  }
  return [storedValue, setValue]
}
