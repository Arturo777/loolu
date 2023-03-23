import React, { useEffect } from 'react';

// mui materials
import { Divider, Drawer, IconButton, Stack, Typography, Box, Card } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ScrollBar from 'react-perfect-scrollbar';

export default function LooluDrawer({
    isOpen,
    toggleDrawer,
    title,
    children,
    footer
}: {
    isOpen: boolean;
    toggleDrawer: (val: boolean) => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}) {
    const handleDrawer = (newVal: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        toggleDrawer(newVal);
    };

    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={handleDrawer(false)}
            elevation={6}
            PaperProps={{
                sx: {
                    width: { xs: 1, sm: 0.6, md: 0.3 },
                    minWidth: { xs: 200, sm: 300 },
                    maxWidth: { xs: 280, sm: 400, lg: 450 }
                }
            }}
        >
            {/* HEADER */}
            {title && (
                <>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ pt: 2, pb: 1, pl: 2, pr: 1, userSelect: 'none' }}
                    >
                        <Typography variant="h4" component="p">
                            {title}
                        </Typography>
                        <IconButton sx={{ ml: 2 }} size="small" onClick={() => toggleDrawer(false)}>
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    </Stack>
                    <Divider />
                </>
            )}
            <ScrollBar>
                {/* CONTENT */}
                <Box sx={{ width: 1 }}>{children}</Box>
            </ScrollBar>
            {/* FOOTER */}
            {footer && (
                <Card elevation={3} sx={{ borderRadius: 0, paddingX: 1, paddingY: 1.5 }}>
                    {footer}
                </Card>
            )}
        </Drawer>
    );
}

//  sx={{ width: { xs: 1, sm: 0.6, md: 0.3 }, minWidth: { xs: 200, sm: 300 }, maxWidth: { xs: 280, sm: 400, lg: 450 } }}
