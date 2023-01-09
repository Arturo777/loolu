import React, { useState } from 'react';

// mui imports
import { Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';

// assets
import { IconSearch } from '@tabler/icons';

// third party imports
import { useIntl } from 'react-intl';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

export default function ChangeLogPage() {
    // hooks
    const intl = useIntl();

    const [filterText, setFilterText] = useState<string>('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
        const newString = event?.target.value;
        setFilterText(newString ?? '');
    };

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">
                            {intl.formatMessage({
                                id: 'change_log'
                            })}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <OutlinedInput
                            id="input-search-list-style1"
                            placeholder={intl.formatMessage({
                                id: 'search'
                            })}
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconSearch stroke={1.5} size="16px" />
                                </InputAdornment>
                            }
                            size="small"
                            value={filterText}
                            onChange={handleSearch}
                        />
                    </Grid>
                </Grid>
            }
        >
            <Typography>CONTENDI</Typography>
        </MainCard>
    );
}
