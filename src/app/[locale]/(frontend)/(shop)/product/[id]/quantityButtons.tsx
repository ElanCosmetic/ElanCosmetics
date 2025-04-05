import { motion } from "motion/react";
import { Minus, Plus } from 'lucide-react';

const QuantityButtons = ({ quantity, setQuantity }: { quantity: number, setQuantity: (quantity: number) => void }) => {
    return (
        <div className="grid grid-cols-3 p-2 rounded-md border border-gray-300 gap-2 text-gray-700">
            <motion.div
                whileTap={{ scale: 1.2 }}
                onClick={() => {
                    if (quantity > 1) {
                        setQuantity(quantity - 1);
                    }
                }}
            >
                <Minus className='cursor-pointer' strokeWidth={1.5} />
            </motion.div>
            <span className="text-center pointer-events-none select-none">{quantity}</span>
            <motion.div
                whileTap={{ scale: 1.2 }}
                onClick={() => setQuantity(quantity + 1)}
            >
                <Plus className='cursor-pointer' strokeWidth={1.5} />
            </motion.div>
        </div>
    )
}

export default QuantityButtons;