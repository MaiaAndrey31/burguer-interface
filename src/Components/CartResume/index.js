import React, {useState, useEffect} from "react"
import { useCart } from "../../hooks/CartContext"

import { Container } from "./style"
import { Button } from "../Button"
import formatCurrency from "../../utils/FormatCurrency"
import api from '../../Services/api'
import { toast } from "react-toastify"


export function CartResume(){
    const [finalPrice, setFinalPrice] = useState(0)
    const [tax] = useState(5)

    const { cartProducts} = useCart()

    useEffect(() => {

        const sumAllItens = cartProducts.reduce((acc, current) => {
            return current.price * current.quantity + acc
        }, 0)

        setFinalPrice(sumAllItens)
    }, [cartProducts, tax])

    const submitOrder = async () => {

        try {
        const order = cartProducts.map( product => {
            return {id: product.id, quantity: product.quantity}
        })
        await toast.promise(api.post('/orders', {products: order}),{
            pending: 'Realizando seu pedido... Aguarde!',
            success: 'Uhull.. Pedido Realizado com sucesso',
            error:'Ops, aconteceu um erro.. Tente novamente! =('

        })
    } catch{}
         
    }

    return (
        <div>
        <Container>
          <div className="container-top">
            <h2 className="title">Resumo do pedido</h2>
            <p className="itens">Itens</p>
            <p className="itens-price">{formatCurrency(finalPrice)}</p>
            <p className="tax">Taxa de entrega</p>
            <p className="tax-price">{formatCurrency(tax)}</p>
          </div>
          <div className="container-bottom">
          <p>Total</p>
          <p>{formatCurrency(finalPrice + tax)}</p>
          </div>
          
        </Container>
        <Button style={{width: '100%', marginTop: 30}} onClick= {submitOrder}>Finalizar pedido</Button>
        </div>
    )

}

