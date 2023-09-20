import React, { useEffect, useState } from "react"
import { Container, Menu, LinkMenu } from './style'
import api from '../../../Services/api'
import status from "./OrderStatus";

 import Table from '@material-ui/core/Table';
 import TableBody from '@material-ui/core/TableBody';
 import TableCell from '@material-ui/core/TableCell';
 import TableContainer from '@material-ui/core/TableContainer';
 import TableHead from '@material-ui/core/TableHead';
 import TableRow from '@material-ui/core/TableRow';
import Row from "./row";
 import Paper from '@material-ui/core/Paper';
import formatDate from "../../../utils/formatDate";




 function Orders(){
 const [orders, setOrders] = useState([])
 const [filteredOrders, setFilteredOrders] = useState([])
 const [activeStatus, setActiveStatus] = useState(1)
 const [rows, setRows] = useState([])


    useEffect(() => {
        async function loadOrders() {
          const { data } = await api.get('orders')
    
          
    
          setOrders(data)
          setFilteredOrders(data)
        }    
       
        
        loadOrders()
      }, [])


      function createData(order) {
        return {
          name: order.user.name,
          orderId: order._id,
          date: formatDate(order.createdAt),
          status: order.status,
          products: order.products          
        };
      }

      useEffect(() => {
        const newRows = filteredOrders.map(ord => createData(ord))

        setRows(newRows)

      }, [filteredOrders])

      useEffect(() => {
        if (activeStatus === 1){
          setFilteredOrders(orders)

        }
        else {
        const statusIndex = status.findIndex(sts => sts.id === activeStatus)
        const newFilteredOrders = orders.filter(
          order => order.status === status[statusIndex].value )
      

        setFilteredOrders(newFilteredOrders)
        }

      }, [orders])

      function handleStatus(status){
        if (status.id === 1){
          setFilteredOrders(orders)
        }
        else {
          const newOrders = orders.filter(order => order.status === status.value)
          setFilteredOrders(newOrders)
        }
        setActiveStatus(status.id)
      }
      

      return (

    <Container>

      <Menu>
        {status &&
         status.map(status =>(
           <LinkMenu key={status.id}
        onClick={() => handleStatus(status)
        } 
        isActiveStatus={activeStatus === status.id}
        >
          {status.label}
          </LinkMenu>
          ))}

      </Menu>

        <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Pedido</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Data do Pedido</TableCell>
            <TableCell>Status</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <Row key={row.orderId} row={row} setOrders={setOrders} orders={orders} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>


 )
    
}

export default Orders