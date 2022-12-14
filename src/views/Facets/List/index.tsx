import React, { useEffect } from 'react';

// mui imports
import { Box, IconButton, ListItemButton, ListItemText, Pagination, Card } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// third-party imports
import { useSearchParams } from 'react-router-dom';

// project imports
import { useDispatch, useSelector } from 'store';

// types imports
import { FacetType } from 'types/catalogue';
import { getFacetsService } from 'store/slices/catalogue';

type FacetsListComponentProps = {
    handleEdit: (id: number) => void;
    filterText: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    currentPage: number;
    setCurrentPage: (id: number) => void;
    setFilterText: (text: string) => void;
};

export default function FacetsListComponent({
    handleEdit,
    filterText,
    currentPage,
    setFilterText,
    setCurrentPage,
    handleSearch
}: FacetsListComponentProps) {
    // hooks
    const dispatch = useDispatch();

    // variables
    const {
        facetsInfo: { facets, maxPage }
    } = useSelector((state) => state.catalogue);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        let newSearchParam = `?page=${currentPage}`;

        if (filterText) {
            newSearchParam += `&search=${filterText}`;
        }

        setSearchParams(newSearchParam);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterText, currentPage]);

    useEffect(() => {
        const search = searchParams.get('search');
        const page = Number(searchParams.get('page') ?? 1);
        setFilterText(search ?? '');
        setCurrentPage(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        searchFacets();
    };

    const searchFacets = () => {
        dispatch(
            getFacetsService({
                idMerchant: 1,
                page: currentPage,
                term: filterText
            })
        );
    };

    useEffect(() => {
        searchFacets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, filterText]);

    const handleShowInfo = (id: number) => {
        handleEdit(id);
    };

    return (
        <>
            <Card sx={{ boxShadow: 2 }}>
                {facets &&
                    facets.map((item: FacetType) => (
                        <FacetItem key={`facet-item-${item.id}`} facet={item} handleShowInfo={handleShowInfo} />
                    ))}
            </Card>
            <Box sx={{ mt: 3, mb: 2 }}>
                <Pagination count={maxPage} page={currentPage} onChange={handlePageChange} />
            </Box>
        </>
    );
}
type FacetItemProps = { facet: FacetType; handleShowInfo: (id: number) => void };

const FacetItem = ({ facet, handleShowInfo }: FacetItemProps) => (
    <>
        <ListItemButton>
            {/* <ListItemIcon sx={{ p: 1 }} onClick={handleOpen}>
                {category.children?.length ? <ExpandCircleDownIcon /> : null}
            </ListItemIcon> */}
            <ListItemText sx={{ p: 1 }} primary={facet.name} secondary={facet.nameSap} />
            {/* EDIT */}
            <IconButton
                onClick={() => {
                    handleShowInfo(facet.id);
                }}
            >
                <EditIcon />
            </IconButton>
        </ListItemButton>
    </>
);
