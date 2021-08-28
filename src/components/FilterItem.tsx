import React from "react";
import "./FilterItem.scss";

interface FilterItemProps {
  title: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>, active: boolean) => void;
  isActive? : boolean;
}

function FilterItem(props: FilterItemProps) {
  const { title = "", onClick } = props;
  const [active, setActive] = React.useState(false)

  const onClickWrapper = React.useCallback((e)=>{
    onClick(e, active);
  },[onClick, active])
  return <button className={`filterItem + ${active ? "active" : null}`} onClick={onClickWrapper}> {title} </button>;
}

export default React.memo(FilterItem);
