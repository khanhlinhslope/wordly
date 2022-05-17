import '@styles/globals.css'
import '@styles/animations.css'
import 'focus-visible/dist/focus-visible'
import 'react-toastify/dist/ReactToastify.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@lib/theme'
import { Zoom, ToastContainer } from 'react-toastify'

const toastProps = {
  position: 'top-center',
  autoClose: 1000,
  hideProgressBar: true,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: false,
  draggable: true,
  pauseOnHover: false,
  theme: 'dark',
  limit: 15,
  closeButton: false,
  transition: Zoom,
  icon: false
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
