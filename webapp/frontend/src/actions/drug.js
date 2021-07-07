import axios from "axios";
import { setAlert } from "./alert"
import { CREATE_DRUG, DRUG_ERROR ,UPDATE_DRUG , GET_DRUG , CLEAR_DRUG, ALL_DRUG} from "./types"




// Get Drug by ID
export const readDrug = drugId => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/readDrug?drugId=${drugId}`);
        console.log(res.data);
        dispatch({
            type: GET_DRUG,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: DRUG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};



// to clear drug
export const clearDrug = () => async dispatch => {
    try {
        dispatch({
            type: CLEAR_DRUG,
        });
    } catch (err) {
        dispatch({
            type: DRUG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};





// Create or update profile
export const createDrug = (
    formData,
    history
) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('http://localhost:5000/createDrug', formData, config);
        console.log(res.data)
        dispatch({
            type: CREATE_DRUG,
            payload: res.data
        });

        dispatch(setAlert('Drug Created', 'success'));
        history.push('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: DRUG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// Create or update profile
export const updateDrug = (
    formData,
    history
) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('http://localhost:5000/updateDrug', formData, config);
        console.log(res.data)
        dispatch({
            type: UPDATE_DRUG,
            payload: res.data
        });

        dispatch(setAlert('Drug Updated', 'success'));
        history.push('/dashboard');

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: DRUG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const getAllDrug = () => async dispatch => {
    try {
        dispatch({ type: CLEAR_DRUG })
        const res = await axios.get("http://localhost:5000/allDrug/");
        console.log(res.data)
        dispatch({
            type: ALL_DRUG,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: DRUG_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }

        })
    }
}


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