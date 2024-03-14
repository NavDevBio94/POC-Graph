import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { ChartContainer, BarPlot } from '@mui/x-charts';
import SimpleCircleProgressBar from './Components/Atoms/SimpleCircleProgressBar/SimpleCircleProgressBar';
import SimpleProgressBar from './Components/Atoms/SimpleProgressBar/SimpleProgressBar';
import './App.css';

function App() {
    const [progress] = useState(75);
    const tooltipPosition = `calc(${progress}% - 30px)`;

    const uData = [4000, 3000, 2000, 2780];
    const xLabels = ['Page A', 'Page B', 'Page C', 'Page D'];
    const barColors = ['#cce5ff', '#99ccff', '#6699ff', '#3366ff'];

    const dayRanges = [
        { label: '0-30 Days', color: barColors[0] },
        { label: '31-60 Days', color: barColors[1] },
        { label: '61-90 Days', color: barColors[2] },
        { label: '90+ Days', color: barColors[3] },
    ];

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Card sx={{ p: 2, m: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Box sx={{ width: 150 }}>
                        <Typography variant='body2'>INCOMING VEHICLES THIS WEEK/MONTH</Typography>
                        <Typography variant='body2'>
                            <b>08</b>
                        </Typography>
                    </Box>
                    <SimpleCircleProgressBar value={60} />
                </Box>
            </Card>
            <Card sx={{ p: 2, m: 1 }}>card 2</Card>
            <Card sx={{ p: 2, m: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ width: 100 }}>
                        <Typography variant='body2'>UNITS SOLD THIS MONTH</Typography>
                        <Typography variant='body2'>
                            <b>{progress}</b>
                        </Typography>
                    </Box>

                    <Box className='progress-container' sx={{ position: 'relative' }}>
                        <Box
                            className='tooltip'
                            sx={{ left: tooltipPosition, bottom: '130%', position: 'absolute' }}
                        >
                            {progress}%<Box className='tooltip-arrow' />
                        </Box>
                        <SimpleProgressBar completed={progress} targetText='Target' />
                    </Box>
                </Box>
            </Card>
            <Card sx={{ p: 2, m: 1, maxHeight: '80px' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        gap: 5,
                        bottom: 40,
                    }}
                >
                    <Box sx={{ width: 30 }}>
                        <Typography variant='body2'>AGING INVENTORY</Typography>
                        <Typography variant='body2'>
                            <b>35 DAYS</b>
                        </Typography>
                    </Box>
                    <ChartContainer
                        width={170}
                        height={170}
                        series={[{ data: uData, label: 'uv', type: 'bar' }]}
                        xAxis={[{ scaleType: 'band', data: xLabels }]}
                    >
                        {uData.map((dataPoint, index) => (
                            <BarPlot
                                key={xLabels[index]}
                                datakey={xLabels[index]}
                                fill={barColors[index % barColors.length]}
                                style={{ borderRadius: '20px' }}
                            />
                        ))}
                    </ChartContainer>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            gap: 0.5,
                        }}
                    >
                        {dayRanges.map((range, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    fontSize: '10px',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        display: 'flex',
                                        borderRadius: '50%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        bgcolor: range.color,
                                        color: 'white',
                                    }}
                                />
                                {range.label}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Card>
            <Card sx={{ p: 2, m: 1 }}>
                <Typography>Card 5</Typography>
            </Card>
        </Box>
    );
}

export default App;
