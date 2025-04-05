'use client'
import { Product } from "@/payload-types";
import QuantityButtons from "./quantityButtons";
import AddToCartBtn from "@/app/[locale]/(frontend)/components/AddToCartBtn";
import { useState } from "react";
const BuyButtons = ({ product }: { product: Product }) => {
    const [quantity, setQuantity] = useState(1);
    return (
        <div className="grid grid-cols-[auto_1fr] gap-2">
            <QuantityButtons quantity={quantity} setQuantity={setQuantity} />
            <AddToCartBtn
                name={product.title}
                price={product.price}
                productId={product.id}
                quantity={quantity}
                comparePrice={product.compare_price !== undefined ? product.compare_price : null}
                img={typeof product.featuredImg !== 'string' ? product.featuredImg.url ? product.featuredImg.url : null : null}
                imgHeight={typeof product.featuredImg !== 'string' ? product.featuredImg.height ? product.featuredImg.height : null : null}
                imgWidth={typeof product.featuredImg !== 'string' ? product.featuredImg.width ? product.featuredImg.width : null : null}
            />
        </div>
    )
}

export default BuyButtons;