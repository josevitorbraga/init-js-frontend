import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderHistoryPage(props) {
  const orderMineList = useSelector(state => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <div>
      <h1>Meus Pedidos</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>PEDIDO EM</th>
              <th>TOTAL</th>
              <th>STATUS DO PEDIDO</th>
              <th>STATUS DO ENVIO</th>
              <th>AÇOES</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => {
              if(!order.isPaid){
                return (
                  <tr className="paymentPending" key={order._id}>
                    <td>{order._id}</td>
                    <td>{`${order.created_at.substring(0, 10)} as ${order.created_at.substring(11, 19)}`}</td>
                    <td>R$ {order.totalPrice.toFixed(2)}</td>
                    <td><i className="fa fa-exclamation-triangle"/> Verificar detalhes</td>
                    <td>
                      {order.isDelivered
                        ? `${order.deliveredAt.substring(0, 10)} ${order.deliveredAt.substring(11, 19)}`
                        : "Pendente"}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="small paymentPending"
                        onClick={() => props.history.push(`/order/${order._id}`)}
                      >
                        Detalhes
                      </button>
                    </td>
                  </tr>
                )
              } 
              return (
                <tr className="paymentOk" key={order._id}>
                  <td>{order._id}</td>
                  <td>{`${order.created_at.substring(0, 10)} as ${order.created_at.substring(11, 19)}`}</td>
                  <td>R$ {order.totalPrice.toFixed(2)}</td>
                  <td>Pedido recebido</td>
                  <td>
                    {order.isDelivered
                      ? `${order.deliveredAt.substring(0, 10)} ${order.deliveredAt.substring(11, 19)}`
                      : "Pedido em separação"}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="small paymentOk"
                      onClick={() => props.history.push(`/order/${order._id}`)}
                    >
                      Detalhes
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
