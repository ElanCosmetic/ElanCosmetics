'use client'
import { useState } from "react";
import CollectionSelector from "./CollectionSelector";
import FilterWindow from "./Filter/FilterWindow";
import GridProducts from "./GridProducts";
import VolumeType from "@/app/[locale]/(frontend)/types/VolumeType";
import BrandType from "@/app/[locale]/(frontend)/types/BrandType";

interface Props {
    locale: string,
    data: {
        id: string
        title: string
    }
    id: number
}

const CollectionBody = ({ locale, data, id }: Props) => {
    const [sortType, setSortType] = useState<'ascending' | 'descending'>('ascending');
    const [priceFilter, setPriceFilter] = useState<{ min: number; max: number } | null>(null);
    const [volumes, setVolumes] = useState<VolumeType[]>([]);
    const [selectedVolumes, setSelectedVolumes] = useState<VolumeType[]>([]);
    const [brands, setBrands] = useState<BrandType[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<BrandType[]>([]);

    return (
        <>
            <div className="flex justify-between flex-wrap gap-5 items-baseline text-gray-700">
                <h1 className="font-semibold text-3xl">{data.title}</h1>
                <CollectionSelector sort={sortType} setSortType={setSortType} />
            </div>
            <div className="grid gap-5 grid-cols-1 lg:grid-cols-[auto_1fr] 2xl:grid-cols-[300px_1fr]">
                <FilterWindow
                    onApplyFilters={(min, max) => setPriceFilter({ min, max })}
                    volumes={volumes}
                    selectedVolumes={selectedVolumes}
                    setSelectedVolumes={setSelectedVolumes}
                    brands={brands}
                    selectedBrands={selectedBrands}
                    setSelectedBrands={setSelectedBrands}
                />
                <GridProducts
                    id={id}
                    locale={locale}
                    sort={sortType}
                    priceFilter={priceFilter}
                    volumes={volumes}
                    setVolumes={setVolumes}
                    selectedVolumes={selectedVolumes}
                    setSelectedVolumes={setSelectedVolumes}
                    brands={brands}
                    setBrands={setBrands}
                    selectedBrands={selectedBrands}
                    setSelectedBrands={setSelectedBrands}
                />
            </div>
        </>
    )
}

export default CollectionBody;