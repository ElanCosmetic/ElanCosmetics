import payload from '@/queries'
import ProductList from '../components/productList/ProductList'
import ImgSlider from '../components/ImgSlider/ImgSlider'
import GeneralCategories from '../components/GeneralCategories/GeneralCategories'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {

  const { locale } = await params;

  const homePageBlock = payload.findGlobal(
    {
      slug: 'homepage',
      depth: 3,
      locale: locale as 'ro' | 'ru' || 'ro'
    }
  )
  const layout = (await homePageBlock).Layout;

  return (
    <div className="flex flex-col gap-14 lg:gap-20 py-5 pt-0">
      {
        layout.map((block, index) => {
          switch (block.blockType) {
            case 'productList':
              return <ProductList locale={locale} key={index} title={block.title} category={block.category} />
            case 'imgslider':
              return <ImgSlider locale={locale} key={index} slides={block.slides} />
            case 'general-big-categories':
              return <GeneralCategories locale={locale} key={index} categories={block.categories} />
            default:
              return null
          }
        })
      }
    </div>
  )
}
