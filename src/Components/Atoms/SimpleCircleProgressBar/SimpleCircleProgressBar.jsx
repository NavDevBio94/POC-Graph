import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Box from '@mui/material/Box';

const SimpleCircleProgressBar = ({ value }) => {
    return (
        <Box sx={{ width: 45, height: 60 }}>
            <CircularProgressbar
                value={value}
                styles={{
                    root: {
                        transform: 'scaleX(-1)',
                    },
                    path: {
                        stroke: `black`,
                        strokeLinecap: 'round',
                        transition: 'stroke-dashoffset 0.5s ease 0s',
                    },
                    trail: {
                        stroke: '#d6d6d6',
                        strokeLinecap: 'butt',
                    },
                }}
            />
        </Box>
    );
};

export default SimpleCircleProgressBar;

