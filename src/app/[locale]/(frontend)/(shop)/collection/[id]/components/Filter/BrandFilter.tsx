import React from 'react';
import BrandType from '@/app/[locale]/(frontend)/types/BrandType';
import { useTranslations } from 'next-intl';
interface BrandFilterProps {
    brands: BrandType[]; // List of unique volume IDs
    selectedBrands: BrandType[];
    setSelectedBrands: React.Dispatch<React.SetStateAction<BrandType[]>>;
}

const BrandFilter = ({ brands, selectedBrands, setSelectedBrands }: BrandFilterProps) => {
    const t = useTranslations("CollectionPage.filters");
    const handleCheckboxChange = (brand: BrandType) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter((id) => id !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    if (brands.length === 0) return null;

    return (
        <div className="">
            <h3 className="font-semibold mb-2">{t('byBrand')}</h3>
            <div className="flex flex-col gap-2">
                {brands.map((brand, index) => (
                    <label key={index} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={selectedBrands.some((v) => v.id === brand.id)}
                            onChange={() => handleCheckboxChange(brand)}
                            className="cursor-pointer"
                        />
                        <span>{brand.slug}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default BrandFilter;
