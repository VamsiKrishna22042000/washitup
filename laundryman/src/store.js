import root from './components/Reducer/rootReducer.js'

import { createStore} from 'redux';

const store = createStore(root)
export default store
