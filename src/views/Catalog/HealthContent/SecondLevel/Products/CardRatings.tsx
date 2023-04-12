import React, { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Card, Collapse, List, ListItem, ListItemButton, ListItemText, ListSubheader, Typography, Button } from '@mui/material';
import { ResumenProducts } from 'types/health-content';
import { useTheme } from '@mui/material/styles';

const CardRatings = ({ resume, sumaValores, setTypeScore }: { resume: ResumenProducts; sumaValores: any; setTypeScore: any }) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const handleClickDetail = (type: string) => {
        setTypeScore(type);
    };

    const theme = useTheme();

    return (
        <>
            <Card>
                <List
                    sx={{
                        width: '100%',
                        background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                        border: '1px solid',
                        borderColor: theme.palette.mode === 'dark' ? 'transparent' : theme.palette.grey[100],
                        '&:hover': {
                            border: `1px solid${theme.palette.primary.main}`
                        }
                    }}
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
                                pb: 1,
                                bgcolor: 'transparent'
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
                            <ListItemText primary="Title Score" />
                            {`${resume.pageTitleScorePercentage?.toFixed(2)}%`}
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Brand Score" />
                            {`${resume.brandNameScorePercentage?.toFixed(2)}%`}
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Category Score" />
                            {`${resume.categoryScorePercentage?.toFixed(2)}%`}
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Reference Code Sku Score" />
                            {`${resume.skuReferenceCodeScorePercentage?.toFixed(2)}%`}
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Reference Code Product Score" />
                            {`${resume.productReferenceCodeScorePercentage?.toFixed(2)}%`}
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="EAN Upc Score" />
                            {`${resume.eanUpcScorePercentage?.toFixed(2)}%`}
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Dimensions: Width Score" />
                            {`${resume.dimensionWidthScorePercentage?.toFixed(2)}%`}
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Dimensions: Height Score" />
                            {`${resume.dimensionHeightScorePercentage?.toFixed(2)}%`}
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Dimensions: Large Score" />
                            {`${resume.dimensionLargeScorePercentage?.toFixed(2)}%`}
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Dimensions: Weight Score" />
                            {`${resume.dimensionWeightScorePercentage?.toFixed(2)}%`}
                        </ListItem>
                    </Collapse>
                </List>
            </Card>
        </>
    );
};

export default CardRatings;
