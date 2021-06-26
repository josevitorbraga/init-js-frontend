import Axios from 'axios'
import React from 'react'

export default function MercadoPagoButton(props) {
    const goToPayment =  async () => {
         const {data} = await Axios.post('/mercadopago',props.order)
         window.location.assign(`${data}`)

    }
    return (
        <div>
            <button onClick={goToPayment} type="button" className="primary block">IR PARA PAGAMENTO</button>
        </div>
    )
}
