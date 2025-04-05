"use client";

import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useCartStore } from "../../useCartStore";
import { Discount } from "@/payload-types";

interface CartItem {
    productId: string;
    name: string;
    price: number;
    comparePrice: number | null;
    quantity: number;
    img: string | null;
    imgWidth: number | null;
    imgHeight: number | null;
}

interface DiscountType {
    code: string
    value: number;
    type: "fixed" | "percent";
}

interface Props {
    items: CartItem[];
    discount: DiscountType | null;
}

const OrderSummary = ({ items, discount }: Props) => {
    const t = useTranslations("CartPage");
    const locale = useLocale();
    const [discountCode, setDiscountCode] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const setDiscount = useCartStore((state) => state.applyDiscount);
    const removeDiscount = useCartStore((state) => state.removeDiscount);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/users/me", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                });

                if (res.ok) {
                    const userData = await res.json();
                    setUserId(userData.id);
                }
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };

        fetchUser();
    }, []);

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Calculate discount amount based on type
    const discountAmount = discount
        ? discount.type === "percent"
            ? (subtotal * discount.value) / 100
            : discount.value
        : 0;

    const total = subtotal - discountAmount;

    const handleApplyDiscount = async () => {
        if (!discountCode) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/discounts?where[code][equals]=${discountCode}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();

            if (!data || !data.docs || data.docs.length === 0) {
                setError(t("invalidDiscount"));
                return;
            }

            const discountData: Discount = data.docs[0];

            if (discountData.user && discountData.user !== userId) {
                setError(t("discountNotAllowed"));
                return;
            }

            if (discountData.amount && discountData.discountType) {
                setDiscount(discountData.code, discountData.amount, discountData.discountType);
            }
        } catch (err) {
            console.log(err);
            setError(t("errorApplyingDiscount"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="text-gray-700 border border-gray-300 rounded-xl p-5 flex flex-col gap-6 lg:max-w-[400px] h-fit">
            <h2 className="text-xl font-semibold">{t("orderSummary")}</h2>
            <div className="flex flex-col gap-3 md:gap-4">
                <div className="flex items-baseline justify-between text-base md:text-lg">
                    <span>{t("subtotal")}</span>
                    <div className="flex gap-1">
                        <span>{subtotal.toFixed(2)}</span>
                        <span>MDL</span>
                    </div>
                </div>
                {discount && (
                    <div className="flex items-baseline justify-between text-base text-green-600">
                        <span>{t("discountApplied")}</span>
                        <div className="flex gap-1">
                            <span>
                                -{discount.type === "percent" ? `${discount.value}%` : `${discount.value} MDL`}
                            </span>
                        </div>
                    </div>
                )}
                <Separator className="my-3 md:my-4" />
                <div className="flex items-baseline justify-between text-lg">
                    <span>{t("total")}</span>
                    <div className="flex gap-1 font-semibold">
                        <span>{total.toFixed(2)}</span>
                        <span>MDL</span>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {!discount && (
                        <div className="flex gap-2">
                            <Input
                                className="py-4 md:py-6 rounded-full text-sm md:text-base"
                                placeholder={t("promo")}
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                            />
                            <Button
                                className="bg-[#F5A3B7] hover:bg-[#eb92a8] active:bg-[#faaabe] rounded-full py-4 md:py-6 text-sm md:text-base"
                                onClick={handleApplyDiscount}
                                disabled={loading}
                            >
                                {loading ? t("applying") : t("apply")}
                            </Button>
                        </div>
                    )}
                    {discount && (
                        <Button
                            className="bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-full py-4 md:py-6 text-sm md:text-base"
                            onClick={removeDiscount}
                        >
                            {t("removeDiscount")}
                        </Button>
                    )}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Link href="/checkout" locale={locale} className="w-full">
                        <Button className="bg-[#F5A3B7] hover:bg-[#eb92a8] active:bg-[#faaabe] rounded-full py-6 w-full">
                            {t("goCheckout")}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
