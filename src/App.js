import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import SimpleCircleProgressBar from './Components/Atoms/SimpleCircleProgressBar/SimpleCircleProgressBar';
import SimpleProgressBar from './Components/Atoms/SimpleProgressBar/SimpleProgressBar';
import './App.css';
import { BarChart, Bar, Cell } from 'recharts';
import 'react-circular-progressbar/dist/styles.css';
import arrowUp from '../src/Assets/magnifying.png';
import React from 'react';
import { data, colorRanges, legends, progressBars, tickPaths } from '.././src/Utils/Data';
import GaugeChart from './Components/Atoms/GaudgeChart/GaudgeChart';
import ProgressBarsAndLegends from './Components/Atoms/ProgressBarsAndLegend/ProgressBarsAndLegend';

function App() {
    const [progress] = useState(75);
    const tooltipPosition = `calc(${progress}% - 10px)`;
    const [open, setOpenClose] = useState(true);
    const [rotate, setRotate] = useState(0);
    const [endAngleDegrees] = useState(30);

    const toggleOpenClose = () => {
        setOpenClose(!open);
    };

    const getColorForValue = (value) => {
        if (value <= 40) return '#2F2F2F';
        if (value <= 70) return 'pink';
        if (value <= 100) return '#990021';
        return '#ABABAB';
    };

    const CustomLegend = () => (
        <Box>
            {colorRanges.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '4px',
                        position: 'relative',
                        top: '5px',
                    }}
                >
                    <Box
                        sx={{
                            width: '10px',
                            height: '10px',
                            backgroundColor: item.color,
                            marginRight: '10px',
                            borderRadius: '20%',
                        }}
                    ></Box>
                    <Box component='span' sx={{ fontSize: '10px' }}>
                        {item.range}
                    </Box>
                </Box>
            ))}
        </Box>
    );

    function createCircleArcPath(
        circleCenterX,
        circleCenterY,
        radiusCircle,
        startAngleDegreesCircle,
        endAngleDegreesCircle
    ) {
        const startRadiansCircle = (Math.PI / 180) * (startAngleDegreesCircle - 90);
        const endRadiansCircle = (Math.PI / 180) * (endAngleDegreesCircle - 90);

        const circleArcStartX = circleCenterX + radiusCircle * Math.cos(startRadiansCircle);
        const circleArcStartY = circleCenterY + radiusCircle * Math.sin(startRadiansCircle);
        const circleArcEndX = circleCenterX + radiusCircle * Math.cos(endRadiansCircle);
        const circleArcEndY = circleCenterY + radiusCircle * Math.sin(endRadiansCircle);

        const largeArcFlagCircle =
            endAngleDegreesCircle - startAngleDegreesCircle > 180 ? '1' : '0';

        return `M ${circleArcStartX} ${circleArcStartY} A ${radiusCircle} ${radiusCircle} 0 ${largeArcFlagCircle} 1 ${circleArcEndX} ${circleArcEndY}`;
    }

    const circlePath = createCircleArcPath(89, 35, 30, -130, 130);
    console.log(circlePath);

    function createProgressArcPath(cx, cy, radius, startAngleDegrees, endAngleDegrees) {
        const startRadians = (Math.PI / 180) * (startAngleDegrees - 90);
        const endRadians = (Math.PI / 180) * (endAngleDegrees - 90);

        const startX = cx + radius * Math.cos(startRadians);
        const startY = cy + radius * Math.sin(startRadians);
        const endX = cx + radius * Math.cos(endRadians);
        const endY = cy + radius * Math.sin(endRadians);

        const largeArcFlag = endAngleDegrees - startAngleDegrees > 180 ? '1' : '0';

        return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
    }

    useEffect(() => {
        setRotate(endAngleDegrees - 35);
    }, [endAngleDegrees]);
    const progressPath = createProgressArcPath(89, 35, 30, -130, endAngleDegrees);

    return (
        <Box sx={{ display: 'flex', mt: 2, flexDirection: 'column', marginLeft: '80px' }}>
            {open && (
                <Box sx={{ display: 'flex', mt: 2, gap: '10px' }}>
                    <Card
                        sx={{
                            p: 2,

                            boxShadow: 'none',
                            border: '1px solid #E1E3E6',
                            maxHeight: '70px',
                            borderRadius: '7px',
                            width: '260px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '10px',
                                gap: '55px',
                            }}
                        >
                            <Box>
                                <Typography sx={{ fontSize: '12px' }}>
                                    INCOMING VEHICLES <br /> THIS WEEK/MONTH
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    <b>08</b>
                                </Typography>
                            </Box>
                            <SimpleCircleProgressBar value={60} />
                        </Box>
                    </Card>

                    <Card
                        sx={{
                            p: 2,

                            boxShadow: 'none',
                            border: '1px solid #E1E3E6',
                            maxHeight: '70px',
                            borderRadius: '7px',
                            width: '260px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                gap: '30px',
                                marginTop: '10px',
                            }}
                        >
                            <Typography sx={{ fontSize: '12px' }}>
                                AVAILABLE <br /> INVENTORY
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ProgressBarsAndLegends
                                    progressBars={progressBars}
                                    legends={legends}
                                />
                            </Box>
                        </Box>
                    </Card>

                    <Card
                        sx={{
                            p: 2,

                            boxShadow: 'none',
                            border: '1px solid #E1E3E6',
                            maxHeight: '70px',
                            borderRadius: '7px',
                            width: '260px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                marginTop: '10px',
                            }}
                        >
                            <Box>
                                <Typography variant='body2'>UNITS SOLD THIS MONTH</Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    <b>{progress}</b>
                                </Typography>
                            </Box>

                            <Box
                                className='progress-container'
                                sx={{ position: 'relative', marginTop: '15px' }}
                            >
                                <Box
                                    className='tooltip'
                                    sx={{
                                        left: tooltipPosition,
                                        bottom: '130%',
                                        position: 'absolute',
                                        p: 0.5,
                                        borderRadius: 1,
                                        transform: 'translateX(-50%)',
                                    }}
                                >
                                    {progress}%
                                    <Box className='tooltip-arrow' />
                                </Box>
                                <SimpleProgressBar completed={progress} targetText='Target' />
                            </Box>
                        </Box>
                    </Card>
                    <Card
                        sx={{
                            p: 2,

                            boxShadow: 'none',
                            border: '1px solid #E1E3E6',
                            maxHeight: '70px',
                            borderRadius: '7px',
                            width: '260px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '16px',
                                marginTop: '10px',
                            }}
                        >
                            <Box>
                                <Typography sx={{ fontSize: '12px' }}>
                                    AGING <br /> INVENTORY
                                </Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    <b>35 DAYS</b>
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                <BarChart width={50} height={70} data={data}>
                                    <Bar dataKey='uv' radius={[10, 10, 10, 10]} barSize={6}>
                                        {data.map((entry, index) => (
                                            <Cell
                                                style={{ gap: '10px' }}
                                                key={`cell-${index}`}
                                                fill={getColorForValue(entry.uv)}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                                <CustomLegend />
                            </Box>
                        </Box>
                    </Card>
                    <Card
                        sx={{
                            p: 2,
                            boxShadow: 'none',
                            border: '1px solid #E1E3E6',
                            maxHeight: '70px',
                            borderRadius: '7px',
                            width: '260px',
                        }}
                    >
                        <Box
                            sx={{
                                m: 1,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Box>
                                <Typography sx={{ fontSize: '12px' }}>RDR RATE</Typography>
                                <Typography sx={{ fontSize: '15px' }}>
                                    <b>61%</b>
                                </Typography>
                            </Box>
                            <Box className='radial-slider'>
                                <Box className='radial-slider__content-wrapper'>
                                    <GaugeChart
                                        circlePath={circlePath}
                                        progressPath={progressPath}
                                        tickPaths={tickPaths}
                                        rotate={rotate}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Card>
                </Box>
            )}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginLeft: '10px',
                    cursor: 'pointer',
                }}
                onClick={toggleOpenClose}
            >
                <Typography sx={{ fontSize: '14px' }}>Collapse Summary</Typography>
                {open ? <img src={arrowUp} alt='arrowup' /> : null}
            </Box>
        </Box>
    );
}

export default App;
