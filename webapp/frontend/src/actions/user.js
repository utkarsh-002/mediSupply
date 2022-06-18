import axios from "axios";
import { USER_ERROR, CLEAR_USER, ALL_USER} from "./types"

export const getAllUser = () => async dispatch => {
    try {
        // dispatch({ type: CLEAR_USER })
        const res = await axios.get("http://localhost:5000/allUser/");
        console.log(res.data)
        dispatch({
            type: ALL_USER,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: USER_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }

        })
    }
}