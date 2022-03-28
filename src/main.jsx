import './main.css'
import 'react-toastify/dist/ReactToastify.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'

const toastProps = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: false,
  draggable: true,
  pauseOnHover: false
}

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
      <ToastContainer {...toastProps} />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
