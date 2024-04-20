import Image from 'next/image'
import { Lato } from 'next/font/google'

const lato = Lato({
  weight: ['400', '700'],
  display: 'swap',
  style: 'normal',
  subsets: ['latin']
})

export default function TempPage() {
  return (
    <html className={lato.className + ' min-h-full min-w-full'}>
      <body className="min-h-full min-w-full flex items-center flex-col pl-6 pr-6 pt-[60px] bg-white">
        <Image src={'/logo.svg'} width={114} height={20} alt={'logo'} className="md:h-5 md:w-28" />
        <div className="h-[60px]" />

        <div className="grid grid-cols-2 gap-6 w-full max-w-[640px]">
          <div className="relative aspect-[308/461]">
            <Image src="/static-images/l.png" alt="okkino coming soon left" fill />
          </div>
          <div className="relative aspect-[308/461]">
            <Image src="/static-images/r.png" alt="okkino coming soon right" fill />
          </div>
        </div>

        <div className="h-[60px]" />

        <div className="flex flex-col items-center w-full max-w-[375px]">
          <p className="text-center text-md uppercase font-bold text-black tracking-wide leading-6">
            We are rebranding our website, it will be back up and running soon.
          </p>

          <div className="h-3" />

          <p className="text-gray-600 text-center">
            For any questions regarding your current order or if you wish to place an order, please
            message us on Instagram —{' '}
            <a className="underline" href="https://www.instagram.com/okkino.studio">
              @okkino.studio
            </a>
          </p>

          <div className="h-[60px]" />

          <p className="text-xs uppercase font-normal">Best regards, OK KINO team</p>
        </div>
      </body>
    </html>
  )
}