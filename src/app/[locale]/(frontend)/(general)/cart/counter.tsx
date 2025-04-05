import { Minus, Plus } from 'lucide-react';
import { useCartStore } from '../../useCartStore';
import { motion } from 'motion/react';

interface Props {
    quantity: number;
    item: Item
}

type Item = {
    productId: string;
    name: string;
    price: number;
    comparePrice: number | null;
    quantity: number;
    img: string | null
    imgWidth: number | null,
    imgHeight: number | null
}

const Counter = ({ quantity, item }: Props) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
    return (
        <div className="bg-gray-300 rounded-full p-2 grid grid-cols-3 items-center gap-2">
            <motion.div
                whileTap={{ scale: 1.2 }}
                onClick={() => decreaseQuantity(item)}
            >
                <Minus className='cursor-pointer' />
            </motion.div>
            <span className="text-center pointer-events-none select-none">{quantity}</span>
            <motion.div
                whileTap={{ scale: 1.2 }}
                onClick={() => addToCart(item)}
            >
                <Plus className='cursor-pointer' />
            </motion.div>
        </div>
    )
}

export default Counter;