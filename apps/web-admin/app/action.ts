'use server'

import { webAdminEnv } from '@okkino/web/utils-env-admin'
import { currentUser } from '@clerk/nextjs/server'
import { db, shipOrder } from '@okkino/api/data-access-db'
import { ProductForm } from './dashboard/product/_components/form'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'
import { OrderProduct } from '@okkino/shared/schema'
import { sendDispatchedOrderEmail } from '@okkino/shared/mailer'

export async function emailAndShipOrder(data: {
  name: string
  email: string
  message: string
  orderId: string
  address: string
  items: number
  products: OrderProduct[]
  total: number
  shipping: number
  subTotal: number
  tracking_number: string
}) {
  await shipOrder(data.orderId)
  await sendDispatchedOrderEmail({
    order: {
      name: data.name,
      shipping: data.shipping,
      email: data.email,
      pass: webAdminEnv.email.pass,
      items: data.items,
      subTotal: data.subTotal,
      total: data.total,
      products: data.products
    },
    dispatchedOrder: {
      client_address: data.address,
      client_name: data.name,
      tracking_number: data.tracking_number
    }
  })
  revalidatePath('/dashboard/order')
  revalidatePath(`/dashboard/order/${data.orderId}`)
}

export async function redeploy() {
  const user = await currentUser()
  if (!user) throw new Error('You must be logged in to redeploy')

  await fetch(webAdminEnv.deployHook, { method: 'GET' })
}

export async function deleteProduct(id: string) {
  const user = await currentUser()
  if (!user) throw new Error('You must be logged in to delete user')

  await db.product.update({ where: { id }, data: { deleted: true } })
  revalidatePath('/dashboard')
  revalidatePath(`/dashboard/product/${id}`)
}

export async function saveProduct(data: ProductForm) {
  console.log('data', data)
  const user = await currentUser()
  if (!user) throw new Error('You must be logged to update products')

  const productBody: Omit<Prisma.ProductCreateInput, 'images'> = {
    ...data,
    productCategories: {
      connect: data.productCategories
    },
    productSizes: {
      connect: data.productSizes
    },
    availableColors: {
      connect: data.availableColors
    }
  }

  const id = data.id
  const urlName = data.id ? undefined : data.urlName
  await db.product.upsert({
    where: { id, urlName },
    create: {
      ...productBody,
      images: {
        createMany: {
          data: data.images.map((image) => ({
            url: image.url,
            title: data.textName,
            bgColor: image.bgColor,
            order: image.order,
            key: image.key
          })),
          skipDuplicates: true
        }
      }
    },
    update: {
      ...productBody,
      productSizes: {
        set: data.productSizes
      },
      productCategories: {
        set: data.productCategories
      },
      availableColors: {
        set: data.availableColors
      },
      images: {
        deleteMany: {},
        createMany: {
          data: data.images.map((image) => ({
            url: image.url,
            title: data.textName,
            bgColor: image.bgColor,
            order: image.order,
            key: image.key
          })),
          skipDuplicates: true
        }
      }
    }
  })

  revalidatePath('/dashboard')
}
