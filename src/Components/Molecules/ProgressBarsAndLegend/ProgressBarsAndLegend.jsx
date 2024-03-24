// ProgressBarsAndLegends.js
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ProgressBarsAndLegends = ({ progressBars, legends }) => {
    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    width: 55,
                    height: 55,
                    transform: `rotate(8deg)`,
                }}
            >
                {progressBars.map((bar, index) =>
                    index === 0 ? (
                        <CircularProgressbar
                            key={index}
                            value={bar.value}
                            strokeWidth={bar.strokeWidth}
                            styles={buildStyles({
                                pathColor: bar.color,
                                trailColor: 'transparent',
                            })}
                        />
                    ) : (
                        <Box
                            key={index}
                            sx={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                top: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    width: `${bar.size}%`,
                                    height: `${bar.size}%`,
                                    margin: bar.margin,
                                }}
                            >
                                <CircularProgressbar
                                    value={bar.value}
                                    strokeWidth={bar.strokeWidth}
                                    styles={buildStyles({
                                        pathColor: bar.color,
                                        trailColor: 'transparent',
                                    })}
                                />
                            </Box>
                        </Box>
                    )
                )}
            </Box>
            <Box
                sx={{
                    ml: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {legends.map((legend, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                width: 10,
                                height: 10,
                                backgroundColor: legend.color,
                                mr: 1,
                                borderRadius: '50%',
                            }}
                        />
                        <Typography variant='body2' sx={{ fontSize: '11px' }}>
                            {legend.text}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default ProgressBarsAndLegends;
