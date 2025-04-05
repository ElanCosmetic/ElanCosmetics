'use client'
import ProductCard from "./ProductCard";
import 'swiper/css';
import 'swiper/css/free-mode';
import { Swiper, SwiperSlide } from "swiper/react";
import { Product } from "@/payload-types";
import { User } from "@/payload-types";
import { useState, useEffect } from "react";
import CheckUser from "@/app/utils/CheckUser";
interface Props {
    products: Product[],
    locale: string,
}
const ProductListSwiper = ({ products, locale }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [wishlist, setWishlist] = useState<Product[] | null>(null);

    useEffect(() => {
        const FetchData = async () => {
            const response = await CheckUser();
            if (response) {
                setUser(response);
                setWishlist(Array.isArray(response.wishlist) ? response.wishlist.filter((item): item is Product => typeof item !== 'string') : []);
            }
        };

        FetchData();
    }, []);

    const handleWishlistUpdate = (updatedWishlist: Product[]) => {
        setWishlist(updatedWishlist); // No need to filter again, just update state
    };


    return (
        <div>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={30}
            >
                {products.map((product, index) => (
                    <SwiperSlide key={index} style={{ width: "auto", height: "auto" }}>
                        <ProductCard
                            product={product}
                            locale={locale}
                            user={user}
                            wishlist={wishlist}
                            onWishlistUpdate={handleWishlistUpdate}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default ProductListSwiper;