export const isValidLetter = (key) => {
  const isValid =
    /[a-z-ñ]/i.test(key.toString().toLowerCase()) &&
    key.length === 1 // no special keys
  return isValid
}
