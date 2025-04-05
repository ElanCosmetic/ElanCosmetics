'use client'
import CategoryProps from "../../types/CategoryType";
import { Swiper, SwiperSlide } from "swiper/react"
import CategoryCard from "./CategoryCard";
import { FreeMode } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/free-mode';

interface CategoriesCarouselProps {
    data: CategoryProps[]
}

const CategoriesCarousel: React.FC<CategoriesCarouselProps> = ({ data }) => {
    const slidesPerViewValue = data.length > 5 ? 'auto' : 4;

    return (
        <Swiper
            spaceBetween={30}
            slidesPerView={slidesPerViewValue}
            freeMode={true}
            modules={[FreeMode]}
        >
            {data.map((category) => (
                <SwiperSlide key={category.id}
                    style={{ width: "auto" }}>
                    <CategoryCard id={category.id} img={category.img} title={category.title} url={category.url} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default CategoriesCarousel;