import axios from "axios";
import React, {useEffect, useState, useContext} from "react";
import { useHistory } from "react-router";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()


export const CartContext = React.createContext();

export const CartProvider = props => {

    const history = useHistory();
    const [cart, setCart] = useState([]);

    // if (!localStorage.getItem('auth_token')) {
    //     history.push('/');
    //     toast.warn("Vous devez dabord être connecté");
    // }
    useEffect( () => {
        axios.get(`/api/cart`).then(res => {
            if (res.data.status ===200) {
                setCart(res.data.cart);
            } 
            // else if(res.data.status === 401) {
            //     history.push('/');
            //     toast.warn(res.data.message);
            // }
        })
    }, []);

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {props.children}
        </CartContext.Provider>
    );
}
