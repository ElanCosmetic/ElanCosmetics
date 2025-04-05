'use client'
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/app/[locale]/(frontend)/useCartStore";

import { toast } from "sonner"
import { useTranslations } from "next-intl";

interface Props {
    productId: string;
    name: string;
    price: number;
    comparePrice: number | null;
    quantity: number;
    img: string | null;
    imgWidth: number | null,
    imgHeight: number | null
}

const AddToCartBtn = ({ productId, name, price, quantity, comparePrice, img, imgHeight, imgWidth }: Props) => {
    const addToCart = useCartStore((state: { addToCart: (item: { productId: string; name: string; price: number; comparePrice: number | null; quantity: number; img: string | null; imgWidth: number | null; imgHeight: number | null; }) => void; }) => state.addToCart);
    const t = useTranslations('Product');
    const handleOnclick = () => {
        addToCart(
            {
                productId: productId,
                name: name,
                price: price,
                quantity: quantity,
                comparePrice: comparePrice,
                img: img,
                imgHeight: imgHeight,
                imgWidth: imgWidth,
            }
        );
        toast.success(t('addedSuccesfully'))
    }
    return (
        <Button
            className="text-sm md:text-base font-semibold text px-4 py-2 rounded-md bg-custompink hover:bg-rose-300 focus:bg-rose-400 text-white transition-all duration-300 h-full w-full"
            onClick={() => handleOnclick()}>
            {t('addToCart')}
        </Button>
    )
}

export default AddToCartBtn;