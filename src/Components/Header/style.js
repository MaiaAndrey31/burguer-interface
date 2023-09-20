import styled from 'styled-components'

export const Container = styled.div `
height: 4.5rem;
background: #ffffff;
box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.15 );
display: flex;
align-items: center;
flex-direction: row;
justify-content: space-around;
`

export const ContainerLeft = styled.div `
display: flex;
gap: 1.875rem;
`

export const PageLink = styled.a `
cursor: pointer;
text-decoration: none;
color: ${props => props.isActive ? '#9758a6' : '#555555'};
font-size: 1rem;
line-height: 1.188rem;
font-weight: ${props => props.isActive ? 'bold' : 'normal'};
`

export const ContainerRight = styled.div `
display: flex;
align-items: center;
gap: 1.250rem;
`

export const ContainerText = styled.div `
p{
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
}

`


export const PageLinkExit = styled.div `
font-style: normal;
font-weight: bold;
font-size: 14px;
line-height: 16px;
display: flex;
align-items: center;
cursor: pointer;
color: #9758a6;
`


export const Line = styled.div `
height: 2.5rem;
border: 0.5px solid #bababa;

`
