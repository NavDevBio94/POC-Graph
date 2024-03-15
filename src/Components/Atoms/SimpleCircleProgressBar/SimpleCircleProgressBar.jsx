import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';

const SimpleCircleProgressBar = ({ value }) => {
    const SIZE = 55; // Diameter of the progress circle
    const STROKE_WIDTH = 5; // Width of the stroke

    return (
        <Box sx={{
            width: SIZE,
            height: SIZE,
            position: 'relative',
            transform: 'rotate(-220deg)' // Rotate the container to start the progress from the left
        }}>
            <CircularProgress
                variant="determinate"
                value={100} // Background circle
                size={SIZE}
                thickness={STROKE_WIDTH}
                sx={{
                    color: '#d6d6d6', // Trail color
                    position: 'absolute',
                }}
            />
            <CircularProgress
                variant="determinate"
                value={value}
                size={SIZE}
                thickness={STROKE_WIDTH}
                sx={{
                    color: 'black', // Progress color
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
