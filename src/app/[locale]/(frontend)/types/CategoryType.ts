import { StaticImageData } from "next/image";

export default interface CategoryProps {
    id: number,
    title: string,
    img: StaticImageData,
    url: string
}