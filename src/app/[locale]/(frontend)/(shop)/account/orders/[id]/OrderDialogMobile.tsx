import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Order } from "@/payload-types";
import { useTranslations } from "next-intl";
interface Props {
    order: Order,
    selectedOrder: Order | null,
    setSelectedOrder: React.Dispatch<React.SetStateAction<Order | null>>;
}

const OrderDialogMobile = ({ order, selectedOrder, setSelectedOrder }: Props) => {
    const t = useTranslations('Order')
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-3 w-full" variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                    {t('productInfo.viewDetails')}
                </Button>
            </DialogTrigger>
            {selectedOrder && selectedOrder.orderNumber === order.orderNumber && (
                <DialogContent className="max-w-lg sm:max-w-sm w-full text-gray-700">
                    <DialogHeader>
                        <DialogTitle>{t('order')} - #{selectedOrder.orderNumber}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        {selectedOrder.items.map((item, index) => {
                            if (typeof item.product === 'string') return null;
                            return (
                                <div key={index} className="bg-white p-2 rounded-lg shadow-md grid grid-cols-[auto_1fr] text-sm">
                                    <div className="w-14 p-1 bg-white rounded-lg overflow-hidden">
                                        {typeof item.product !== 'string' && typeof item.product.featuredImg !== 'string' ? (
                                            <Image
                                                src={item.product.featuredImg.url ? item.product.featuredImg.url : ''}
                                                alt={item.product.featuredImg.alt}
                                                width={item.product.featuredImg.width || 100}
                                                height={item.product.featuredImg.height || 100}
                                            />
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-col items-baseline line-clamp-2">
                                            <span className="text-sm text-nowrap">{t('productInfo.title')}:</span>
                                            <span className="text-xs">{item.product.title}</span>
                                        </div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-sm">{t('productInfo.quantity')}:</span>
                                            <span className="text-xs">{item.quantity}</span>
                                        </div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-sm">{t('productInfo.price')}:</span>
                                            <span className="text-xs">{item.product.price}MDL</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </DialogContent>
            )}
        </Dialog>
    )
}

export default OrderDialogMobile;