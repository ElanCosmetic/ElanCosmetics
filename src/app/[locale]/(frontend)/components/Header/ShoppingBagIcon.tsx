'use client'
import { Link } from '@/i18n/navigation';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from "../../useCartStore";
import { motion } from "motion/react";

const ShoppingBagIcon = ({ locale }: { locale: string }) => {
    const cartItems = useCartStore((state) => state.items);

    return (
        <div className="relative hidden md:block">
            <Link href={'/cart'} locale={locale}>
                <ShoppingBag strokeWidth={1.5} />
            </Link>
            {cartItems.length > 0 ?
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="w-3 h-3 bg-red-500 rounded-full absolute top-[-1px] right-[-1px]"></motion.div>
                : null
            }
        </div>
    )
}

export default ShoppingBagIcon;