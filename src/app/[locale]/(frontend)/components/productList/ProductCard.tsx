'use client'
import { Product } from "@/payload-types";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import AddToCartBtn from "../AddToCartBtn";
import HeartIcon from "./HeartIcon";
import { User } from "@/payload-types";
interface Props {
    product: Product,
    locale: string,
    user: User | null,
    wishlist: Product[] | null | undefined,
    onWishlistUpdate: (updatedWishlist: Product[]) => void;
}

const ProductCard = ({ product, locale, user, wishlist, onWishlistUpdate }: Props) => {
    return (
        <div className="flex relative flex-col justify-between gap-3 md:gap-8 bg-white w-[170px] md:w-[220px] lg:w-[250px] rounded-md p-5 h-full">
            <HeartIcon onWishlistUpdate={onWishlistUpdate} productIncoming={product} locale={locale} user={user ? user : null} wishlist={wishlist} />
            <Link href={`/product/${product.id}`} locale={locale} className="w-full aspect-square mx-auto overflow-hidden text-gray-700 relative">
                {(product.featuredImg && typeof product.featuredImg !== 'string' && product.featuredImg.url) ?
                    <Image
                        src={product.featuredImg.url}
                        alt={product.title}
                        className="w-full object-contain object-center hover:scale-105 transition-all"
                        width={product.featuredImg.width || 100}
                        height={product.featuredImg.height || 100} />
                    : 'invalid url'}
            </Link>
            <Link href={`/product/${product.id}`} locale={locale} className="flex flex-col gap-1 md:gap-[10px]">
                <span className="text-gray-700 font-semibold line-clamp-2">{product.title}</span>
                <span className="text-gray-500 font-bold text-sm">{product.price} mdl</span>
            </Link>
            <div className="w-full">
                <AddToCartBtn
                    productId={product.id}
                    price={product.price}
                    img={product.featuredImg && typeof product.featuredImg !== 'string' ? product.featuredImg.url ? product.featuredImg.url : null : null}
                    imgHeight={product.featuredImg && typeof product.featuredImg !== 'string' ? product.featuredImg.height ? product.featuredImg.height : null : null}
                    imgWidth={product.featuredImg && typeof product.featuredImg !== 'string' ? product.featuredImg.width ? product.featuredImg.width : null : null}
                    quantity={1}
                    name={product.title}
                    comparePrice={product.compare_price ? product.compare_price : null}
                />
            </div>
        </div>
    )
}


export default ProductCard;