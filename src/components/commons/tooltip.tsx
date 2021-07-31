import React from 'react'
import './_tooltip.css'

export enum TooltipPosition {
  top = 'top',
  current = 'current'
}

export enum TextAlign {
  center = 'center',
  left = 'left',
  right = 'right'
}

export type TooltipProps = {
  children: any,
  tooltipText: string,
  id: string,
  position?: TooltipPosition,
  textAlign?: TextAlign,
  useAnimation?: boolean
}

const WithTooltip = (props: TooltipProps) => {
  const { children, tooltipText, id
    , position = TooltipPosition.top
    , textAlign = TextAlign.center, useAnimation = true
  } = props

  return (
    <div className='use-tooltip' id={id} data-testid={id}>
      {children}
      <div className={`tooltip ${position.toString()} ${textAlign.toString()
        } ${useAnimation && 'typewriter'}`}>
          <div className={`tooltip-text`}>{tooltipText}</div>
      </div>
    </div>
  )
}

export default WithTooltip