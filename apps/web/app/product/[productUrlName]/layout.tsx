import { ReactNode } from 'react'
import { getProduct, getProducts } from '@okkino/api/data-access-db'
import ProductImages from './components/product-images'

interface IRootLayoutProps {
  children: ReactNode
  params: { productUrlName: string }
}

export default async function RootLayout(props: IRootLayoutProps) {
  const { params, children } = props
  const product = await getProduct(decodeURI(params.productUrlName))
  const { images } = product
  const sortedImages = images.sort((a, b) => a.order - b.order)

  return (
    <div className="3xl 3xl:grid-cols-2 xl:grid xl:h-[calc(100vh-9rem)] xl:grid-cols-[1fr_2fr] xl:gap-40">
      <div
        className={
          // full screen - 9rem (header height)
          'xl:h-[calc(100vh-9rem)] ' +
          'xl:max-w-[540px] ' +
          'xl:overflow-y-scroll ' +
          'xl:scrollbar-hide ' +
          'xl:flex-col ' +
          'xl:mr-0 ' +
          '-mr-6 flex snap-both snap-mandatory gap-4 overflow-x-scroll scroll-smooth md:-mr-14 md:gap-6 '
        }
      >
        <ProductImages productImages={sortedImages} />
      </div>

      <div className="flex flex-col justify-center">
        <div className="h-6 xl:h-0" />

        {children}
      </div>
      <footer className="h-20  md:h-28 xl:hidden" />
    </div>
  )
}

export async function generateStaticParams() {
  const products = await getProducts()
  const urlProductNames = products.map((product) => product.urlName)

  const params = []
  for (const product of urlProductNames) {
    params.push({ productUrlName: product })
  }
  return params
}
