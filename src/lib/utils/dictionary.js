export const filter = (dictionary, letters) => {
  return dictionary.filter(w => w.length === letters)
}

// const filter = (dictionary, min, max) => {
//   return dictionary.filter(w => w.length >= min && w.length <= max)
// }
