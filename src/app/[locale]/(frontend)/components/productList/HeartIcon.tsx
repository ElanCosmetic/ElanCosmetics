'use client'
import { Heart } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Product, User } from "@/payload-types";
import { motion } from "motion/react";
import { useEffect, useState } from "react";


interface Props {
    productIncoming: Product,
    user: User | null,
    locale: string,
    wishlist: Product[] | null | undefined,
    onWishlistUpdate: (updatedWishlist: Product[]) => void
}

const HeartIcon = ({ user, locale, productIncoming, wishlist, onWishlistUpdate }: Props) => {
    const [active, setActive] = useState<boolean>(false);
    useEffect(() => {
        if (wishlist) {
            const isInWishlist = wishlist.some((product) => typeof product === 'object' && 'id' in product && product.id === productIncoming.id);
            setActive(isInWishlist);
        }
    }, [user, productIncoming, wishlist])

    const handleClick = async () => {
        if (!user) return;

        const updatedWishlist = wishlist ? [...wishlist] : [];

        const productIndex = updatedWishlist.findIndex(
            (product) => typeof product === 'object' && 'id' in product && product.id === productIncoming.id
        );

        if (productIndex === -1) {
            // Add the product as an object, not a string
            updatedWishlist.push(productIncoming);
        } else {
            // Remove the product from wishlist
            updatedWishlist.splice(productIndex, 1);
        }

        const response = await fetch(`/api/users/${user.id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ wishlist: updatedWishlist })
        });

        if (response.ok) {
            setActive((prev) => !prev);
            onWishlistUpdate([...updatedWishlist]);
        }
    };


    if (!user) {
        return <Link href={'/login'} locale={locale} className="absolute right-2 top-2 text-gray-500 z-[2]">
            <Heart />
        </Link>
    }

    return <motion.div
        onClick={() => handleClick()}
        className="absolute cursor-pointer right-2 top-2 text-gray-500 z-[2]"
        initial={{ scale: 1 }}
        animate={{ scale: active ? 1.2 : 1, opacity: active ? 1 : 0.6 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
        <Heart
            fill={active ? 'oklch(0.637 0.237 25.331)' : 'transparent'}
            stroke={active ? undefined : 'oklch(0.551 0.027 264.364)'}
            className="transition-all duration-300"
        />
    </motion.div>
}

export default HeartIcon;