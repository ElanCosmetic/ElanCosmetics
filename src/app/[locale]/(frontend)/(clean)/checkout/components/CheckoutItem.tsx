interface CartItem {
    productId: string;
    name: string;
    price: number;
    comparePrice: number | null;
    quantity: number;
    img: string | null;
    imgWidth: number | null;
    imgHeight: number | null;
}

interface Props {
    item: CartItem;
}

import Image from "next/image";
const CheckoutItem = ({ item }: Props) => {
    return (
        <div className="flex md:items-center justify-between gap-8 lg:gap-20 text-gray-700">
            <div className="flex items-center gap-4 ">
                <div className="relative">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white p-1">
                        {item.img && (
                            <Image
                                src={item.img}
                                alt={item.name}
                                width={item.imgWidth || 80}
                                height={item.imgHeight || 80}
                                className="w-full h-full object-contain object-center"
                            />
                        )}
                    </div>
                    <div className="w-6 h-6 bg-gray-400 rounded-full absolute -top-1 -right-1 flex items-center justify-center">
                        <span className="text-sm">{item.quantity}</span>
                    </div>
                </div>
                <div className="hidden md:inline-block font-semibold ">
                    <span className="line-clamp-2 text-sm sm:text-base">{item.name}</span>
                </div>
            </div>
            <div className="flex flex-col justify-between gap-1 flex-1 md:flex-auto text-nowrap">
                <div className="line-clamp-2 text-wrap text-sm md:hidden">
                    {item.name}
                </div>
                {
                    item.comparePrice ?
                        <div className="text-right">
                            <div className="line-through text-red-500 text-sm md:text-base">{item.comparePrice} MDL</div>
                            <div className="text-base md:text-lg font-semibold">{item.price} MDL</div>
                        </div>
                        :
                        <div className="text-base md:text-lg text-right">{item.price} MDL</div>
                }
            </div>
        </div>
    )
}

export default CheckoutItem;