import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { BadgeCheck } from 'lucide-react';
import SendHome from "../../(clean)/checkout/components/SendHome";

const SuccessDialog = ({ title, description }: { title: string, description?: string }) => {
    return (
        <DialogContent className=" sm:max-w-[500px]">
            <DialogHeader>
                <BadgeCheck className="w-16 h-16 text-green-600 mx-auto" />
                <DialogTitle className="text-green-600 font-semibold text-lg text-center">{title}</DialogTitle>
                {description &&
                    <DialogDescription className="text-center">
                        {description}
                    </DialogDescription>
                }
            </DialogHeader>
            <DialogFooter >
                <SendHome />
            </DialogFooter>
        </DialogContent>
    )
}

export default SuccessDialog