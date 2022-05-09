/* @ref: https://github.com/garmeeh/next-seo */

const title = 'Wordly - A daily word-guess game'
const description = 'Guess the hidden word in 6 tries. A new puzzle is available each day.'
const url = 'https://wordly-rho.vercel.app'
const imageUrl = `https://og-image.vercel.app/${encodeURI(title)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`
const keywords = 'wordly, wordle, word game, word guesser, word guess game, daily word game, daily word guess game, wordle en español, nytimes wordle game'

const seo = {
  titleTemplate: `%s | ${title}`,
  defaultTitle: title,
  description,
  openGraph: {
    description,
    title,
    locale: 'en_US',
    type: 'website',
    url,
    canonical: url,
    images: [
      {
        url: imageUrl,
        width: 800,
        height: 600,
        alt: title
      }
    ]
  },
  twitter: {
    handle: '@marsigliacr',
    site: '@marsigliacr',
    cardType: 'summary_large_image'
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: keywords
    }
  ],
  additionalLinkTags: [
    {
      rel: 'icon shortcut',
      href: '/wordle-icon-32.png',
      sizes: '3232'
    },
    {
      rel: 'apple-touch-icon',
      href: '/wordle-icon-192.png'
    }
  ]
}

export { seo as defaultSeo, url as defaultUrl }
