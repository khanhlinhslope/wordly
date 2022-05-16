import { useEffect } from 'react'
import { HStack, IconButton, useClipboard } from '@chakra-ui/react'
import { generateTextToShare } from '@lib/share'
import useShare0 from '@hooks/useShare'
import useShare from '@hooks/useShare2'
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
  const { share: share0, isShareable: isShareable0 } = useShare0()
  const { share, isSupported } = useShare()
  const { hasCopied, onCopy: copyToClipboard } = useClipboard(textToShare)

  const dataToShare = {
    title,
    text: textToShare,
    url: 'https://wordly-alpha.vercel.app'
  }

  const shareable = isShareable0(dataToShare)

  const shareData0 = async () => {
    await share0(dataToShare)
  }

  const shareData = async () => {
    if (isSupported) {
      await share(dataToShare)
    }
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
        <IconButton borderRadius='full' colorScheme='facebook' onClick={shareData} size='sm'>
          <ShareIcon />
        </IconButton>
      )}

      {shareable && (
        <IconButton borderRadius='full' colorScheme='pink' onClick={shareData0} size='sm'>
          <ShareIcon />
        </IconButton>
      )}
    </HStack>
  )
}

export default ShareGame
