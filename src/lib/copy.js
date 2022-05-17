export const copyText = async text => {
  if ('clipboard' in navigator) {
    await navigator.clipboard.writeText(text)
  }

  return document.execCommand('copy', true, text)
}
