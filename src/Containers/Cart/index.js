import React from "react"
import CartLogo from "../../Assets/CartImage.png"

import { Container, CartImg, Wrapper } from "./style"
import {CartItems, CartResume  } from "../../Components"

export function Cart(){


    return (
        <Container>
            
            <CartImg src={CartLogo} alt="logo da Cart" />
            <Wrapper>
               <CartItems/>
               <CartResume/>
            </Wrapper>
        </Container>
    )

}

