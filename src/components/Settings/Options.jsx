import { Box } from '@chakra-ui/react'
import FormOptions from '@components/Settings/Form'
import Links from '@components/Settings/Links'

const Options = ({ options, ...props }) => (
  <Box pt={4} {...props}>
    <FormOptions options={options} />

    <Links />
  </Box>
)

export default Options
