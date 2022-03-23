import { useState, useEffect } from "react";

export default function useClickOutside(ref: any) {
  const [isComponentVisible, setIsComponentVisible] = useState<any>(false);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return [isComponentVisible, setIsComponentVisible];
}
