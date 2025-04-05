import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { BadgeX } from 'lucide-react';
import SendHome from "../../(clean)/checkout/components/SendHome";

const FailedDialog = ({ title, description }: { title: string, description: string }) => {
    return (
        <DialogContent className=" sm:max-w-[500px]">
            <DialogHeader>
                <BadgeX className="w-16 h-16 text-red-600 mx-auto" />
                <DialogTitle className="text-red-600 font-semibold text-lg text-center">{title}</DialogTitle>
                <DialogDescription className="text-center">
                    {description}
                </DialogDescription>
            </DialogHeader>
            <DialogFooter >
                <SendHome />
            </DialogFooter>
        </DialogContent>
    )
}

export default FailedDialog