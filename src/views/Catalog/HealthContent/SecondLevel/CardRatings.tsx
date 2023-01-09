import React, { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Card, Chip, Collapse, List, ListItem, ListItemButton, ListItemText, ListSubheader, Typography } from '@mui/material';
import { ResumenProducts } from 'types/health-content';

const CardRatings = ({ resume }: { resume: ResumenProducts }) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <Card>
                <List
                    sx={{ width: '100%', bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader
                            component="div"
                            id="nested-list-subheader"
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                pt: 1,
                                pb: 1
                            }}
                        >
                            <Typography variant="h3">{resume?.description}</Typography>
                            <Chip label={`${resume?.totalProductsPercentage?.toFixed(2)}%`} color="success" variant="outlined" />
                        </ListSubheader>
                    }
                >
                    <ListItemButton onClick={handleClick} sx={{ display: 'flex', justifyContent: 'center' }}>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <ListItem>
                            {/* <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon> */}
                            <ListItemText primary="Starred" />
                        </ListItem>
                    </Collapse>
                </List>
            </Card>
        </>
    );
};

export default CardRatings;
