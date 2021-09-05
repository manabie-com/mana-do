import styled from "styled-components"

export const Title = styled.h5`
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.gray[5]};
  font-weight: normal;
`

export const Container = styled.div`
  background: white;
  padding: 2rem 6rem;
  border-radius: 8px;
  width: 30rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
`
