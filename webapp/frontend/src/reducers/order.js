import { ORDER_ERROR, CLEAR_ORDER, GET_ORDER } from "../actions/types"

const initialState = {
  order: null,
  loading: true,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_ORDER:
      return {
        ...state,
        order: payload,
        loading: false,
      }
    case ORDER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    case CLEAR_ORDER:
      return {
        ...state,
        order: null,
        loading: true,
      }
    default:
      return state
  }
}