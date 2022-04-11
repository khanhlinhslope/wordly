import './main.css'
import 'focus-visible/dist/focus-visible'
import 'react-toastify/dist/ReactToastify.css'
import { render } from 'react-dom'
import App from 'src/App'
import theme from 'lib/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'

const Content = () => {
  return (
    <ChakraProvider theme={theme}>
      <App />
      <ToastContainer {...toastProps} />
    </ChakraProvider>
  )
}

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

const root = document.getElementById('root')
render(<Content />, root)
