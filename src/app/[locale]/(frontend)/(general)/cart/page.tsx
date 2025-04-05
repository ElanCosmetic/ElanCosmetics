'use client'

import CartIconEmpty from "../../components/Icons/CartIconEmpty";
import Link from "next/link";
import PageTitle from "../../components/PageTitle";
import { useCartStore } from "../../useCartStore";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";
import CartItem from "./cartItem";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import OrderSummary from "./orderSummary";

const Cart = () => {
    const t = useTranslations("CartPage");
    const locale = useLocale();
    const items = useCartStore((state) => state.items);
    const discount = useCartStore((state) => state.discount); // Get discount from store
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const unsubHydrate = useCartStore.persist.onHydrate(() => setHydrated(false));
        const unsubFinishHydration = useCartStore.persist.onFinishHydration(() => setHydrated(true));
        setHydrated(useCartStore.persist.hasHydrated());

        return () => {
            unsubHydrate();
            unsubFinishHydration();
        };
    }, []);

    // Show loading spinner until Zustand has finished hydrating
    if (!hydrated) {
        return (
            <div className="flex flex-1 justify-center items-center text-gray-700">
                <LoadingSpinner className="w-14 h-14 lg:w-20 lg:h-20" />
            </div>
        );
    }

    // Only render cart when hydration is complete
    if (items.length === 0) {
        return (
            <div className="w-full flex-1 flex justify-center items-center">
                <div className="flex flex-col gap-8 items-center">
                    <CartIconEmpty />
                    <h1 className="text-2xl text-gray-700">{t("title")}</h1>
                    <Link href="/" locale={locale} className="bg-custompink hover:bg-rose-200 focus:bg-rose-400 rounded-full p-4">
                        <span className="text-white">{t("seeMore")}</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container flex flex-col gap-4 px-4 md:px-10 py-10 mx-auto">
            <PageTitle title={t("title")} />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4">
                <div className="flex flex-col gap-4 text-gray-700 border border-gray-300 rounded-xl p-5 h-fit max-h-[500px] md:max-h-none overflow-y-auto">
                    {items.map((item, index) => {
                        if (index + 1 === items.length) {
                            return (
                                <CartItem key={index}
                                    title={item.name}
                                    comparePrice={0}
                                    img={item.img}
                                    imgHeight={item.imgHeight}
                                    imgWidth={item.imgWidth}
                                    price={item.price}
                                    quantity={item.quantity}
                                    productId={item.productId}
                                />
                            );
                        }

                        return (
                            <div key={index} className="flex flex-col gap-4">
                                <CartItem key={index}
                                    title={item.name}
                                    comparePrice={0}
                                    img={item.img}
                                    imgHeight={item.imgHeight}
                                    imgWidth={item.imgWidth}
                                    price={item.price}
                                    quantity={item.quantity}
                                    productId={item.productId}
                                />
                                <Separator />
                            </div>
                        );
                    })}
                </div>
                <OrderSummary items={items} discount={discount} /> {/* Pass discount */}
            </div>
        </div>
    );
};

export default Cart;
