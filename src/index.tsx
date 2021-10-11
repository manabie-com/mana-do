import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './redux/store'
import 'antd/dist/antd.css'
import Loading from './components/Loading/Loading'

ReactDOM.render(
  <Provider store={store}>
    <App />
    <Loading />
  </Provider>,
  document.getElementById('root'),
)
reportWebVitals()
