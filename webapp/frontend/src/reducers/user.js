import { USER_ERROR, CLEAR_USER, ALL_USER} from "../actions/types"

const initialState = {
  users: [],
  loading: true,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    case ALL_USER:
      return {
        ...state,
        users: payload,
        loading:false
      }
    default:
      return state
  }
}