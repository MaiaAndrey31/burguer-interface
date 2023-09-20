import React, { useEffect, useState } from 'react'
import Offer from '../../Assets/OFERTAS.png'
import { Container, ContainerItems, OfferImg, Image, Button } from './style'
import Carousel from 'react-elastic-carousel'
import api from "../../Services/api"
import formatCurrency from '../../utils/FormatCurrency'
import {useCart} from '../../hooks/CartContext'
import {useHistory} from 'react-router-dom'

export function OffersCarousel() {
  const {putProductsInCart} = useCart()
  const [offers, setOffers] = useState([])
  const {push} = useHistory()

  useEffect(() => {
    async function loadOffers() {
      const { data } = await api.get('products')

      const onlyOffers = data.filter(product => product.offer).map(product =>{
        return {...product, formatedPrice: formatCurrency(product.price)}
      })

     

      setOffers(onlyOffers)
    }

    loadOffers()
  }, [])

  const breakpoints = [
    {width: 1, itemsToShow: 1},
    {width: 400, itemsToShow: 2},
    {width: 600, itemsToShow: 3},
    {width: 900, itemsToShow: 4},
    {width: 1300, itemsToShow: 5}
  ]

  return (
    <Container>
      <OfferImg src={Offer} alt="Ofertas" />

      <Carousel itemsToShow={4} style={{width:'90%'}} breakPoints={breakpoints}>
        {
            offers && offers.map(product => (
                <ContainerItems key={product.id}>
                    <Image src={product.url} alt='imagem da oferta'/>
                    <p>{product.name}</p>
                    <p>{product.formatedPrice}</p>
                    <Button  onClick={() => {
                  putProductsInCart(product)
                  push('/carrinho')
                }}
                >
                  Peça agora
                  </Button>
                </ContainerItems>
            ))}
       
      </Carousel>
    </Container>
  )
}

