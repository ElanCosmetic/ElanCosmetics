import { Contact } from "@/payload-types";
import RichText from "@/blocks/richtext/Server";
import FacebookIcon from "../../components/Icons/FacebookIcon";
import InstagramIcon from "../../components/Icons/InstagramIcon";
import TiktokIcon from "../../components/Icons/TiktokIcon";
import Link from "next/link";
type ContactAddressProps = {
    contact: Contact['contacts'][0];
};

const ContactAddress = ({ contact }: ContactAddressProps) => {
    return (
        <div className="flex flex-col gap-2 w-fit h-fit">
            <h3 className="text-sm font-semibold">{contact.title}</h3>
            <div className="flex flex-col gap-2">
                {contact.type === 'richtext' && contact.richtext ?
                    <RichText className="text-xs" data={contact.richtext} />
                    :
                    contact.type === 'link' && contact.links && contact.links?.length > 0 ?
                        contact.links.map((link, index) => (
                            <Link key={index} href={link.url} target="_blank" className="flex gap-2 items-center group">
                                {link.type === 'facebook' && <div className="w-4"><FacebookIcon color="#838383" /></div>}
                                {link.type === 'instagram' && <div className="w-4"><InstagramIcon color="#838383" /></div>}
                                {link.type === 'tiktok' && <div className="w-4"><TiktokIcon color="#838383" /></div>}
                                <span className="text-xs group-hover:underline">{link.label}</span>
                            </Link>
                        )) : null
                }
            </div>
        </div>
    )
}

export default ContactAddress;