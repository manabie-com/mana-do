import styled from "styled-components"

export const LogoutIcon = styled.span`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: ${(props) => props.theme.colors.gray[1]};
    color: ${(props) => props.theme.colors.gray[6]};
    padding: 0.5rem 1rem;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    :hover {
        color: ${(props) => props.theme.colors.gray[7]};
    }
`

export const HeaderContainer = styled.header`
    position: absolute;
    right: 2rem;
    top: 2rem;
`