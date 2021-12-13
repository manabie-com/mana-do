import { useState, useEffect } from 'react';

/**
 * 
 * @param ref 
 * @returns isClickedOutside
 * 
 * Hook to determine whether or not the user clicks outside the passed ref
 */

const useOutsideClickHook = (ref: React.RefObject<HTMLInputElement>) => {
  const [isClickedOutside, setIsClickedOutside] = useState<boolean>(false)

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsClickedOutside(true)
      } else {
        setIsClickedOutside(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  return isClickedOutside
}

export default useOutsideClickHook