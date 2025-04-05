"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import { Product } from "@/payload-types";
import { Media } from "@/payload-types";

import Image from "next/image";

type MediaType = Product["media"];

interface Props {
    featuredImg: Media;
    media: MediaType;
}

const ProductGallery = ({ featuredImg, media }: Props) => {
    const [gallery, setGallery] = useState<string[]>([]);
    //@typescript-eslint/no-explicit-any : thumbnail
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    useEffect(() => {
        const initialGallery: string[] = [];

        if (featuredImg && typeof featuredImg !== "string" && featuredImg.url) {
            initialGallery.push(featuredImg.url);
        }

        if (media) {
            media.forEach((file) => {
                if (file && typeof file !== "string" && file.url) {
                    initialGallery.push(file.url);
                }
            });
        }

        setGallery(initialGallery);
    }, [featuredImg, media]);

    return (
        <PhotoProvider>
            <div className="flex flex-col gap-5">
                {/* Swiper for Thumbnail Navigation */}
                {gallery.length > 0 && (
                    <div className="max-w-full lg:max-w-[600px] 2xl:max-w-full">
                        <Swiper
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            modules={[Navigation, Thumbs]}
                            className="main-swiper"
                        >
                            {gallery.map((item, index) => (
                                <SwiperSlide key={index} className="bg-white aspect-square rounded-lg overflow-hidden items-center text-gray-700">
                                    {item.endsWith(".mp4") ? (
                                        <video
                                            controls
                                            className="w-full rounded-lg"
                                        >
                                            <source src={item} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <PhotoView src={item}>
                                            <Image
                                                src={item}
                                                alt={`Product image ${index + 1}`}
                                                className=" object-contain object-center cursor-pointer h-full w-auto max-w-full mx-auto"
                                                width={500}
                                                height={500}
                                            />
                                        </PhotoView>
                                    )}
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Thumbnail Navigation */}
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={4}
                            watchSlidesProgress
                            modules={[Thumbs]}
                            className="thumbs-swiper mt-3"
                        >
                            {gallery.map((item, index) => (
                                <SwiperSlide key={index} className="bg-white p-1 rounded-md border border-gray-300 hover:border-black transition">
                                    <div >
                                        {item.endsWith(".mp4") ? (
                                            <video className="w-full h-20 object-cover rounded-md border border-gray-300 hover:border-black transition">
                                                <source src={item} type="video/mp4" />
                                            </video>
                                        ) : (
                                            <Image
                                                src={item}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="w-full h-20 object-contain cursor-pointer"
                                                width={100}
                                                height={100}
                                            />
                                        )}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
            </div>
        </PhotoProvider>
    );
};

export default ProductGallery;
