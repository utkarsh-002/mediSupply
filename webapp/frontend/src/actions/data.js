import axios from "axios";
import { GET_DATA,GET_DATA_ERROR} from "./types"

export const getDataByEmail = (email) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post('http://localhost:5000/getData', {email}, config);
        console.log(res.data)
        dispatch({
            type: GET_DATA,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_DATA_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }

        })
    }
}