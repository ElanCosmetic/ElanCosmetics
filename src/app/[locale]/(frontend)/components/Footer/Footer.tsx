import Logo from "../Icons/Logo";
import payload from "@/queries";

import FooterLinks from "./FooterLinks";
import FooterLinksMobile from "./FooterLinksMobile";
import Link from "next/link";
import Credentials from "./Credentials";

const Footer = async ({ locale }: { locale: string }) => {
    const result = await payload.findGlobal({
        slug: "footer",
        locale: locale as 'ro' | 'ru' || 'all'
    });

    return (
        <div className="bg-gray-700 flex justify-center items-center p-4 py-10">
            <div className="flex flex-col gap-10 md:gap-20 items-center">
                <Link href="/">
                    <Logo width={120} color="#fff" />
                </Link>
                <FooterLinks footer={result} locale={locale} />
                <FooterLinksMobile footer={result} locale={locale} />
                <Credentials />
            </div>
        </div>
    );
};

export default Footer;
