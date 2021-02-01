import { useEffect } from "react";


export function useOutsideAlerter(ref: any, discardEdit: any) {
   
    useEffect(() => {
        
        function handleClickOutside (event: any): any {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                discardEdit()
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, discardEdit]);
}
