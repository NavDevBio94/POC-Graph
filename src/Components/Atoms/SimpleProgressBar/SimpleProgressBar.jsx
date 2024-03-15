import React from 'react';
import { Box, LinearProgress, Typography, styled } from '@mui/material';
const CustomLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 8,
    width: 150,
    borderRadius: 8,
    '& .MuiLinearProgress-bar': {
        borderRadius: 8,
        backgroundColor: 'black',
    },
}));

const SimpleProgressBar = ({ completed, targetText }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <CustomLinearProgress variant="determinate" style={{ backgroundColor: '#EEEFF2' }} value={completed} />
            <Typography
                sx={{ mt: 0.5, fontSize: '11px', color: 'black' }}

            >
                {targetText}
            </Typography>
        </Box>
    );
};

export default SimpleProgressBar;
