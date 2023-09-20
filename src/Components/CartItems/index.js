import React from 'react'

import { useCart } from '../../hooks/CartContext'

import { Container, Header, Body, EmptyCart } from './style'

import formatCurrency from '../../utils/FormatCurrency'

export function CartItems() {

    const { cartProducts, increaseProducts, decreaseProducts  } = useCart()

  return (
    <Container>
      <Header>
        <p></p>
        <p>Itens</p>
        <p>Preço</p>
        <p style={{ paddingRight: 30 }}>Quantidade</p>
        <p>Total</p>
      </Header>

      {cartProducts && cartProducts.length > 0 ? (
        cartProducts.map((product) => (
          <Body key={product.id}>
            <img src={product.url} />
            <p>{product.name}</p>
            <p>{formatCurrency(product.price)}</p>
            <div className='quantity-container'>
              <button onClick={() => decreaseProducts(product.id)}>-</button>
              <p>{product.quantity}</p>
              <button onClick={() => increaseProducts(product.id)}>+</button>
            </div>
            <p>{formatCurrency(product.price * product.quantity)}</p>
          </Body>
        ))
      ) : (
        <EmptyCart>Carrinho Vazio</EmptyCart>
      )}
    </Container>
  )
}
