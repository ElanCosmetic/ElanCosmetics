'use client'
import { Product } from "@/payload-types";
import { User } from "@/payload-types";
import { useState } from "react";
interface Props {
    locale: string
    user: User | null
}


import ProductCard from "../../components/productList/ProductCard";
import { useTranslations } from "next-intl";

const WishlistContainer = ({ locale, user }: Props) => {
    const [wishlist, setWishlist] = useState<Product[] | null | undefined>(Array.isArray(user?.wishlist) && user.wishlist.every(item => typeof item !== 'string') ? user.wishlist as Product[] : null);
    const t = useTranslations('Wishlist');

    const handleWishlistUpdate = (updatedWishlist: Product[]) => {
        setWishlist(updatedWishlist);
    };

    if (!wishlist || wishlist.length === 0) {
        return <div>{t('noProducts')}</div>;
    }
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 lg:gap-5">
            {wishlist.map((product, index) => {
                if (typeof product === 'string') return null;
                return (
                    <div key={index}>
                        <ProductCard wishlist={wishlist} product={product} locale={locale} user={user} onWishlistUpdate={handleWishlistUpdate} />
                    </div>
                );
            })}
        </div>
    )

}

export default WishlistContainer;