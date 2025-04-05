import React from 'react';
import VolumeType from '@/app/[locale]/(frontend)/types/VolumeType';
import { useTranslations } from 'next-intl';
interface VolumeFilterProps {
    volumes: VolumeType[]; // List of unique volume IDs
    selectedVolumes: VolumeType[];
    setSelectedVolumes: React.Dispatch<React.SetStateAction<VolumeType[]>>;
}

const VolumeFilter = ({ volumes, selectedVolumes, setSelectedVolumes }: VolumeFilterProps) => {
    const t = useTranslations('CollectionPage.filters');
    const handleCheckboxChange = (volume: VolumeType) => {
        if (selectedVolumes.includes(volume)) {
            setSelectedVolumes(selectedVolumes.filter((id) => id !== volume));
        } else {
            setSelectedVolumes([...selectedVolumes, volume]);
        }
    };

    if (volumes.length === 0) return null

    return (
        <div className="">
            <h3 className="font-semibold mb-2">{t('byVolume')}</h3>
            <div className="flex flex-col gap-2">
                {volumes.map((volume, index) => (
                    <label key={index} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={selectedVolumes.some((v) => v.id === volume.id)}
                            onChange={() => handleCheckboxChange(volume)}
                            className="cursor-pointer"
                        />
                        <span>{volume.slug}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default VolumeFilter;
