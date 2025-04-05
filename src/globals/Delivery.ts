import type { GlobalConfig } from "payload";

export const DeliveryGlobal: GlobalConfig = {
    slug: 'delivery',
    label: "Taxa de livrare",
    fields: [
        {
            name: 'tax',
            label: 'taxa',
            type: 'number',
            defaultValue: 0
        }
    ]
}