import React, { ReactNode } from 'react';

// mui materials
import { Divider, Drawer, IconButton, Stack, Typography, Box, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { SxProps, Theme } from '@mui/system';

// third-party
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
                <Card elevation={5} sx={{ borderRadius: 0, paddingX: 1, paddingY: 1.5 }}>
                    {footer}
                </Card>
            )}
        </Drawer>
    );
}

// type RowStackProps = SystemProps & {
//     displayValue?: 'flex' | 'inline-flex';
// };

// export const RowStack = styled(Stack)<RowStackProps>(({ displayValue }) => ({
//     flexDirection: 'row',
//     display: displayValue || 'flex',
//     alignItems: 'flex-start',
//     '& > :last-child': {
//         marginTop: 10,
//         marginLeft: 10
//     }
// }));

export const RowStack = styled(Stack)<{ displayValue?: string }>((props) => ({
    flexDirection: 'row',
    // display: props.displayValue || 'inline-flex',
    '& > :last-child': {
        marginTop: 10,
        marginLeft: 10
    }
}));

export const FieldEditingHolder = ({
    children,
    displayValue = 'flex',
    onEditClick,
    sx
}: {
    children: ReactNode;
    displayValue?: 'flex' | 'inline-flex';
    onEditClick: (e: any) => void;
    sx?: SxProps<Theme>;
}) => (
    <Stack sx={{ flexDirection: 'row', display: displayValue || 'inline-flex', ...sx }}>
        {children}
        <IconButton sx={{ ml: 1 }} color="inherit" aria-label="Open drawer" edge="start" size="small" onClick={onEditClick}>
            <EditIcon fontSize="small" />
        </IconButton>
    </Stack>
);
