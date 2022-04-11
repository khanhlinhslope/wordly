import { Button } from '@chakra-ui/react'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe(
  'pk_test_51IUqMCJ2iOysJZvP3vrQpEoV2l1SpF9PzkycqVdKjmC3RYuDC3AqTvRfBDcsDwDmtxJlkUyip4GQOb8Akt0lF3O100RSHVPfch'
)

const DonateButton = ({ itemID = 'price_1IUx1FJ2iOysJZvP1LD3EzTR', ammount = '5.00' }) => {
  const handleClick = async (event) => {
    const stripe = await stripePromise
    stripe
      .redirectToCheckout({
        lineItems: [{ price: itemID, quantity: 1 }],
        mode: 'payment',
        successUrl: window.location.protocol + '//localpdf.tech/merge',
        cancelUrl: window.location.protocol + '//localpdf.tech/merge',
        submitType: 'donate'
      })
      .then(function (result) {
        if (result.error) {
          console.log(result)
        }
      })
  }

  return (
    <Button
      onClick={handleClick}
    >
      Donate {ammount}$
    </Button>
  )
}

export default DonateButton
