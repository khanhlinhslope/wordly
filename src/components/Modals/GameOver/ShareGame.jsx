import { useEffect } from 'react'
import { HStack, IconButton, useClipboard } from '@chakra-ui/react'
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

const ShareGame = ({ title, wordList, ...props }) => {
  const textToShare = generateTextToShare({ title, wordList })
  const { share, isSupported } = useShare()
  const { hasCopied, onCopy: copyToClipboard } = useClipboard(textToShare)

  const dataToShare = {
    title,
    text: textToShare
  }

  const shareData = async () => {
    await share(dataToShare, { fallback: copyToClipboard })
  }

  useEffect(() => {
    if (hasCopied) {
      toast('Copied to clipboard')
    }
  }, [hasCopied])

  return (
    <HStack justify='center' {...props}>
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
          colorScheme='pink'
          onClick={shareData}
          size='sm'
        >
          <ShareIcon />
        </IconButton>
      )}
    </HStack>
  )
}

export default ShareGame
