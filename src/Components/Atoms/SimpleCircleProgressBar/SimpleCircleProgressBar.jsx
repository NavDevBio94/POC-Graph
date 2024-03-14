import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const SimpleCircleProgressBar = ({ value }) => {
    return (
        <div style={{ width: 45, height: 60 }}>
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
        </div>
    );
};

export default SimpleCircleProgressBar;
