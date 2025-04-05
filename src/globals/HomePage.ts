import type { GlobalConfig } from "payload";
import ProductListBlock from "@/blocks/productList/productList";
import ImgSliderBlock from "@/blocks/ImgSlider/ImgSlider";
import GeneralBigCategories from "@/blocks/GeneralBigCategories/GeneralBigCategories";

export const HomePage: GlobalConfig = {
    slug: 'homepage',
    label: "pagina principala",
    fields: [
        {
            name: 'Layout',
            type: 'blocks',
            blocks: [ProductListBlock, ImgSliderBlock, GeneralBigCategories],
            required: true,
        },
    ],

}