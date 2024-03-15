import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { ChartContainer, BarPlot } from '@mui/x-charts';
import SimpleCircleProgressBar from './Components/Atoms/SimpleCircleProgressBar/SimpleCircleProgressBar';
import SimpleProgressBar from './Components/Atoms/SimpleProgressBar/SimpleProgressBar';
import './App.css';
import { BarChart, Bar, Cell } from 'recharts';
function App() {
    const [progress] = useState(75);
    const tooltipPosition = `calc(${progress}% - 30px)`;

    const data = [
        { name: 'Jan', uv: 40 },
        { name: 'Feb', uv: 120 },
        { name: 'Mar', uv: 90 },
        { name: 'Apr', uv: 70 },
    ];

    const colorRanges = [
        { range: '0-30 days', color: '#2F2F2F' },
        { range: '31-60 days', color: 'pink' },
        { range: '61-90 days', color: '#990021' },
        { range: '90+ days', color: '#ABABAB' },
    ];

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

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Card
                sx={{
                    p: 2,
                    m: 1,
                    boxShadow: 'none',
                    border: '1px solid #E1E3E6',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 200 }}>
                        <Typography sx={{ fontSize: '12px' }}>
                            INCOMING VEHICLES <br /> THIS WEEK/MONTH
                        </Typography>
                        <Typography sx={{ fontSize: '16px' }}>
                            <b>08</b>
                        </Typography>
                    </Box>
                    <SimpleCircleProgressBar value={60} />
                </Box>
            </Card>
            <Card sx={{ p: 2, m: 1, boxShadow: 'none', border: '1px solid #E1E3E6' }}>card 2</Card>
            <Card sx={{ p: 2, m: 1, boxShadow: 'none', border: '1px solid #E1E3E6' }}>
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
            <Card
                sx={{
                    p: 2,
                    m: 1,
                    boxShadow: 'none',
                    border: '1px solid #E1E3E6',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '7px',
                    }}
                >
                    <Box>
                        <Typography sx={{ fontSize: '12px' }}>
                            AGING <br /> INVENTORY
                        </Typography>
                        <Typography sx={{ fontSize: '16px' }}>
                            <b>35 DAYS</b>
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <BarChart width={50} height={70} data={data}>
                            <Bar dataKey='uv' radius={[10, 10, 10, 10]} barSize={7}>
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

                {/* <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        gap: 5,
                        bottom: 40,
                    }}
                >
                    <Box sx={{ width: 10 }}>
                        <Typography variant='body2'>AGING INVENTORY</Typography>
                        <Typography variant='body1'>
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
                                        borderRadius: '30%',
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
                </Box> */}
            </Card>
            <Card sx={{ p: 2, m: 1, boxShadow: 'none', border: '1px solid #E1E3E6' }}>
                <Typography>Card 5</Typography>
            </Card>
        </Box>
    );
}

export default App;
