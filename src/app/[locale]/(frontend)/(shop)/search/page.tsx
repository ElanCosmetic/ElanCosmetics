'use client'
import { Product, User } from '@/payload-types';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import ProductCard from '../../components/productList/ProductCard';
import CheckUser from '@/app/utils/CheckUser';
import { useLocale } from 'next-intl';
const Page = () => {
    const locale = useLocale()
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [wishlist, setWishlist] = useState<Product[] | null>(null);

    const searchParams = useSearchParams();
    const query = searchParams.toString(); // Extracts the full query string

    const handleWishlistUpdate = (updatedWishlist: Product[]) => {
        setWishlist(updatedWishlist); // No need to filter again, just update state
    };

    useEffect(() => {
        const FetchWishlist = async () => {
            const response = await CheckUser();
            if (response) {
                setUser(response);
                setWishlist(Array.isArray(response.wishlist) ? response.wishlist.filter((item): item is Product => typeof item !== 'string') : []);
            }
        };

        const fetchResults = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/products?${query}`);
                const data = await res.json();
                setResults(data.docs);
            } catch (error) {
                console.log(error);
                setResults([]);
            }
            setLoading(false);
        };

        fetchResults();
        FetchWishlist();
        setLoading(false);
    }, [query]);


    return (
        <div className="text-gray-700 px-3 md:px-10 py-5">
            {loading ?
                <div>se incarca</div> :
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {results && results.length > 0 && results.map((result, index) => (
                        <ProductCard
                            key={index}
                            locale={locale}
                            product={result}
                            user={user}
                            wishlist={wishlist}
                            onWishlistUpdate={handleWishlistUpdate}
                        />
                    ))}
                </div>}
        </div>
    )
};

export default Page;