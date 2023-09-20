import styled from 'styled-components'

export const Container = styled.div`
display: flex;
gap: 12px;
padding: 16px;
border-radius: 30px;
background: #FFF;
box-shadow: 0px 30px 60px 0px rgba(57, 57, 57, 0.10);
width: max-content;

div{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
`

export const Image = styled.img`
width: 150px;
border-radius: 10px;
`

export const ProductName = styled.p`
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 19px;
color: #000000;
`

export const ProductPrice = styled.p`
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: 21px;
color: #000000;
margin-top: 30px;
`

