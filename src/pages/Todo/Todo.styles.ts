import styled from "styled-components"

export const TodoContainer = styled.div`
  position: relative;
  /* border: 1px solid rgba(0,0,0, 0.13); */
  border-radius: 8px;
  width: 500px;
  padding: 24px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin: 5rem auto auto;
`
export const TodoContent = styled.div`
  margin: 1rem auto auto;
  padding: 4px 8px;
`

export const TodoLogo = styled.div`
  position: absolute;
  top: -2rem;
  left: 30%;
  background: white;
  padding: 0 1rem;
`

export const TodoWrapper = styled.div`
  margin-top: 1rem;
  padding: 0 8px;
`
export const TaskContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 2px;
  margin: 8px 0;
  border-left: 4px solid ${(props) => props.theme.colors[props.color || 'blue'][5]};
  color: ${(props) => props.theme.colors[props.color || 'blue'][5]};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
 
  
`

export const TaskItemContainer = styled.div`
  /* flex-grow: 1;
  height: 100px;
  align-items: center;
  display: flex; */
`

// Toolbar
export const Container = styled.div`
  display: flex;
  align-items: center;
`
export const Left = styled.div`
  flex-grow: 0;
  display: flex;
  align-items: center;
`

export const Center = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`
export const Right = styled.div`
  display: flex;
  align-items: center;
`

export const ToolbarItem = styled.div`
  padding: 4px 8px;
  cursor: pointer;
`

export const ActiveItem = styled.div`
  background: ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.colors.white};
  border-radius: 8px;
  padding: 4px 8px
`

export const Item = styled.div`
  border-radius: 8px;
  padding: 4px 8px;
`