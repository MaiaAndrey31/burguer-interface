import React from "react";
import PropTypes from 'prop-types'
import {Button} from "../Button";
import { Container, Image, ProductName, ProductPrice } from "./style";
import { useCart } from "../../hooks/CartContext";



export function CardProduct({ product}) {
    const {putProductsInCart} = useCart()
    return (
        <Container>
            <Image src= {product.url} alt="imagem do produto" />
            <div>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.formatedPrice}</ProductPrice>
            <Button onClick={() => putProductsInCart(product)} >Adicionar</Button>
            </div>
        </Container>
    )
}


CardProduct.propTypes= {
    product: PropTypes.object
}