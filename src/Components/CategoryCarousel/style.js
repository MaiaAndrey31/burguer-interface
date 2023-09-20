import styled from 'styled-components'
import {Link} from 'react-router-dom'


export const Container = styled.div`
background-color:#efefef;
display: flex;
flex-direction: column;
align-items: center;
gap: 35px;
padding: 35px 0;

.rec.rec-arrow {
    background-color: #9758A6;
    color: #efefef;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.rec.rec-arrow:hover {
border:2px solid #9758A6;
background-color: #efefef;
color: #9758A6;
}

.rec.rec-arrow:disabled {
border: none;
background-color: #bebebf;
color: #efefef;
}

`

export const CategoryImg = styled.img ``

export const ContainerItems = styled.div `
display: flex;
flex-direction: column;


`

export const Image = styled.img `
width: 200px;
border-radius: 10px;
`

export const Button = styled(Link) `
margin-top: 16px;
border-radius: 8px;
background: #9758A6;
display: flex;
padding: 21px 48px;
justify-content: center;
align-items: center;
color: var(--theme-white, #FFF);
text-align: center;
font-family: Roboto;
font-size: 24px;
font-style: normal;
font-weight: 700;
border: none;
cursor: pointer;
text-decoration: none;

&:hover {
    opacity: 0.7;
    }

&:active {
    opacity: 0.5;
}    

`


