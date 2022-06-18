import { GET_DATA_ERROR,GET_DATA} from "../actions/types"

const initialState = {
  data: null,
  loading: true,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_DATA_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    case GET_DATA:
      return {
        ...state,
        data: payload,
        loading:false
      }
    default:
      return state
  }
}