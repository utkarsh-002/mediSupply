import axios from "axios";
import { setAlert } from "./alert"
import { CREATE_ORDER, ORDER_ERROR, GET_ORDER} from "./types"




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
};


// // Create or update profile
// export const updateDrug = (
//     formData,
//     history
// ) => async dispatch => {
//     try {
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         };

//         const res = await axios.post('http://localhost:5000/updateDrug', formData, config);
//         console.log(res.data)
//         dispatch({
//             type: UPDATE_DRUG,
//             payload: res.data
//         });

//         dispatch(setAlert('Drug Updated', 'success'));
//         history.push('/dashboard');

//     } catch (err) {
//         const errors = err.response.data.errors;

//         if (errors) {
//             errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
//         }

//         dispatch({
//             type: DRUG_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status }
//         });
//     }
// };








// // Delete a drug 
// export const deleteAccount = id => async dispatch => {
//     if (window.confirm('Are you sure this cannot be undone?')) {
//         try {
//             const res = await axios.delete('http://localhost:5000/api/profile/')
//             dispatch({
//                 type: CLEAR_PROFILE,
//             })
//             dispatch({
//                 type: DELETE_ACCOUNT,
//             })
//             dispatch(setAlert('Account has been deleted Permanently', 'success'));
//         }
//         catch (err) {
//             dispatch({
//                 type: PROFILE_ERROR,
//                 payload: { msg: err.response.statusText, status: err.response.status }
//             });
//         }

//     }

// }