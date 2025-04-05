import { StaticImageData } from "next/image";

export default interface ProductCardType {
    id: number,
    title: string,
    price: number
    img: StaticImageData,
    url: string
}