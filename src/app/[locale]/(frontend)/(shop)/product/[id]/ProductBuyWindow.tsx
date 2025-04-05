import { useTranslations } from "next-intl";
import BuyButtons from "./BuyButtons";
import { Product } from "@/payload-types";
import { Separator } from "@/components/ui/separator";
const ProductBuyWindow = ({ product }: { product: Product }) => {
    const t = useTranslations("Product")
    return (
        <div className="sticky top-5 bg-white p-5 lg:p-10 rounded-md h-fit">
            {
                product.productCode && (
                    <div>
                        <div className="flex items-baseline gap-2 text-gray-700">
                            <span className="font-semibold">{t('codProdus')}:</span>
                            <span>{product.productCode}</span>
                        </div>
                        <Separator className="my-4" />
                    </div>
                )
            }
            <div className="flex flex-col gap-3 h-fit">
                <p className="text-slate-800 text-xl md:text-2xl font-semibold">{product.title}</p>
                {/* <div>
                    reviews
                </div> */}
                <div className="flex flex-col gap-3 my-5">
                    {
                        product.brandRelation && typeof product.brandRelation !== 'string' && (
                            <div className="flex items-baseline gap-2 text-gray-700">
                                <span className="font-semibold">{t('brand')}:</span>
                                <span>{product.brandRelation.slug}</span>
                            </div>
                        )
                    }
                    {
                        product.volumeRelation && typeof product.volumeRelation !== 'string' && (
                            <div className="flex items-baseline gap-2 text-gray-700">
                                <span className="font-semibold">{t('volum')}:</span>
                                <span>{product.volumeRelation.slug}</span>
                            </div>
                        )
                    }
                </div>
                <div className="text-gray-700">
                    {
                        product.compare_price ?
                            <div className="flex gap-2 items-baseline">
                                <span className="line-through text-sm md:text-base">{product.price}</span>
                                <span className="text-red-600 font-semibold text-base md:text-xl">{product.compare_price} MDL</span>
                            </div>
                            : <span className="text-base md:text-lg font-semibold">
                                {product.price} MDL
                            </span>
                    }
                </div>
                <BuyButtons product={product} />
            </div>
        </div>
    )
}

export default ProductBuyWindow;