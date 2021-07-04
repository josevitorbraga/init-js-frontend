import React from 'react'

// Recebe 3 props:
//     data={}
//     statusMessage={}
//     shippmentMessage={}


export default function OrderBox(props) {
    if(props.status === 'ok') {
        return (
            <div className="order-box">
                <div className="status-ok">
                    <i className="fa fa-check-square fa-2x" />
                </div>
                <div className="content">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATA DO PEDIDO</th>
                                <th>TOTAL</th>
                                <th style={{paddingRight:'2rem'}}>STATUS DO PEDIDO</th>
                                <th>STATUS DO ENVIO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{props.data._id}</td>
                                <td>{`${props.data.created_at.substring(0, 10)} as ${props.data.created_at.substring(11, 19)}`}</td>
                                <td>R$ {props.data.totalPrice.toFixed(2)}</td>
                                <td>{props.statusMessage}</td>
                                <td>{props.shipmentMessage}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="details">
                    <button type="button" onClick={() => props.pageProps.history.push(`/order/${props.data._id}`)}>Detalhes&nbsp;&nbsp; <i className="fa fa-arrow-right fa-2x" /></button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="order-box">
                <div className="status-warning">
                    <i className="fa fa-exclamation-triangle fa-2x" />
                </div>
                <div className="content">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATA DO PEDIDO</th>
                                <th>TOTAL</th>
                                <th style={{paddingRight:'2rem'}}>STATUS DO PEDIDO</th>
                                <th>STATUS DO ENVIO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{props.data._id}</td>
                                <td>{`${props.data.created_at.substring(0, 10)} as ${props.data.created_at.substring(11, 19)}`}</td>
                                <td>R$ {props.data.totalPrice.toFixed(2)}</td>
                                <td>{props.statusMessage}</td>
                                <td>{props.shipmentMessage}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="details">
                    <button type="button" onClick={() => props.pageProps.history.push(`/order/${props.data._id}`)}>Detalhes&nbsp;&nbsp; <i className="fa fa-arrow-right fa-2x" /></button>
                </div>
            </div>
        )
    }
    
}
