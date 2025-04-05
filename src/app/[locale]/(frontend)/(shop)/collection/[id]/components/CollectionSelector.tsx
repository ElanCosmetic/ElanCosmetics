import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

interface Props {
    sort: 'ascending' | 'descending';
    setSortType: (sortType: 'ascending' | 'descending') => void;
}

const CollectionSelector = ({ sort, setSortType }: Props) => {
    const t = useTranslations("CollectionPage.sorting");

    const handleSortChange = (value: 'ascending' | 'descending') => {
        setSortType(value);  // Update the sort state when the user selects an option
    };

    return (
        <Select value={sort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue className="capitalize" placeholder={sort === 'ascending' ? t('ascending') : t('descending')} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="ascending" className="capitalize">{t('ascending')}</SelectItem>
                <SelectItem value="descending" className="capitalize">{t('descending')}</SelectItem>
            </SelectContent>
        </Select>
    );
}

export default CollectionSelector;
