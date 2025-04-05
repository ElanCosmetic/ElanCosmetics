import { Product } from "@/payload-types";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
const SearchItem = ({ product, onItemClick, locale }: { product: Product, onItemClick: () => void, locale: string }) => {
    return (
        <Link locale={locale} href={`/product/${product.id}`} className="w-full flex flex-col justify-between gap-5 text-gray-700 group" onClick={onItemClick}>
            <div className="w-full aspect-square overflow-hidden">
                {product.featuredImg && typeof product.featuredImg !== 'string' ?
                    <Image src={product.featuredImg.url || ''} alt={product.title} width={product.featuredImg.width || 100} height={product.featuredImg.height || 100}
                        className="w-full h-full object-contain object-center group-hover:scale-105 transition-all duration-300" />
                    : <div>no image</div>}
            </div>
            <div>
                <div className="text-base md:text-lg font-semibold line-clamp-2">
                    {product.title}
                </div>
                <div className="text-sm md:text-base">
                    {
                        product.compare_price ?
                            <div>
                                <span>{product.price}</span>
                                <span>{product.compare_price} MDL</span>
                            </div>
                            :
                            <div>{product.price} MDL</div>
                    }
                </div>
            </div>
        </Link>
    )
}

export default SearchItem;