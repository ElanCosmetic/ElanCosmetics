import { useTranslations } from "next-intl"

interface Props {
    minPrice: number,
    setMinPrice: (price: number) => void,
    maxPrice: number,
    setMaxPrice: (price: number) => void,
}

const PriceFilter = ({ minPrice, maxPrice, setMinPrice, setMaxPrice }: Props) => {
    const t = useTranslations('CollectionPage.filters');
    return (
        <>
            <label className="text-sm">{t('minPrice')}</label>
            <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="border p-2 rounded"
            />
            <label className="text-sm">{t('maxPrice')}</label>
            <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="border p-2 rounded"
            />
        </>
    )
}

export default PriceFilter