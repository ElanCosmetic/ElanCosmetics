'use client';
import { useCartStore } from "../../useCartStore";
import CheckoutItem from "./components/CheckoutItem";
import { useTranslations } from "next-intl";

interface DiscountType {
    value: number;
    type: "fixed" | "percent";
}

const CheckoutSummary = ({ discount, delivery }: { discount: DiscountType | null, delivery: number }) => {
    const items = useCartStore((state) => state.items);
    const t = useTranslations("CheckoutPage");

    // Calculate subtotal
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Calculate discount amount
    const discountAmount = discount
        ? discount.type === "percent"
            ? (subtotal * discount.value) / 100
            : discount.value
        : 0;

    let total = subtotal - discountAmount;
    if (total < 500) total += delivery; // Add delivery fee if total is less than 500 MDL

    return (
        <div className="border border-gray-300 text-gray-700 p-5 rounded-2xl h-fit flex flex-col gap-10 max-h-[450px] md:max-h-none overflow-y-auto">
            <div className="flex flex-col gap-3">
                {items.map((item, index) => (
                    <CheckoutItem key={index} item={item} />
                ))}
            </div>
            <div>
                <div className="flex justify-between items-baseline text-lg">
                    <span className="font-semibold">{t('summary.subtotal')}</span>
                    <span className="font-semibold">{subtotal.toFixed(2)} MDL</span>
                </div>
                <div className="flex justify-between items-baseline text-md">
                    <span>{t('summary.delivery')}</span>
                    <span>{delivery} MDL</span>
                </div>
                {discount && (
                    <div className="flex justify-between items-baseline text-base text-green-600">
                        <span className="font-semibold">{t('summary.discountApplied')}</span>
                        <span className="font-semibold">
                            {discount.type === "percent"
                                ? `-${discount.value}%`
                                : `-${discount.value} MDL`}
                        </span>
                    </div>
                )}
                <div className="flex justify-between items-baseline text-xl font-semibold mt-4">
                    <span>{t('summary.total')}</span>
                    <span>{total.toFixed(2)} MDL</span>
                </div>
            </div>
        </div>
    );
}

export default CheckoutSummary;
