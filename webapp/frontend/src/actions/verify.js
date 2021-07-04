import axios from "axios";
import { setAlert } from "./alert"
import { VERIFY_ERROR, VERIFY_SUCCESS} from "./types"




// Get Drug by ID
export const verify = (role, link) => async dispatch => {
    try {
        let newlink = `${link}&role=${role}`
        console.log(newlink);
        const res = await axios.get(newlink);
        console.log(res.data);
        dispatch({
            type: VERIFY_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: VERIFY_ERROR
        });
    }
};
