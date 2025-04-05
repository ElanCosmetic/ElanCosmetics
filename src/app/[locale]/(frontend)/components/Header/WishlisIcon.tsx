'use client'
import { Link } from '@/i18n/navigation';
import { Heart } from 'lucide-react';

const WishlistIcon = ({ locale }: { locale: string }) => {

    return (
        <div className="relative hidden md:block">
            <Link href={'/wishlist'} locale={locale}>
                <Heart strokeWidth={1.5} />
            </Link>
        </div>
    )
}

export default WishlistIcon;