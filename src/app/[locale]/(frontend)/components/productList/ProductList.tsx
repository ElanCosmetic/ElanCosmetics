import { Product } from "@/payload-types";
import { Collection } from "@/payload-types";
import { Suspense } from "react";
import { Link } from "@/i18n/navigation";

interface ProductListProps {
    category: string | Collection,
    title: string,
    locale: string,
}

import 'swiper/css';
import 'swiper/css/free-mode';
import ProductListSwiper from "./ProductListSwiper";
import { useTranslations } from "next-intl";

const ProductList: React.FC<ProductListProps> = ({ category, title, locale }) => {
    const t = useTranslations('ProductList');
    if (typeof category == 'string') return null
    const products: Product[] = Array.isArray(category.products) && typeof category !== 'string' ? category.products.filter((product): product is Product => typeof product !== 'string') : [];

    return (
        <div className="mx-auto max-w-[1400px] w-full px-5 md:px-4 overflow-hidden">
            <div className="flex flex-col gap-5 lg:gap-10 max-w-full text-gray-700">
                <div className="flex flex-col gap-3">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center uppercase">{title}</div>
                    <Link href={`/collection/${category.id}`} locale={locale} className="text-center text-base md:tex-xl lg:text-2xl hover:underline">{t('seeMore')}</Link>
                </div>
                {products.length > 0 ? (
                    <Suspense fallback={<div>{t('loading')}</div>}>
                        <ProductListSwiper
                            locale={locale}
                            products={products}
                        />
                    </Suspense>
                ) : (
                    <div className="text-center text-gray-500">{t('noProducts')}</div>
                )
                }
            </div>
        </div>
    )
}

export default ProductList;