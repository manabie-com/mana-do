import React, { useMemo } from 'react'

import type { FilterButtonProps } from './type'

const FilterButton: React.FC<FilterButtonProps> = ({ active, children, ...buttonProps }) => {
  // Get classNames of filter button based on todo-status
  const classesFilterButton = useMemo(() => {
    const generalClass = 'Action__btn'
    if (active) {
      return `${generalClass} active`
    }
    return generalClass
  }, [active])

  return (
    <button className={classesFilterButton} {...buttonProps} data-testid="filter-button">
      {children}
    </button>
  )

}

export * from './type'
export { FilterButton }