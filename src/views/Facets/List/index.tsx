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
        setFilterText(search ?? '');
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
                {facets && facets.map((item: FacetType) => <FacetItem facet={item} handleShowInfo={handleShowInfo} />)}
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

// import React, { useState, useEffect } from 'react';

// // material-ui
// import { Button, Grid, InputAdornment, OutlinedInput, Pagination, Typography } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';

// // project imports
// import MainCard from 'ui-component/cards/MainCard';
// import { gridSpacing } from 'store/constant';
// import { useSelector, useDispatch } from 'store';

// // third-party
// import { useIntl } from 'react-intl';

// // assets
// import { IconSearch } from '@tabler/icons';
// import { Link, useSearchParams } from 'react-router-dom';
// import FacetsListComponent from './ListComponent';
// import { getFacetsService } from 'store/slices/catalogue';

// // ==============================|| FACETS LIST ||============================== //

// const FacetsListPage = () => {
//     // hooks
//     const intl = useIntl();
//     const dispatch = useDispatch();

//     // variables
//     const {
//         facetsInfo: { maxPage }
//     } = useSelector((state) => state.catalogue);
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [searchParams, setSearchParams] = useSearchParams();
//     const [filterText, setFilterText] = useState<string>('');

//     useEffect(() => {
//         let newSearchParam = `?page=${currentPage}`;

//         if (filterText) {
//             newSearchParam += `&search=${filterText}`;
//         }

//         setSearchParams(newSearchParam);
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [filterText, currentPage]);

//     useEffect(() => {
//         const search = searchParams.get('search');
//         setFilterText(search ?? '');
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
//         const newString = event?.target.value;
//         setFilterText(newString ?? '');
//         setCurrentPage(1);
//     };

//     const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
//         setCurrentPage(value);
//         searchFacets();
//     };

//     const searchFacets = () => {
//         dispatch(
//             getFacetsService({
//                 idMerchant: 1,
//                 page: currentPage,
//                 term: filterText
//             })
//         );
//     };

//     useEffect(() => {
//         searchFacets();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [currentPage, filterText]);

//     return (
//         <MainCard
//             title={
//                 <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
//                     <Grid item>
//                         <Typography variant="h3">FACETS</Typography>
//                     </Grid>
//                     <Grid item>
//                         <Button component={Link} to="create" variant="contained" startIcon={<AddIcon />} sx={{ mr: 3 }}>
//                             {intl.formatMessage({
//                                 id: 'create_facet'
//                             })}
//                         </Button>

//                         <OutlinedInput
//                             id="input-search-list-style1"
//                             placeholder={intl.formatMessage({
//                                 id: 'search'
//                             })}
//                             startAdornment={
//                                 <InputAdornment position="start">
//                                     <IconSearch stroke={1.5} size="16px" />
//                                 </InputAdornment>
//                             }
//                             size="small"
//                             value={filterText}
//                             onChange={handleSearch}
//                         />
//                     </Grid>
//                 </Grid>
//             }
//             content={false}
//         >
//             <FacetsListComponent />
//             <Grid container>
//                 <Grid
//                     item
//                     xs={12}
//                     sx={{
//                         display: 'flex',
//                         justifyContent: 'flex-end',
//                         p: 2
//                     }}
//                 >
//                     <Pagination count={maxPage} page={currentPage} onChange={handlePageChange} />
//                 </Grid>
//             </Grid>
//         </MainCard>
//     );
// };

// export default FacetsListPage;
