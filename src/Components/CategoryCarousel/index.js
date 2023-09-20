import React, { useEffect, useState } from 'react'
import Category from '../../Assets/CATEGORIAS.png'
import { Container, ContainerItems, CategoryImg, Image, Button } from './style'
import Carousel from 'react-elastic-carousel'
import api from "../../Services/api"


export function CategoryCarousel() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('categories')

     

      setCategories(data)
    }

    loadCategories()
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
      <CategoryImg src={Category} alt="Categorias" />

      <Carousel itemsToShow={4} style={{width:'90%'}} breakPoints={breakpoints}>
        {
            categories && categories.map(category => (
                <ContainerItems key={category.id}>
                    <Image src={category.url} alt='imagem da categoria'/>
                    <Button to={{
                      pathname: '/produtos',
                      state: {categoryId: category.id}
                    }}>{category.name}</Button>
                </ContainerItems>
            ))}
       
      </Carousel>
    </Container>
  )
}

