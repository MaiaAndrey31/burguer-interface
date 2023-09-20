import React, { createContext, useContext, useEffect, useState } from 'react'

import PropTypes from 'prop-types'

const CartContext = createContext({})

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([])


  const updateLocalStorage = async products => {
    await localStorage.setItem('burger:cartInfo', JSON.stringify(products))

  }

  const putProductsInCart = async product => {
    const cartIndex = cartProducts.findIndex(prd => prd.id === product.id)
    let newCartProduct = []
    if (cartIndex >= 0) {
       newCartProduct = cartProducts

      newCartProduct[cartIndex].quantity =
      newCartProduct[cartIndex].quantity + 1

      setCartProducts(newCartProduct)
    } else {
      product.quantity = 1
      newCartProduct = [...cartProducts, product]
      setCartProducts(newCartProduct)
    }

    await updateLocalStorage(newCartProduct)
  }

  const deleteProducts = async ProductId => {
    const newCart = cartProducts.filter(product => product.id !== ProductId)

    setCartProducts(newCart)
  }

  const increaseProducts = async ProductId => {
    const newCart = cartProducts.map(product => {
      return product.id === ProductId ? {...product, quantity: product.quantity + 1} : product
    })
    setCartProducts(newCart)

    await updateLocalStorage(newCart)
  }

  const decreaseProducts = async ProductId => {

    const cartIndex = cartProducts.findIndex(prd => prd.id === ProductId)
      if(cartProducts[cartIndex].quantity > 1){

    const newCart = cartProducts.map(product => {
      return product.id === ProductId ? {...product, quantity: product.quantity - 1} : product
    })
    setCartProducts(newCart)

    await updateLocalStorage(newCart)
  } else {
    deleteProducts(ProductId)
  }

  }

  useEffect(() => {
    const loadUserData = async () => {
      const clientCartData = await localStorage.getItem('burger:cartInfo')

      if (clientCartData) {
        setCartProducts(JSON.parse(clientCartData))
      }
    }

    loadUserData()
  }, [])

  return (
    <CartContext.Provider value={{ putProductsInCart, cartProducts, increaseProducts, decreaseProducts }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useUser must be used with UserContext')
  }

  return context
}

CartProvider.propTypes = {
  children: PropTypes.node
}
