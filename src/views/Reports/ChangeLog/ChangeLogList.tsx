import React, { useEffect, useState } from 'react';

// mui imports
import { Card, Divider, Grid, ListItemButton, Pagination, Typography } from '@mui/material';

// types
import { ChangeLog, ChangeLogMulticatalogo } from 'types/reports';

type ChangeLogListProps = {
    changeLog: ChangeLogMulticatalogo[];
    handleSelect: (item: ChangeLogMulticatalogo) => void;
};

export default function ChangeLogList({ changeLog, handleSelect }: ChangeLogListProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [renderData, setRenderData] = useState<any>();

    useEffect(() => {
        getPageItem();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [changeLog, currentPage]);

    const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    const getPageItem = () => {
        const numInit = (currentPage - 1) * 10;
        // const initial = numInit > 0 ? numInit + 1 : 1;
        const initial = numInit > 0 ? numInit + 1 : 0;
        const end = currentPage * 10;

        const data = changeLog.flatMap((item) => item);

        const copyChange = [...data];

        const toRender = copyChange.slice(initial, end);

        setRenderData(toRender);
    };

    return (
        <Card elevation={2}>
            {renderData &&
                renderData?.map((item: any, i: number) => (
                    <ListItemButton onClick={() => handleSelect(item)} key={`change-log-item-${i}`}>
                        <Grid container sx={{ p: 2 }}>
                            <Grid item xs={12} sm={6} sx={{ mb: { xs: 0, sm: 2 } }}>
                                <Typography variant="subtitle1">{item.prodId}</Typography>
                                <Typography variant="caption">Product ID</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ mb: { xs: 0, sm: 2 } }}>
                                <Typography variant="subtitle1">{item.skuId}</Typography>
                                <Typography variant="caption">SKU ID</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ mb: { xs: 0, sm: 2 } }}>
                                <Typography variant="subtitle1">{item.userLog}</Typography>
                                <Typography variant="caption">User</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ mb: { xs: 0, sm: 2 } }}>
                                <Typography variant="subtitle1">{item.dateChange}</Typography>
                                <Typography variant="caption">Fecha</Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                    </ListItemButton>
                ))}
            <Pagination sx={{ p: 2 }} page={currentPage} onChange={handleChangePage} count={Math.round(changeLog.length / 10)} />
        </Card>
    );
}
