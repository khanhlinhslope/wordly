import { Box } from '@chakra-ui/react'
import FormOptions from '@components/Modals/Settings/Form'
import Links from '@components/Modals/Settings/Links'

const Options = ({ options, ...props }) => (
  <Box pt={4} {...props}>
    <FormOptions options={options} />

    <Links />
  </Box>
)

export default Options
