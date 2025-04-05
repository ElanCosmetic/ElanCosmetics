import { StaticImageData } from "next/image";

export default interface FeaturedCategoryProps {
    id: number,
    img: StaticImageData,
    url: string
}