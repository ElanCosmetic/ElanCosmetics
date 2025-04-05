// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { s3Storage } from '@payloadcms/storage-s3'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { en } from '@payloadcms/translations/languages/en'
import { ro } from '@payloadcms/translations/languages/ro'

// collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { Collection } from './collections/Collections'
import { TermsPage } from './collections/TermsPages'
import { Orders } from './collections/Orders'
import { Volume } from './collections/Volume'
import { Brand } from './collections/Brand'
import { Discounts } from './collections/Discounts'
import { CustomerContactMessages } from './collections/CustomerContactMessages'

// globals
import { Footer } from './globals/Footer'
import { HomePage } from './globals/HomePage'
import { Header } from './globals/Header'
import { ProductPageGlobal } from './globals/ProductPage'
import { Contact } from './globals/Contact'
import { DeliveryGlobal } from './globals/Delivery'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Products,
    Collection,
    Orders,
    Discounts,
    TermsPage,
    Volume,
    Brand,
    CustomerContactMessages
  ],
  globals: [
    Footer,
    HomePage,
    Header,
    ProductPageGlobal,
    Contact,
    DeliveryGlobal
  ],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures
    ]
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: {
          generateFileURL: ({ filename }) => {
            return `${process.env.S3_PUBLIC_BUCKET_URL}/elancosmetic/${filename}`
          },
          disableLocalStorage: true,
        },
      },
      bucket: process.env.S3_BUCKET || '',

      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY_ID || '',
        },
        region: 'auto',
        endpoint: process.env.S3_ENDPOINT || ''
      }
    })
  ],
  localization: {
    locales: [
      {
        label: 'Romanian',
        code: 'ro'
      },
      {
        label: 'Russian',
        code: 'ru'
      }
    ],
    defaultLocale: 'ro'
  },
  email: nodemailerAdapter({
    defaultFromAddress: 'noreply@elan-cosmetic.com',
    defaultFromName: 'ElenCosmetic',
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: '89a562001@smtp-brevo.com', // Keep this as the SMTP login
        pass: process.env.SMTP_PASS,
      },
    },
  }),
  i18n: {
    supportedLanguages: {
      en: en,
      ro: ro
    },
  }
})
