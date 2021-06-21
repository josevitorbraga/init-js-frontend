import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../actions/orderActions';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

export default function OrderListPage(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading, error, orders } = orderList;

  const orderDelete = useSelector(state => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders());
  }, [dispatch, successDelete]);

  const deleteHandler = order => {
    if (window.confirm('Tem certeza que deseja excluir o pedido?')) {
      dispatch(deleteOrder(order._id));
    }
  };

  return (
    <div>
      <h1>Pedidos</h1>
      {loadingDelete && <LoadingBox />}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USUARIO</th>
              <th>DATA</th>
              <th>TOTAL</th>
              <th>PAGO EM</th>
              <th>ENVIADO EM</th>
              <th>AÇOES</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user}</td>
                <td>{order.created_at.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isPaid
                    ? order.paidAt.substring(0, 10)
                    : 'Pagamento pendente'}
                </td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'Envio pendente'}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => props.history.push(`/order/${order._id}`)}
                  >
                    Detalhes
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(order)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
