import axios from "axios";
import { setAlert } from "./alert"
import { VERIFY_ERROR, VERIFY_SUCCESS} from "./types"




// Get Drug by ID
export const verify = (role, link,history) => async dispatch => {
    try {
        let newlink = `${link}&role=${role}`
        console.log(newlink);
        const res = await axios.get(newlink);
        if(res.data == "Verified"){
            dispatch(setAlert(res.data,"success"))
        }else{
            dispatch(setAlert(res.data,"danger"))
        }
        dispatch({
            type: VERIFY_SUCCESS
        });
        history.push('/dashboard');
    } catch (err) {
        dispatch({
            type: VERIFY_ERROR
        });
    }
};
