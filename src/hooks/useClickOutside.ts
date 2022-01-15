import { useEffect, MutableRefObject } from 'react'

type Handler = (event: MouseEvent | TouchEvent) => void

function useOnClickOutside(ref: MutableRefObject<any>, handler: Handler): void {
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent): void => {
			if (!ref.current || !(event.target instanceof Node) || ref.current.contains(event.target)) {
				return
			}

			handler(event)
		}

		document.addEventListener('mousedown', listener)
		document.addEventListener('touchstart', listener)

		return () => {
			document.removeEventListener('mousedown', listener)
			document.removeEventListener('touchstart', listener)
		}
	}, [ref, handler])
}

export default useOnClickOutside