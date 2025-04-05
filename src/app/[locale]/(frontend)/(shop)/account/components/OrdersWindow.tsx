import { Button } from "@/components/ui/button"
import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog"

import payload from "@/queries"

import { Order } from "@/payload-types"
import { Product } from "@/payload-types"

const OrdersWindow = async ({ id }: { id: string | undefined }) => {
    const orders: Order[] = []
    if (id) {
        const result = await payload.find({
            collection: 'orders',
            where: {
                customer: {
                    equals: id
                }
            }
        })

        result.docs.map((doc) => orders.push(doc));
    }
    return (
        <DialogContent className="md:max-w-[600px] max-h-[500px] overflow-y-scroll">
            <DialogHeader>
                <DialogTitle>Orders</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-5">
                {orders && orders.length > 0 ?
                    <div className="flex flex-col gap-5">
                        {orders.map((order, index) => (
                            <div key={index} className="flex flex-col gap-2 text-gray-500 border border-gray-300 p-2 rounded-lg">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-lg">Order nr.</span>
                                    <span className="font-semibold">{order.orderNumber}</span>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-lg">Products:</p>
                                    {typeof order.items !== 'string' && order.items.map((item: { product: string | Product; quantity: number; totalPrice: number; }, index) => (
                                        <div key={index} className="flex items-baseline justify-between gap-5 text-sm">
                                            <div>
                                                <span className="max-w-10 truncate">{typeof item.product === 'string' ? item.product : item.product.title}</span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between gap-2 items-baseline">
                                                    <span>price:</span>
                                                    <span>{item.totalPrice}</span>
                                                </div>
                                                <div className="flex justify-between gap-2 items-baseline">
                                                    <span>quantity:</span>
                                                    <span>{item.quantity}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-lg">Created:</span>
                                    <span>{order.createdAt}</span>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-lg">Status:</span>
                                    <span>{order.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <div>
                        <span className="text-gray-700">At the moment there are no orders</span>
                    </div>
                }
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button>Close</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}

export default OrdersWindow;