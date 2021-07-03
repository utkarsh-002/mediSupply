import axios from "axios"
import { setAlert } from "./alert"
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from "./types"
import setAuthToken from "../utils/setAuthToken"

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const res = await axios.get("http://localhost:5000/")
    console.log(res.data)
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    })
  } catch (err) {
    console.error(err.response.data)
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

// register a user
export const register = ({ userName , email, address , contact , password , role ,license_number  }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const body = JSON.stringify({ userName, email, password , address , contact ,license_number , role})
  console.log("Register Body : " , body)
  try {
    const res = await axios.post("http://localhost:5000/register", body, config)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")))
    }
    dispatch({
      type: REGISTER_FAIL,
    })
  }
}

// to login a user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const body = JSON.stringify({ email, password })
  console.log("Body in login : ", body);
  try {
    const res = await axios.post(
      "http://localhost:5000/login",
      body,
      config
    )
    console.log(res.data)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")))
    }
    dispatch({
      type: LOGIN_FAIL,
    })
  }
}

// to logout a user
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  })
}