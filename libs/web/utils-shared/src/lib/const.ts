import type Stripe from 'stripe'
export const PRODUCT_CATEGORIES = [
  {
    name: 'dresses'
  },
  {
    name: 'knitwear'
  },
  {
    name: 'coats_and_jackets'
  },
  {
    name: 'pants_and_skirts'
  },
  {
    name: 'accessories'
  },
  {
    name: 'tops_and_blouses'
  },
  {
    name: 'sale'
  }
]

export const PRODUCT_SIZES = [
  {
    name: 'XXS'
  },
  {
    name: 'XS'
  },
  {
    name: 'S'
  },
  {
    name: 'M'
  },
  {
    name: 'L'
  },
  {
    name: 'XL'
  },
  {
    name: 'XXL'
  },
  {
    name: 'XXXL'
  },
  {
    name: 'One size'
  },
  {
    name: 'XS/S'
  },
  {
    name: 'S/M'
  },
  {
    name: 'M/L'
  },
  {
    name: 'L/XL'
  },
  {
    name: 'XXL/XXXL'
  }
]

export const PRODUCT_COLORS = [
  { name: 'white', value: '#ffffff' },
  { name: 'black', value: '#000000' },
  { name: 'gray', value: '#808080' },
  { name: 'red', value: '#ff0000' },
  { name: 'green', value: '#008000' },
  { name: 'blue', value: '#0000ff' },
  { name: 'yellow', value: '#ffff00' },
  { name: 'pink', value: '#ffc0cb' },
  { name: 'brown', value: '#a52a2a' },
  { name: 'purple', value: '#800080' },
  { name: 'orange', value: '#ffa500' },
  { name: 'cream', value: '#fffdd0' },
  { name: 'neutrals', value: '#f5f5dc' },
  { name: 'metallic', value: '#aaa9ad' },
  { name: 'gold', value: '#ffd700' },
  { name: 'teal', value: '#008080' },
  { name: 'lavender', value: '#e6e6fa' },
  { name: 'olive', value: '#808000' },
  { name: 'navy', value: '#000080' },
  { name: 'mustard', value: '#ffdb58' },
  { name: 'coral', value: '#ff7f50' },
  { name: 'peach', value: '#ffe5b4' },
  { name: 'mint', value: '#98ff98' },
  { name: 'charcoal', value: '#36454f' },
  { name: 'indigo', value: '#4b0082' },
  { name: 'burgundy', value: '#800020' },
  { name: 'ivory', value: '#fffff0' },
  { name: 'rose gold', value: '#b76e79' },
  { name: 'silver', value: '#c0c0c0' },
  { name: 'bronze', value: '#cd7f32' },
  { name: 'denim blue', value: '#1560bd' },
  { name: 'khaki', value: '#f0e68c' },
  { name: 'emerald', value: '#50c878' },
  { name: 'mauve', value: '#e0b0ff' },
  { name: 'graphite', value: '#251607' },
  { name: 'camel', value: '#c19a6b' },
  { name: 'moss green', value: '#8a9a5b' },
  { name: 'sand', value: '#c2b280' }
]

export const PRODUCT_LENGTHS = [
  {
    name: 'petite'
  },
  {
    name: 'regular'
  },
  {
    name: 'tall'
  }
]

export const TEXT_EDITOR_CLASSES = '[&>p:empty]:h-6 [&>p]:text-sm [&>p]:text-gray-600'

export const allowedCountries: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] =
  [
    'AL',
    'AD',
    'AM',
    'AT',
    'AZ',
    'BY',
    'BE',
    'BA',
    'BG',
    'HR',
    'CY',
    'CZ',
    'DK',
    'EE',
    'FI',
    'FR',
    'DE',
    'GR',
    'HU',
    'IS',
    'IE',
    'IT',
    'KZ',
    'LV',
    'LI',
    'LT',
    'LU',
    'MT',
    'MD',
    'MC',
    'ME',
    'NL',
    'MK',
    'NO',
    'PL',
    'PT',
    'RO',
    'SM',
    'RS',
    'SK',
    'SI',
    'ES',
    'SE',
    'CH',
    'TR',
    'UA',
    'GB',
    'VA',
    'BH',
    'BN',
    'CN',
    'GE',
    'IN',
    'ID',
    'IL',
    'JP',
    'JO',
    'KW',
    'LB',
    'MY',
    'MV',
    'PH',
    'QA',
    'SA',
    'SG',
    'KR',
    'LK',
    'TH',
    'AE',
    'VN',
    'DZ',
    'EG',
    'CI',
    'MA',
    'SC',
    'ZA',
    'CA',
    'MX',
    'US',
    'AR',
    'BR',
    'CL',
    'CO',
    'EC',
    'PE',
    'UY',
    'AU',
    'NZ'
  ]
