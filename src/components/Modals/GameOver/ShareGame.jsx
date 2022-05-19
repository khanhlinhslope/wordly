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
      <Text fontSize={18} fontWeight={400} textAlign='center'>
        Share your result
      </Text>

      <HStack justify='center'>
        <TwitterShareButton url={textToShare}>
          <TwitterIcon round size={32} />
        </TwitterShareButton>

        <TelegramShareButton url={textToShare}>
          <TelegramIcon round size={32} />
        </TelegramShareButton>

        <WhatsappShareButton url={textToShare}>
          <WhatsappIcon round size={32} />
        </WhatsappShareButton>

        <EmailShareButton url={textToShare}>
          <EmailIcon round size={32} />
        </EmailShareButton>

        <IconButton borderRadius='full' size='sm' onClick={copyToClipboard}>
          <CopyIcon />
        </IconButton>

        {isSupported && (
          <IconButton
            borderRadius='full'
            size='sm'
            variant='wordle'
            onClick={shareData}
          >
            <ShareIcon />
          </IconButton>
        )}
      </HStack>
    </Flex>
  )
}

export default ShareGame
