import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
    page: number;
    totalPages: number;
    goToPage: (page: number) => void;
}

const CollectionPagination = ({ page, totalPages, goToPage }: Props) => {
    const getPagesToShow = () => {
        if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1);

        if (page === 1 || page === 2) return [1, 2, 3];

        if (page === totalPages) return [totalPages - 2, totalPages - 1, totalPages];

        return [page - 1, page, page + 1];
    };

    const pagesToShow = getPagesToShow();

    return (
        <Pagination>
            <PaginationContent className="flex items-center justify-center gap-2">
                {/* Previous Button */}
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={() => goToPage(page - 1)}
                        className={`px-3 py-1 ${page === 1 ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {pagesToShow.map((pageNum) => (
                    <PaginationItem key={pageNum}>
                        <PaginationLink
                            href="#"
                            isActive={page === pageNum}
                            onClick={() => goToPage(pageNum)}
                            className="px-3 py-1"
                        >
                            {pageNum}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Next Button */}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={() => goToPage(page + 1)}
                        className={`px-3 py-1 ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default CollectionPagination;
