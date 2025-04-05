import { UseFormReturn } from "react-hook-form";
import { ContactFormValues } from "./ContactSchema";

import {
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
interface Props {
    form: UseFormReturn<ContactFormValues>;
    name: "name" | "secondName" | "email" | "phone" | "message";
    type: string;
    placeholder: string;
    columns: 1 | 2;
}

const ContactInput = ({ form, name, type, placeholder, columns }: Props) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem
                    className={`${columns === 1 ? 'col-span-1' : 'col-span-2'}`}>
                    <FormControl>
                        {name === "message" ? (
                            <Textarea
                                placeholder={placeholder}
                                className="w-full px-2 py-2 md:px-4 text-sm md:text-base"
                                {...field}
                            />
                        ) : (
                            <Input
                                type={type}
                                placeholder={placeholder}
                                className="w-full px-2 py-6 md:px-4 md:py-8 text-sm md:text-base"
                                {...field}
                            />
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default ContactInput;