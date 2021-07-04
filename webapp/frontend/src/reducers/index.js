import { combineReducers } from "redux"
import auth from "./auth"
import alert from "./alert"
import drug from "./drug"
import order from "./order"
export default combineReducers({
  auth,
  alert,
  drug,
  order
})