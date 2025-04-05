type Params = Promise<{ id: string, locale: string }>
import payload from "@/queries";
import ProductGallery from "../../../components/productPage/ProductGallery";
import ProductAccordion from "./productAccordion";
import ProductBreadCrumbs from "./ProductBreadCrumbs";
import ProductBuyWindow from "./ProductBuyWindow";
import ProductPageLayout from "../../../components/productPage/ProductPageLayout";

const ProductPage = async ({ params }: { params: Params }) => {
    const { id, locale } = await params;
    const ProductData = await payload.find({
        collection: 'products',
        where: { id: { equals: id } },
        locale: locale as 'ro' | 'ru' || 'all'
    })

    const product = ProductData.docs[0];
    return (
        <div className="flex flex-col gap-12 lg:gap-20 container px-5 lg:px-10 py-6 mx-auto w-full">
            <div className="flex flex-col gap-5 lg:gap-10">
                <ProductBreadCrumbs locale={locale} title={product.title} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
                    <div className="flex flex-col gap-10">
                        {/* product gallery */}
                        {typeof product.featuredImg !== 'string' ?
                            <ProductGallery featuredImg={product.featuredImg} media={product.media} />
                            : null}
                        {/* product description */}
                        {product.description || product.ingredients ?
                            <div className="bg-white p-5 rounded-md text-gray-700">
                                <ProductAccordion
                                    description={product.description}
                                    ingredients={product.ingredients}
                                />
                            </div> : null
                        }
                    </div>
                    <ProductBuyWindow product={product} />
                </div>
            </div>
            <ProductPageLayout locale={locale} />
        </div>
    )
}
export default ProductPage;