import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"


interface Props {
    //@ts-ignore
    form: UseFormReturn<any>,
    name: string,
    type: string,
    label: string
}

const InputField = ({ form, name, type, label }: Props) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="w-full">
                    <FormLabel className='text-gray-700'>{label} <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                        <Input type={type} placeholder='' className='text-gray-700 w-full ' {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default InputField;