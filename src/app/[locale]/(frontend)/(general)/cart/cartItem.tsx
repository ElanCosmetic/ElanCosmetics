import Image from "next/image"
import Link from "next/link";
import RemoveItem from "./removeItem";
import Counter from "./counter";

interface Props {
    productId: string,
    img: string | null,
    imgWidth: number | null,
    imgHeight: number | null,
    title: string,
    price: number,
    comparePrice: number | null,
    quantity: number,
    locale: string
}

const CartItem = ({
    productId,
    img,
    imgWidth,
    imgHeight,
    title,
    price,
    comparePrice,
    quantity,
    locale
}: Props) => {
    const item = {
        productId: productId,
        name: title,
        price: price,
        comparePrice: comparePrice,
        quantity: quantity,
        img: img,
        imgWidth: imgWidth,
        imgHeight: imgHeight
    }
    return (
        <div className="grid grid-cols-[auto_1fr] gap-4">
            <div className="w-20 aspect-square overflow-hidden rounded-md bg-white p-1">
                {img && imgWidth && imgHeight ?
                    <Link locale={locale} href={`/product/${productId}`}>
                        <Image src={img} width={imgWidth} height={imgHeight} alt='' className="w-full h-full object-contain object-center" />
                    </Link>
                    : <div>mising img</div>
                }
            </div>
            <div className="flex justify-between gap-5 flex-col md:flex-row">
                <div className="flex flex-col gap-4 justify-between text-gray-700">
                    <Link locale={locale} href={`/product/${productId}`} className="line-clamp-2 text-sm text-gray-500 hover:underline text-wrap max-w-[250px]">{title}</Link>
                    <div className="flex items-baseline gap-2">
                        {comparePrice ?
                            <div>
                                <span className="text-red-500 line-through text-sm">{price}</span>
                                <span className="text-lg font-semibold">{comparePrice}</span>
                            </div>
                            :
                            <span className="font-semibold">{price}</span>
                        }
                        <span className="font-semibold">MDL</span>
                    </div>
                </div>
                <div className="text-gray-700 flex md:flex-col flex-row justify-end md:justify-between items-center md:items-end gap-5 ">
                    <RemoveItem id={productId} color="#ff3333" />
                    <Counter
                        quantity={quantity}
                        item={item} />
                </div>
            </div>
        </div>
    )
}

export default CartItem;