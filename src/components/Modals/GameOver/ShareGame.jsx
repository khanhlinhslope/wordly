import { Flex, HStack, IconButton, Text } from '@chakra-ui/react'
import { generateTextToShare } from '@lib/share'
import useShare from '@hooks/useShare'
import { toast } from 'react-toastify'
import { MdOutlineContentCopy as CopyIcon, MdShare as ShareIcon } from 'react-icons/md'
import {
  EmailShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  EmailIcon
} from 'react-share'
import { copyText } from '@lib/copy'

const ShareGame = ({ title, wordList, ...props }) => {
  const textToShare = generateTextToShare({ title, wordList })
  const { share, isSupported } = useShare()

  const dataToShare = {
    title,
    text: textToShare
  }

  const copyToClipboard = async () => {
    await copyText(textToShare)
    toast('Copied to clipboard')
  }

  const shareData = async () => {
    await share(dataToShare, { fallback: copyToClipboard })
  }

  return (
    <Flex flexDir='column' {...props}>
      <Text textAlign='center' fontSize={18} fontWeight={400}>
        Share your result
      </Text>

      <HStack justify='center'>
        <TwitterShareButton url={textToShare}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <TelegramShareButton url={textToShare}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>

        <WhatsappShareButton url={textToShare}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>

        <EmailShareButton url={textToShare}>
          <EmailIcon size={32} round />
        </EmailShareButton>

        <IconButton borderRadius='full' onClick={copyToClipboard} size='sm'>
          <CopyIcon />
        </IconButton>

        {isSupported && (
          <IconButton
            borderRadius='full'
            variant='wordle'
            onClick={shareData}
            size='sm'
          >
            <ShareIcon />
          </IconButton>
        )}
      </HStack>
    </Flex>
  )
}

export default ShareGame
