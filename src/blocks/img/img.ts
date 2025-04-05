import type { Block } from "payload";

const ImgBlock: Block = {
    slug: 'imgblock',
    fields: [
        {
            name: 'img',
            type: 'upload',
            relationTo: 'media',
            required: true
        }
    ]
}

export default ImgBlock;