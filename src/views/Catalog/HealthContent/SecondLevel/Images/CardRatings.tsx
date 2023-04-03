import React, { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Card, Collapse, List, ListItem, ListItemButton, ListItemText, ListSubheader, Typography, Button } from '@mui/material';
import { ResumenProducts } from 'types/health-content';

const CardRatings = ({ resume, sumaValores, setTypeScore }: { resume: ResumenProducts; sumaValores: any; setTypeScore: any }) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const handleClickDetail = (type: string) => {
        setTypeScore(type);
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
                            {/* <Chip
                                label=
                                // eslint-disable-next-line no-nested-ternary
                                color={resume?.description === 'Good' ? 'success' : resume?.description === 'Fair' ? 'warning' : 'error'}
                                variant="outlined"
                            /> */}
                            <Typography variant="h3">{`${resume?.totalProductsPercentage?.toFixed(2)}%`}</Typography>
                        </ListSubheader>
                    }
                >
                    <ListItemButton onClick={handleClick} sx={{ display: 'flex', justifyContent: 'center' }}>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
                        <ListItemText primary={`Products: ${resume.totalProducts}/${sumaValores()}`} />
                        <Button
                            onClick={() => handleClickDetail(resume?.description)}
                            variant="outlined"
                            size="small" // eslint-disable-next-line no-nested-ternary
                            color={resume?.description === 'Good' ? 'success' : resume?.description === 'Fair' ? 'warning' : 'error'}
                        >
                            Detail {resume.description}
                        </Button>
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <ListItem>
                            <ListItemText primary="Dimension Score" />
                            {`${resume.dimensionScorePercen?.toFixed(2)}%`}
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Quality Score" />
                            {`${resume.qualityScorePercen?.toFixed(2)}%`}
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Quantity Score" />
                            {`${resume.quantityScorePerce?.toFixed(2)}%`}
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Size Score" />
                            {`${resume.sizeScorePercen?.toFixed(2)}%`}
                        </ListItem>
                    </Collapse>
                </List>
            </Card>
        </>
    );
};

export default CardRatings;