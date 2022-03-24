import React from "react";

type GuideItemProps={
  text?:string
}

const GuideItem=({text}:GuideItemProps)=>{
  return (
    <div className="row mid">
      <div className="Order"/>
      <span>{text}</span>
    </div>
  )
}

const Guide=()=>{
  return (
    <div className="Guide">
      <span>Todo Guide!</span>
      <div>
      <GuideItem text="You can't add empty content's todo."/>
        <GuideItem text="Double click (todo-item) to edit."/>
        <GuideItem text="You can scroll to show more todo-item."/>
      </div>
    </div>
  )
}

export default Guide;