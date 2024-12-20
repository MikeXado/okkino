'use client'

import CartEmpty from './cart-empty'
import Image from 'next/image'
import { Price } from '../../_shared/price'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState, useTransition } from 'react'
import getStripe from '../utils'
import { CheckoutProduct, DeliveryOptions } from '@okkino/shared/schema'
import { OrderProduct } from '@okkino/shared/schema'
import { useCart } from '../../_shared/hooks'
import { Button } from '../../_shared/button'
import { compareCartProducts, getDeliveryPrice } from '../../_shared/utils'
import { RouteName } from '../../components/common/constants'
import Link from 'next/link'

export default function Cart() {
  const [isPending, startTransition] = useTransition()
  const { ref, inView } = useInView({ threshold: 0.99 })
  const [delivery, setDelivery] = useState<DeliveryOptions>(DeliveryOptions.enum.standard)
  const [cart, setCart] = useCart()

  useEffect(() => {
    getStripe().catch((error) => {
      console.error('Error loading Stripe', error)
      throw error
    })
  }, [])

  function removeProductFromCart(removeProduct: OrderProduct) {
    // TODO remove not only by id
    setCart(cart.filter((p) => !compareCartProducts(p, removeProduct)))
  }

  async function handleCheckout() {
    try {
      const checkout: CheckoutProduct = {
        host: window.location.origin,
        delivery,
        products: cart
      }
      const response = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify(checkout)
      })

      if (response.status !== 200) throw new Error('Error creating checkout session')

      const data = await response.json()

      const stripe = await getStripe()
      const { error } = await stripe!.redirectToCheckout({ sessionId: data.id })
      if (error) throw new Error(error.message)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  if (cart.length === 0) return <CartEmpty />

  // eslint-disable-next-line unicorn/no-array-reduce
  const price = cart.reduce((a, b) => a + b.quantity * (b.discountPrice || b.price), 0)
  const deliveryPrice = getDeliveryPrice(delivery, price)
  const totalPrice = price + deliveryPrice
  const totalItems = cart.reduce((a, b) => a + b.quantity, 0)

  return (
    <div className="grid lg:grid-cols-2 lg:justify-items-center lg:gap-60">
      <div className="grid gap-14 md:gap-24 lg:w-full lg:auto-rows-min">
        {/*PRODUCTS PAGE GRID*/}
        {cart.map((product) => (
          <div key={JSON.stringify(product)} className="grid grid-cols-[1fr_2fr] gap-10 md:gap-20">
            {/* PRODUCT LEFT COL*/}
            <div className="flex flex-col gap-5">
              <h3 className="text-xs uppercase text-black md:hidden">{product.name}</h3>

              <div className="relative aspect-[120/179]">
                <Image src={product.imageUrl} alt={product.name} fill />
              </div>
            </div>

            {/*PRODUCT DESCRIPTION*/}
            <div className="flex auto-rows-max flex-col gap-5">
              {/*PRODUCT NAME + REMOVE COL*/}
              <div className="grid auto-rows-max grid-cols-[1fr_2fr] items-center gap-y-2 last:align-bottom">
                <span>
                  <h3 className=" hidden text-xs uppercase text-black md:inline">{product.name}</h3>
                </span>
                <div className="flex w-full justify-end">
                  <button
                    className="okkino-text-hover text-xs uppercase text-black"
                    onClick={() => removeProductFromCart(product)}
                  >
                    {t.product.remove}
                  </button>
                </div>
              </div>
              {/*PRODUCT INFO*/}
              <div className="grid h-full auto-rows-max grid-cols-[1fr_2fr] items-center gap-y-2 last:align-bottom">
                {/*col-2*/}
                <span className="text-xs uppercase text-gray-600">{t.product.color}</span>
                <span className="text-sm font-bold uppercase text-black">{product.color.name}</span>
                {/*col-2*/}
                <span className="text-xs uppercase text-gray-600">{t.product.size}</span>
                <span className="text-sm font-bold uppercase text-black">{product.size}</span>
                {/*col-2*/}
                <span className="text-xs uppercase text-gray-600">{t.product.length}</span>
                <span className="text-sm font-bold uppercase text-black">{product.length}</span>
                {/*col-2*/}
                <span className="text-xs uppercase text-gray-600">{t.product.quantity}</span>
                <span className="text-sm font-bold uppercase text-black">{product.quantity}</span>
              </div>
              {/*col-2*/}
              <div className="grid grid-cols-[1fr_2fr]">
                <span className="text-sm uppercase text-black">{t.total}</span>
                <Price
                  price={product.price * product.quantity}
                  discountPrice={product.discountPrice * product.quantity}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/*REF FOR OBSERVER, AFTER @MD-screen it fixed to top, so always visible*/}
      <div
        className={(inView ? 'h-14' : 'h-[calc(134px+56px)]') + ' md:-z-1 md:fixed md:top-0'}
        ref={ref}
      />

      {/*ORDER OVERVIEW*/}
      <div
        className={
          'gap bottom-0 left-0 right-0 bg-black p-6 text-white transition-[height] ease-in-out' +
          (inView ? ' relative -ml-6 -mr-6' : ' fixed') +
          ' md:bg-white md:pb-24 md:pt-24 md:text-black' +
          ' lg:m-0 lg:p-0'
        }
      >
        {inView && <h3 className="text-base uppercase ">{t.overview.title}</h3>}

        {inView && <div className="h-8" />}

        {inView && (
          <div className="grid grid-cols-[1fr_3fr] gap-5 items-center">
            <span className="text-xs uppercase text-inherit">
              {totalItems} {totalItems > 1 ? t.overview.items : t.overview.item}
            </span>
            <span className="text-right text-sm font-bold text-inherit">€{price}</span>

            <div className="grid grid-cols-[1fr_3fr] gap-x-5 gap-y-2 items-center col-span-2">
              <span className="text-xs uppercase text-inherit">{t.delivery.delivery}</span>
              <div className="flex gap-8 place-self-end">
                <span
                  onClick={() => setDelivery(DeliveryOptions.enum.standard)}
                  className={
                    'cursor-pointer text-sm font-bold uppercase text-inherit ' +
                    (delivery === DeliveryOptions.enum.standard ? ' underline' : '')
                  }
                >
                  {t.delivery.standard}
                </span>
                <span
                  onClick={() => setDelivery(DeliveryOptions.enum.express)}
                  className={
                    'cursor-pointer text-sm font-bold uppercase text-inherit ' +
                    (delivery === DeliveryOptions.enum.express ? ' underline' : '')
                  }
                >
                  {t.delivery.express}
                </span>
              </div>
              <span className="col-start-2 text-sm  justify-self-end font-bold uppercase text-inherit">
                {deliveryPrice === 0 ? t.delivery.free : `€${deliveryPrice}`}
              </span>
            </div>
          </div>
        )}

        {/*TOTAL PRICE SPACER*/}
        {inView && <div className="h-12" />}
        {/*TOTAL PRICE*/}
        <div className="grid grid-cols-2">
          <span className="text-xs uppercase text-inherit">{t.total}</span>
          <span className="text-right text-sm font-bold text-inherit">€{totalPrice}</span>
        </div>

        {/*CHECKOUT SPACER*/}
        <div className={inView ? 'h-16' : 'h-5'} />

        <Button
          label={'Checkout'}
          onClick={() => startTransition(handleCheckout)}
          fullWidth
          className={
            ' border-white text-white md:border-black md:text-black ' +
            (isPending ? ' animate-pulse' : '')
          }
        />

        {/*POST CHECKOUT SPACER*/}
        {inView && <div className="h-14" />}

        {inView && <p className="text-sm uppercase text-inherit">{t.info.paymentTitle}</p>}
        {inView && <div className="h-2"></div>}
        {inView && <p className="text-xs uppercase text-inherit">{t.info.paymentTypes}</p>}

        {inView && <div className="h-20" />}

        {inView && (
          <Link
            href={'/' + RouteName.product + '/' + cart[0].urlName + '/' + RouteName.shippingGuide}
            className="text-sm uppercase text-inherit"
          >
            {t.info.returnTitle}
          </Link>
        )}
      </div>
    </div>
  )
}

const t = {
  product: {
    size: 'Size',
    color: 'Color',
    length: 'Length',
    remove: 'Remove',
    quantity: 'q_ty'
  },
  overview: {
    title: 'Order overview',
    item: 'item',
    items: 'items'
  },
  total: 'total',
  delivery: {
    delivery: 'delivery',
    standard: 'standard',
    express: 'express',
    free: 'free'
  },
  info: {
    paymentTitle: 'ACCEPTED PAYMENT METHODS',
    paymentTypes: 'Visa, Paypal, Mastercard',
    returnTitle: 'Shipping & Returns'
  }
}
