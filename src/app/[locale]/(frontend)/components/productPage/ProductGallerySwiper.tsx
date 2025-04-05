'use client'
import { Product } from "@/payload-types";
type MediaType = Product['media']
import Image from "next/image";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ProductGallerySwiper = ({ media, onclick }: { media: MediaType, onclick: (url: string) => void }) => {

    return (
        <div className="text-gray-700">
            {media ?
                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={50}
                    freeMode={true}
                    speed={800}
                >
                    {media.map((element, index) => (
                        <SwiperSlide key={index} style={{ width: 100, height: 100 }} onClick={() => { if (typeof element !== 'string' && typeof element.url === 'string') onclick(element.url) }}>
                            <div className="w-full h-full rounded-lg overflow-auto cursor-pointer">
                                {typeof element !== 'string' && typeof element.url === 'string' && <Image src={element.url} alt="" width={100} height={100} className="w-full h-full" />}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper> : undefined}
        </div>
    )
}

export default ProductGallerySwiper;