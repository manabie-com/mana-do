import React,{useEffect,useState,useRef} from "react";

const useOnClickOutside=()=>{
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const itemTodo = useRef<any>(null)

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (itemTodo.current && !itemTodo.current.contains(event.target)) {
        setIsEdit(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [itemTodo])

  return {isEdit,setIsEdit,itemTodo}
}

export default useOnClickOutside