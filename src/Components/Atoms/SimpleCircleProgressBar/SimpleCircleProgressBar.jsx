import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';

const SimpleCircleProgressBar = ({ value }) => {
    const SIZE = 55; 
    const STROKE_WIDTH = 5; 

    return (
        <Box sx={{
            width: SIZE,
            height: SIZE,
            position: 'relative',
            transform: 'rotate(-220deg)' 
        }}>
            <CircularProgress
                variant="determinate"
                value={100} // Background circle
                size={SIZE}
                thickness={STROKE_WIDTH}
                sx={{
                    color: '#d6d6d6',
                    position: 'absolute',
                }}
            />
            <CircularProgress
                variant="determinate"
                value={value}
                size={SIZE}
                thickness={STROKE_WIDTH}
                sx={{
                    color: 'black',
                    animationDuration: '550ms',
                    position: 'absolute',
                    [`& .${circularProgressClasses.circle}`]: {
                     
                    },
                }}
            />
        </Box>
    );
};

export default SimpleCircleProgressBar;
