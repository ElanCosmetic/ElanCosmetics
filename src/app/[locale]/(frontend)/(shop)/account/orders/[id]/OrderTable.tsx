"use client";

import { Order } from "@/payload-types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

import OrderDialogDesktop from "./OrderDialogDesktop";
import OrderDialogMobile from "./OrderDialogMobile";
import { useTranslations } from "next-intl";

const OrderTable = ({ orders }: { orders: Order[] }) => {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const t = useTranslations('Order');
    return (
        <div className="w-full">
            {/* Scrollable Table for Desktop */}
            <div className="hidden md:block overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('order')} #</TableHead>
                            <TableHead>{t('status.title')}</TableHead>
                            <TableHead>{t('date')}</TableHead>
                            <TableHead>{t('totalItems')}</TableHead>
                            <TableHead className="text-right">{t('total')}</TableHead>
                            <TableHead className="text-right">{t('productInfo.title')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.orderNumber}>
                                <TableCell className="font-medium">{`#${order.orderNumber}`}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            order.status === "pending"
                                                ? "secondary"
                                                : order.status === "shipped"
                                                    ? "default"
                                                    : order.status === "delivered"
                                                        ? "outline"
                                                        : "destructive"
                                        }
                                    >
                                        {
                                            order.status === 'pending' ? t('status.pending')
                                                : order.status === 'shipped' ? t('status.shipped')
                                                    : order.status === 'delivered' ? t('status.delivered')
                                                        : t('status.cancelled')
                                        }
                                    </Badge>
                                </TableCell>
                                <TableCell>{order.createdAt.slice(0, 10)}</TableCell>
                                <TableCell>
                                    {order.items.length} {t('productInfo.product')}{order.items.length > 1 ? t('productInfo.plural') : ""}
                                </TableCell>
                                <TableCell className="text-right">{order.totalAmount.toFixed(2)} mdl</TableCell>
                                <TableCell className="text-right">
                                    <OrderDialogDesktop
                                        order={order}
                                        selectedOrder={selectedOrder}
                                        setSelectedOrder={setSelectedOrder}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile-Friendly Card Layout */}
            <div className="md:hidden space-y-4">
                {orders.map((order) => (
                    <div key={order.orderNumber} className="bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between">
                            <span className="font-medium text-lg">{`#${order.orderNumber}`}</span>
                            <Badge
                                variant={
                                    order.status === "pending"
                                        ? "secondary"
                                        : order.status === "shipped"
                                            ? "default"
                                            : order.status === "delivered"
                                                ? "outline"
                                                : "destructive"
                                }
                            >
                                {
                                    order.status === 'pending' ? t('status.pending')
                                        : order.status === 'shipped' ? t('status.shipped')
                                            : order.status === 'delivered' ? t('status.delivered')
                                                : t('status.cancelled')
                                }
                            </Badge>
                        </div>
                        <p className="text-gray-500 text-sm">{order.createdAt.slice(0, 10)}</p>
                        <p className="mt-2"><strong>{order.items.length} {t('productInfo.product')}{order.items.length > 1 ? t('productInfo.plural') : ""}</strong></p>
                        <p className="mt-1"><strong>{t('total')}: </strong>{order.totalAmount.toFixed(2)} mdl</p>
                        <OrderDialogMobile
                            order={order}
                            selectedOrder={selectedOrder}
                            setSelectedOrder={setSelectedOrder}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderTable;
