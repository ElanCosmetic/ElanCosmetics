import Logo from "../Icons/Logo";
import { Link } from "@/i18n/navigation";
import payload from "@/queries";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import Subheader from "../Subheader";
import Megamenu from "./Megamenu";

import { Menu } from "lucide-react";
import { UserRound } from 'lucide-react';
import ShoppingBagIcon from "./ShoppingBagIcon";

import SearchBar from "../SearchBar/SearchBar";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import WishlistIcon from "./WishlisIcon";

const Header = async ({ params }: { params: Promise<{ locale: string }> }) => {

    const { locale } = await params;
    const header = await payload.findGlobal({
        slug: 'header',
        locale: locale as 'ro' | 'ru' || 'ro'
    })

    return (
        <Sheet>
            <Megamenu items={header.menuItems} locale={locale} />
            {header.upperHeader ?
                <Subheader>
                    {header.upperHeader}
                </Subheader>
                : null}
            <div className="py-4 px-6 md:py-6 md:px-10 bg-white shadow-bottom">
                <div className="grid grid-cols-3 w-full items-center h-fit">
                    <SheetTrigger asChild className="w-fit">
                        <Button variant="ghost" className="p-2">
                            <Menu className="w-8 h-8" color="#374151" />
                        </Button>
                    </SheetTrigger>
                    <Link href="/" className="flex justify-center mx-auto">
                        <Logo width={100} color="#374151" />
                    </Link>
                    <div className="flex gap-5 items-center justify-end text-gray-700">
                        <SearchBar />
                        <Link href='/account'
                            locale={locale}
                            className="hidden md:block">
                            <UserRound strokeWidth={1.5} />
                        </Link>
                        <WishlistIcon locale={locale} />
                        <ShoppingBagIcon locale={locale} />
                        <LanguageSelector className="hidden md:block" />
                    </div>
                </div>
            </div>
        </Sheet>
    )
}

export default Header;