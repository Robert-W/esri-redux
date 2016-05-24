import appReducer from 'js/reducers/appReducer';
import {createStore} from 'redux';

// export a singleton store object
export default createStore(appReducer);
