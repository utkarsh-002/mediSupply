import { combineReducers } from "redux"
import auth from "./auth"
import alert from "./alert"
import drug from "./drug"
import order from "./order"
import prescription from "./presciption"
import user from "./user"
import data from "./data"

export default combineReducers({
  auth,
  alert,
  drug,
  order,
  user,
  data,
  prescription
})