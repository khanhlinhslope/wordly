import { Box } from '@chakra-ui/react'
import FormOptions from 'components/Settings/Form'
import Links from 'components/Settings/Links'

const Options = ({ ...props }) => {
  return (
    <Box pt={4} {...props}>
      <FormOptions />

      <Links />
    </Box>
  )
}

export default Options
