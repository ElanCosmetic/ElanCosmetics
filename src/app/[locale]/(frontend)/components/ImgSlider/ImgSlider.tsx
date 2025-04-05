'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import PrevSlide from '../navigationIcons/prevSlide';
import NextSlide from '../navigationIcons/nextSlide';

import 'swiper/css';

import ImgSlide from './ImgSlide';

import { Homepage } from '@/payload-types';

type ImgSliderBlock = Extract<Homepage['Layout'][number], { blockType: 'imgslider' }>;
type Slides = ImgSliderBlock['slides'];

interface ImgSliderProps {
    slides: Slides;
    locale: string;
}

const ImgSlider = ({ slides, locale }: ImgSliderProps) => {
    return (
        <div className='flex flex-col gap-3 md:gap-6'>
            <div className='max-h-[1000px] overflow-hidden'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    speed={800}
                    loop={true}
                    autoHeight={true}
                    pagination={{
                        el: ".swiper-pagination",
                        type: "bullets",
                        clickable: true,
                        bulletClass: "swiper-bullet",
                        bulletActiveClass: "active",
                    }}
                    autoplay={{
                        delay: 4000
                    }}
                    navigation={{
                        nextEl: '.next-slide',
                        prevEl: '.prev-slide',
                    }}
                    modules={[Pagination, Navigation, Autoplay]}
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <ImgSlide
                                locale={locale}
                                img={slide.img}
                                linkType={slide.linkType}
                                internalLink={slide.internalLink}
                                externalUrl={slide.externalUrl}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className='relative w-full flex justify-center items-center'>
                <div className='flex gap-3 md:gap-4 items-center'>
                    <div className="prev-slide cursor-pointer">
                        <PrevSlide />
                    </div>
                    <div className="swiper-pagination"></div>
                    <div className='next-slide cursor-pointer'>
                        <NextSlide />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImgSlider;
