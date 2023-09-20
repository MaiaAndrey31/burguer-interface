import React from "react"
import { ProductsImg, ReactSelectStyle } from './style'

 import PropTypes from 'prop-types';
  import Box from '@material-ui/core/Box';
  import Collapse from '@material-ui/core/Collapse';
 import IconButton from '@material-ui/core/IconButton';
 import Table from '@material-ui/core/Table';
 import TableBody from '@material-ui/core/TableBody';
 import TableCell from '@material-ui/core/TableCell';
 import TableHead from '@material-ui/core/TableHead';
 import TableRow from '@material-ui/core/TableRow';
 import Typography from '@material-ui/core/Typography';
 import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
 import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import api from "../../../Services/api";
import status from './OrderStatus';




 function Row({row, setOrders, orders}){
  const [open, setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  

  async function setNewStatus(id, status){
    setIsLoading(true)

    try {
      await api.put(`orders/${id}`, {status})

      const newOrders = orders.map(order => {
        return order._id === id ? {...order, status} : order
      })
      setOrders(newOrders)
    }
    catch(err){
      console.log(err)
    }finally{
      setIsLoading(false)
    }
    
  }
     

  return (
    <React.Fragment>
       <TableRow > 
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderId}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>

          <ReactSelectStyle
           options={ status.filter(sts => sts.value !== 'Todos')} 
           placeholder='Status'
           defaultValue={status.find(option => option.value === row.status) || null
          }
          onChange={newStatus => setNewStatus(row.orderId, newStatus.value)
          } isLoading={isLoading}
            />

        </TableCell>
        <TableCell></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Pedido
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Quantidade</TableCell>
                    <TableCell>Produto</TableCell>
                    <TableCell>Categoria</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((productRow) => (
                    <TableRow key={productRow.id}>
                      <TableCell component="th" scope="row">
                        {productRow.quantity}
                      </TableCell>
                      <TableCell>{productRow.name}</TableCell>
                      <TableCell>{productRow.category}</TableCell>
                      <TableCell>
                        <ProductsImg src={productRow.url} alt="imagem do produto"/>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  orders: PropTypes.array,
  setOrders: PropTypes.func,
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    orderId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        quantity: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,

      }),
    ).isRequired
   
  }).isRequired,
};
    


export default Row