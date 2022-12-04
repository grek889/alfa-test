import { legacy_createStore as createStore} from 'redux'
import { imgReducer } from './imgReducer'

export const store = createStore(imgReducer)