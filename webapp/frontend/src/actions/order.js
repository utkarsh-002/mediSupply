import axios from "axios";
import { setAlert } from "./alert"
import { CREATE_ORDER, ORDER_ERROR, GET_ORDER, CLEAR_ORDER, ALL_ORDER, UPDATE_ORDER} from "./types"




// Get Order by ID
export const readOrder = orderId => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/readOrder?orderId=${orderId}`);
        console.log(res.data);
        dispatch({
            type: GET_ORDER,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ORDER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};




// to clear order
export const clearOrder = () => async dispatch => {
    try {
        dispatch({
            type: CLEAR_ORDER,
        });
    } catch (err) {
        dispatch({
            type: ORDER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};




// Create or update profile
export const createOrder = (
    formData,
    history
) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('http://localhost:5000/createOrder', formData, config);
        console.log(res.data)
        dispatch({
            type: CREATE_ORDER,
            payload: res.data
        });

        dispatch(setAlert('Order Created', 'success'));
        history.push('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: ORDER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

export const updateOrder = (
    formData,
    history
) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('http://localhost:5000/updateOrder', formData, config);
        console.log(res.data)
        dispatch({
            type: UPDATE_ORDER,
            payload: res.data
        });

        dispatch(setAlert('Order Updated', 'success'));
        history.push('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: ORDER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const getAllOrder = () => async dispatch => {
    try {
        dispatch({ type: CLEAR_ORDER })
        const res = await axios.get("http://localhost:5000/allOrder/");
        console.log(res.data)
        dispatch({
            type: ALL_ORDER,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: ORDER_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }

        })
    }
}