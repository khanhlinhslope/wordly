import '@styles/globals.css'
import 'focus-visible/dist/focus-visible'
import 'react-toastify/dist/ReactToastify.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@lib/theme'
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

function MyApp ({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps}/>
      <ToastContainer {...toastProps} />
    </ChakraProvider>
  )
}

export default MyApp
