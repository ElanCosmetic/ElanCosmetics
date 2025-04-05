"use client";
import { stringify } from 'qs-esm'
import type { Where } from 'payload'
import { Link } from '@/i18n/navigation';

import { Product } from "@/payload-types";
import { useState, useEffect } from "react";

import SearchItem from './SearchItem';
import { useLocale, useTranslations } from 'next-intl';

const SearchResults = ({ word, onItemClick }: { word: string, onItemClick: () => void }) => {
    const t = useTranslations('Searchbar')
    const locale = useLocale();
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    const isNumeric = /^\d+$/.test(word);

    // Build the query conditionally
    const query: Where = isNumeric
        ? { productCode: { equals: word } } // Exact match for numbers
        : {
            title: { contains: word },
        };


    const stringifiedQuery = stringify(
        {
            where: query,
            limit: 12
        },
        { addQueryPrefix: true },
    )

    useEffect(() => {
        const fetchResults = async () => {
            if (word.length < 2) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                const res = await fetch(`/api/products${stringifiedQuery}`);
                const data = await res.json();
                setResults(data.docs);
            } catch (error) {
                console.log(error);
                setResults([]);
            }
            setLoading(false);
        };

        fetchResults();
    }, [word]);

    return (
        <div className="text-gray-700 w-full bg-white p-5 rounded-md grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 gap-y-10 md:gap-5 overflow-y-auto max-h-[500px]">
            {loading ? (
                <div>{t('loading')}</div>
            ) : results && results.length > 0 ? (
                results.map((doc: Product, index) =>
                    <div key={index}>
                        <SearchItem locale={locale} product={doc} onItemClick={onItemClick} />
                    </div>)
            ) : (
                <div>{t('noresults')}</div>
            )}

            {
                loading ? null : results && results.length == 12 ? (
                    <Link locale={locale} href={`/search/${stringifiedQuery}`} onClick={() => onItemClick()} className='col-span-4 text-center hover:underline'>
                        {t('seeMore')}
                    </Link>
                ) : null
            }
        </div>
    );
};

export default SearchResults;
