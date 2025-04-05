'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// filters
import PriceFilter from './PriceFilter';
import VolumeFilter from './VolumeFilter';
import BrandFilter from './BrandFilter';

// types
import VolumeType from '@/app/[locale]/(frontend)/types/VolumeType';
import BrandType from '@/app/[locale]/(frontend)/types/BrandType';

// UI
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FilterWindowProps {
    onApplyFilters: (minPrice: number, maxPrice: number) => void;
    volumes: VolumeType[];
    selectedVolumes: VolumeType[];
    setSelectedVolumes: React.Dispatch<React.SetStateAction<VolumeType[]>>;
    brands: BrandType[];
    selectedBrands: BrandType[];
    setSelectedBrands: React.Dispatch<React.SetStateAction<BrandType[]>>;
}

const FilterWindow = ({
    onApplyFilters,
    volumes,
    selectedVolumes,
    setSelectedVolumes,
    brands,
    selectedBrands,
    setSelectedBrands
}: FilterWindowProps) => {
    const t = useTranslations('CollectionPage.filters');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    const handleSubmit = () => {
        if (minPrice <= maxPrice) {
            onApplyFilters(minPrice, maxPrice);
            toast(t('events.updated'));
        } else {
            toast(t('events.error'));
        }
    };

    return (
        <div className="bg-white px-5 lg:p-5 rounded-lg h-fit lg:space-y-4">
            {/* For larger screens, show filters normally */}
            <div className="hidden lg:block">
                <h3 className="text-lg font-semibold">{t('byPrice')}</h3>
                <div className="flex flex-col space-y-2">
                    <PriceFilter
                        maxPrice={maxPrice}
                        minPrice={minPrice}
                        setMaxPrice={setMaxPrice}
                        setMinPrice={setMinPrice}
                    />
                    <VolumeFilter
                        selectedVolumes={selectedVolumes}
                        setSelectedVolumes={setSelectedVolumes}
                        volumes={volumes}
                    />
                    <BrandFilter
                        brands={brands}
                        selectedBrands={selectedBrands}
                        setSelectedBrands={setSelectedBrands}
                    />
                    <Button
                        onClick={handleSubmit}
                        className="bg-custompink hover:bg-rose-300 focus:bg-rose-400 text-white p-2 rounded"
                    >
                        {t('apply')}
                    </Button>
                </div>
            </div>

            {/* Collapsible filters for smaller screens */}
            <div className="block lg:hidden">
                <Accordion type="single" collapsible>
                    <AccordionItem value="filters" className='border-none'>
                        <AccordionTrigger className="text-lg font-semibold">{t('title')}</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col space-y-2">
                                <PriceFilter
                                    maxPrice={maxPrice}
                                    minPrice={minPrice}
                                    setMaxPrice={setMaxPrice}
                                    setMinPrice={setMinPrice}
                                />
                                <VolumeFilter
                                    selectedVolumes={selectedVolumes}
                                    setSelectedVolumes={setSelectedVolumes}
                                    volumes={volumes}
                                />
                                <BrandFilter
                                    brands={brands}
                                    selectedBrands={selectedBrands}
                                    setSelectedBrands={setSelectedBrands}
                                />
                                <Button
                                    onClick={handleSubmit}
                                    className="bg-custompink hover:bg-rose-300 focus:bg-rose-400 text-white p-2 rounded"
                                >
                                    {t('apply')}
                                </Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};

export default FilterWindow;
