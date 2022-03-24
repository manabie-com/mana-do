import React,{useEffect} from "react";

const useOnClickOutside=(ref:React.RefObject<HTMLInputElement>,setToggleState:React.Dispatch<React.SetStateAction<boolean>>)=>{
  return useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setToggleState(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

export default useOnClickOutside