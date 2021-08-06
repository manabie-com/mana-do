import React from 'react'

import { ButtonProp } from 'components/button/button.d'

const ButtonField = ({ className, disabled, error, id, label, style, onClick }: ButtonProp) => {
	return (
		<button
			className={className}
			id={id}
			disabled={disabled}
			style={style}
			onClick={onClick}
		>
			{label}
		</button>
	)
}

export default ButtonField
