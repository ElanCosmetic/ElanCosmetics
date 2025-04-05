import type { GlobalConfig } from "payload";
import ProductListBlock from "@/blocks/productList/productList";

export const ProductPageGlobal: GlobalConfig = {
    slug: 'productPage',
    label: "Pagina de produs",
    fields: [
        {
            name: 'layout',
            type: 'blocks',
            blocks: [ProductListBlock],
            required: true,
        }
    ]
}