import ContactAddress from "./ContactAddress";
import payload from "@/queries"

const ContactAdrese = async ({ locale }: { locale: string }) => {
    const contact = await payload.findGlobal({
        'slug': 'contact',
        locale: locale as 'ro' | 'ru' || 'all'
    })
    return (
        <div className="grid grid-cols-2 gap-14 lg:gap-20 w-fit h-fit">
            {contact.contacts.map((contact, index) => (
                <ContactAddress key={index} contact={contact} />
            ))}
        </div>
    )
}

export default ContactAdrese;