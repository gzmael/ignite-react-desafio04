import { stripe } from "@lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { CartDetails, Product } from "use-shopping-cart/core";
import { validateCartItems } from "use-shopping-cart/utilities";

interface QueryProps {
  cart: CartDetails;
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { cart } = req.body as QueryProps;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!cart) {
    return res.status(400).json({ error: 'Price not found.' });
  }
  const inventory = await stripe.products.list({
    expand: ['data.default_price'],
  })
  const products: Product[] = inventory.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      currency: 'BRL',
      id: product.id,
      name: product.name,
      price: price.unit_amount ? price.unit_amount : 0,
      sku: '',
      sku_id: product.id,
      image: product.images[0],
    }
  })

  const line_items = validateCartItems(products, cart);

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}success?session_id={CHECKOUT_SESSION_ID}`,
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}