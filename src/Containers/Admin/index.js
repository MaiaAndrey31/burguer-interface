import React from "react"
import { Container, ContainerItems } from './style'
import ListProducts from "./ListProducts"
import Orders from './Orders'
import NewProduct from './NewProduct'
import EditProduct from "./EditProduct"
import { SideMenuAdmin } from "../../Components"
import PropTypes from 'prop-types'
import paths from '../../constants/paths'

export function Admin({match: {path}}){
 return (

    <Container>
        <SideMenuAdmin path={path}/>
        <ContainerItems>
            {path === paths.Order &&  <Orders/>}
            {path === paths.Products &&  <ListProducts/>}
            {path === paths.NewProduct &&  <NewProduct/>}
            {path === paths.EditProduct &&  <EditProduct/>}
        
       
        </ContainerItems>
       
    </Container>


 )
    
}

Admin.propTypes ={
    match: PropTypes.object
}