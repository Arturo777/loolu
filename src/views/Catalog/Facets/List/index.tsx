import React, { useEffect, useState } from 'react';

// mui imports
import {
    Box,
    IconButton,
    ListItemButton,
    ListItemText,
    Pagination,
    Card,
    Collapse,
    List,
    Stack,
    CircularProgress,
    useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// third-party imports
import { useSearchParams } from 'react-router-dom';

// project imports
import { useDispatch, useSelector } from 'store';
import facetList from './facetlist';

// types imports
import { FacetType } from 'types/catalog';
import { getFacetsService } from 'store/slices/catalog';

type FacetsListComponentProps = {
    handleEdit: (id: number) => void;
    filterText: string;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    currentPage: number;
    setCurrentPage: (id: number) => void;
    setFilterText: (text: string) => void;
    merchs: any;
};

export default function FacetsListComponent({
    handleEdit,
    filterText,
    currentPage,
    setFilterText,
    setCurrentPage,
    handleSearch,
    merchs
}: FacetsListComponentProps) {
    // hooks
    const dispatch = useDispatch();

    // variables
    // const {
    //     facetsInfo: { facets, maxPage },
    //     loading
    // } = useSelector((state) => state.catalogue);

    const loading = false;
    const facets = facetList;

    const [searchParams, setSearchParams] = useSearchParams();
    const [facetListActive, setFacetListActive] = useState<any>([]);

    useEffect(() => {
        let newSearchParam = `?page=${currentPage}`;

        if (filterText) {
            newSearchParam += `&search=${filterText}`;
        }

        setSearchParams(newSearchParam);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterText, currentPage]);

    useEffect(() => {
        // const filteredFacets = facets.facets.map((item: any) => {
        //     merchs.map((merch: any) => {
        //         facetListActive.length > merch.length ? setFacetListActive(facetListActive.splice(merch.length,1))
        //         : if (merch.merchantId === item.merchantId) setFacetListActive(item.facets);
        //         console.log(facetListActive);
        //     });
        // });
        const filteredFacets = facets.facets.map((item: any) => {
            merchs.forEach((merch: any) => {
                if (merch.merchantId === item.merchantId) {
                    setFacetListActive(item.facets.slice(0, merch.length));
                    console.log(facetListActive);
                }
            });
            return item;
        });
        console.log(facets);
        const search = searchParams.get('search');
        const page = Number(searchParams.get('page') ?? 1);
        setFilterText(search ?? '');
        setCurrentPage(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [merchs]);

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

    const theme = useTheme();

    const handleShowInfo = (id: number) => {
        handleEdit(id);
    };

    return (
        <>
            <Collapse in={loading}>
                <Stack justifyContent="center" alignItems="center" sx={{ pt: 5, mb: 5 }}>
                    <CircularProgress />
                </Stack>
            </Collapse>
            <Collapse in={!loading}>
                <List
                    component={Card}
                    sx={{
                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                        border: '1px solid',
                        borderColor: theme.palette.mode === 'dark' ? 'transparent' : theme.palette.grey[100],
                        '&:hover': {
                            border: `1px solid${theme.palette.primary.main}`
                        }
                    }}
                >
                    {facetListActive &&
                        facetListActive.map((item: FacetType) => (
                            <FacetItem key={`facet-item-${item.id}`} facet={item} handleShowInfo={handleShowInfo} />
                        ))}
                </List>
                {/* <Box sx={{ mt: 3, mb: 2 }}>
                    <Pagination count={maxPage} page={currentPage} onChange={handlePageChange} />
                </Box> */}
            </Collapse>
        </>
    );
}
type FacetItemProps = { facet: FacetType; handleShowInfo: (id: number) => void };

const FacetItem = ({ facet, handleShowInfo }: FacetItemProps) => (
    <>
        <ListItemButton>
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
