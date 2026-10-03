// البيانات من صفحة المركز على خرائط Google
export const site = {
  whatsapp: '966551992995',
  phone: { tel: '+966551992995', label: '055 199 2995' },
  rating: '4.5',
  reviews: '121',
  maps: 'https://www.google.com/maps/search/?api=1&query=24.6795446,46.7020452',
  mapEmbed: 'https://www.google.com/maps?q=24.6795446,46.7020452&z=17&output=embed',
}
export const img = (p) => `/img/${p}`
export const wa = (text) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
