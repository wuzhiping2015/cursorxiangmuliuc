import { createRequire } from 'module'
const require = createRequire(import.meta.url)
export const collections = {
  'heroicons': () => require('@iconify-json/heroicons/icons.json'),
  'mdi': () => require('@iconify-json/mdi/icons.json'),
  'simple-icons': () => require('@iconify-json/simple-icons/icons.json'),
  'tabler': () => require('@iconify-json/tabler/icons.json'),
}