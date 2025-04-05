import { Trash2 } from "lucide-react"
import { useCartStore } from "../../useCartStore"
import { motion } from "motion/react"

interface Props {
    color: string,
    id: string
}

const RemoveItem = ({ color, id }: Props) => {
    const removeItem = useCartStore((state) => state.removeFromCart)

    const handleRemove = (id: string) => {
        removeItem(id);
    }

    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
        >
            <Trash2 color={color} className="cursor-pointer" onClick={() => handleRemove(id)} />
        </motion.div>
    )
}

export default RemoveItem;