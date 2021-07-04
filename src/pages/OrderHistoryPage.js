import React, { useEffect } from "react";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import OrderBox from "../components/OrderBox";

export default function OrderHistoryPage(props) {
  const orderMineList = useSelector(state => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <div>
      <Link to="/"><strong><i className="fa fa-arrow-left" /> Voltar ao início</strong></Link>
      <div>
      <h1>Meus Pedidos</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ):(
        <div style={{display:'flex', flexDirection:'column', margin: '0 7%'}}>
          
            {orders.map(order => {
              if(!order.isPaid){
                return (
                  <OrderBox status="warning" pageProps={props} data={order} statusMessage="Pagamento Pendente" shipmentMessage="-"/> 
                )
              } else if (order.isPaid && !order.isDelivered) {
                return(
                  <OrderBox status='ok' pageProps={props} data={order} statusMessage='Recebido' shipmentMessage="Separação"/>
                )
              } else if (order.isPaid && order.isDelivered) {
                return (
                  <OrderBox status="ok" pageProps={props} data={order} statusMessage="Recebido" shipmentMessage='Enviado'/> 
                )
              }
              return (
                <OrderBox status="warning" pageProps={props} key={order._id} data={order} statusMessage="Pagamento Pendente" shipmentMessage="-"/> 

              )
              // TODO Mudar estilo conforme status e arrumar o tamanho das boxes
          })}
             
       </div>
      )}
     </div> 
    </div>
 

  );
}


// <div className="orderSection">
//         <i style={{color:'#20a020'}} className="fa fa-check-square fa-2x" aria-hidden="true" />

//             <div id="id">
//               <h3>ID</h3>
//               60d7836bfbb84f063cefa025
//             </div>
//             <div id="orderDate">
//               <h3>Data do pedido</h3>
//               2021-06-26 as 16:43:18
//             </div>
//             <div style={{minwidth: '11rem'}} id="total">
//               <h3>Total</h3>
//               R$ 11.00
//             </div>
//             <div id="status">
//               <h3>Status do pedido</h3>
//               Pedido enviado
//             </div>
//             <div id="shippingStatus">
//               <h3>Status do envio</h3>
//               2021-06-26 20:53:13
//             </div>
//             <a aria-label="Order details" href="/tst">Ver detalhes <i className="fa fa-arrow-right fa-lg" /></a>
//       </div>


//                       onClick={() => props.history.push(`/order/${order._id}`)}
