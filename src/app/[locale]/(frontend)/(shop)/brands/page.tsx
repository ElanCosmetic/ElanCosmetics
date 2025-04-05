'use client'
import { useState, useEffect } from "react"
import { Link } from "@/i18n/navigation"
import PageTitle from "../../components/PageTitle"
import { useTranslations } from "next-intl"

type Collection = {
    id: string
}

type Brand = {
    id: string,
    slug: string,
    associated_collection: Collection | null
}

const Brands = () => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(false);
    const t = useTranslations('Brands')

    useEffect(() => {
        const FetchBrands = async () => {
            const response = await fetch('/api/brand?sort=slug&depth=1&limit=500&fields=id', {
                method: "GET",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },

            })

            if (response.ok) {
                const data = await response.json()
                data.docs.map((brand: Brand) => setBrands((element) => [...element, brand]))
            }

            setLoading(false);
        }

        FetchBrands()
    }, [])

    return <div className="flex flex-col gap-5 container px-5 lg:px-10 py-6 mx-auto w-full text-gray-700">
        <PageTitle title={t('title')} />
        {
            loading ? <div>{t('loading')}</div> :
                brands.length > 0 ?
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {brands.map((brand, index) => (
                            (brand.associated_collection ?
                                <Link href={`/collection/${brand.associated_collection.id}`} locale="ro" key={index} className="hover:underline">
                                    {brand.slug}
                                </Link> :
                                <span key={index}>{brand.slug}</span>
                            )
                        ))}
                    </div>
                    : <div>{t('noBrands')}</div>
        }
    </div>
}

export default Brands