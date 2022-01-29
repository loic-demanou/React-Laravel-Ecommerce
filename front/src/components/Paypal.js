import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router';
import swal from 'sweetalert';

function Paypal (props) {
    const {  totalCardPrice } = props
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();
    const history = useHistory()
    var payment_mode = "paypal";
    var e ;

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            description: 'KAKO store checkout',
                            amount: {
                                currency_code: 'USD',
                                value: 0.1,
                            }
                        }]
                    });
                },
                style: {
                    layout: 'horizontal',
                    size: 'small',
                    color: 'gold',
                    shape: 'rect',
                    label: 'paypal',
                    height: 40,
                    tagline: 'false'
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    setPaidFor(true);
                    console.log('ORDER', order);
                },
                onError: err => {
                    setError(err);
                    console.error('ERROR', err);
                },
            })
            .render(paypalRef.current);
    }, []);

    if (paidFor) {
        axios.post('api/paypal-order')
        .then((res) => {
            history.push('/thank-you')
        })
        .catch(err => console.log(err))
    }

    if (error) {
        swal("Error in processing order. Please Retry again", "", "error");
    }

    return (
        <div>
            <div ref={paypalRef} />
        </div>
    )
}

export default Paypal