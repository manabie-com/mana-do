import React,{useEffect} from 'react';

type Handler = (e:MouseEvent)=>void

export default function useOutSideClick<T extends HTMLElement = HTMLElement> (ref : React.RefObject<T>,handler : Handler) {
  useEffect(() => {
      const handleOutSideClick = (e:Event) => {
          if(ref.current && !ref.current.contains(e.target as Node))
            handler(e as unknown as MouseEvent)
      }
      document.addEventListener("mousedown",handleOutSideClick);
      return () => {
        document.removeEventListener("mousedown",handleOutSideClick)
      }
  },[ref,handler])
}
