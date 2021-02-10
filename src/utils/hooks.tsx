import React, { useState, useEffect } from 'react'

export const useStorage = (key: string): [string | null, React.Dispatch<React.SetStateAction<string | null>>] => {
  const [data, setData] = useState<string | null>(localStorage.getItem(key))

  useEffect(() => {
    setData(localStorage.getItem(key))
  }, [key, setData])

  useEffect(() => {
    if (data === null || data === '') return

    localStorage.setItem(key, data)
  }, [data, key])

  return [data, setData]
}
