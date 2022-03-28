import { useEffect } from "react";

//custom hook to trigger when clicked outside of element.
const useOnOutsideClick = (ref: any, callback: any) => {
    const handleClick = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    });
};

export default useOnOutsideClick;
