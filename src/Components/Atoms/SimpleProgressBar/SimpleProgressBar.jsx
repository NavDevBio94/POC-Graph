import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const SimpleProgressBar = ({ completed, targetText }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <ProgressBar
                completed={completed}
                bgColor="black"
                height="8px"
                borderRadius="8px"
                baseBgColor="#e0e0de"
                labelColor="white"
                width="150px"
                labelSize="0px"
            />
            <Typography
                sx={{ mt: 0.5, fontSize: '11px' }}
                color="textSecondary"
            >
                {targetText}
            </Typography>
        </Box>
    );
};

export default SimpleProgressBar;
