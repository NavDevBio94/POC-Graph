import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import SimpleCircleProgressBar from './Components/Atoms/SimpleCircleProgressBar/SimpleCircleProgressBar';
import SimpleProgressBar from './Components/Atoms/SimpleProgressBar/SimpleProgressBar';
import './App.css';
import { BarChart, Bar, Cell } from 'recharts';
import {
    CircularProgressbar,
    buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import arrowUp from '../src/Assets/magnifying.png';

function App() {
    const [progress] = useState(75);
    const tooltipPosition = `calc(${progress}% - 10px)`;
    const [open, setOpenClose] = useState(true);

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

    const toggleOpenClose = () => {
        setOpenClose(!open);
    };

    const rotationDeg = 20;

    const progressBars = [
        { value: 75, strokeWidth: 10, color: '#2F2F2F' },
        { value: 65, size: 45, margin: '8%', color: '#990021', strokeWidth: 15 },
        { value: 58, size: 68, margin: '16%', color: '#828282', strokeWidth: 12 },
    ];

    const legends = [
        { color: '#2F2F2F', text: 'ON GROUND' },
        { color: '#828282', text: 'PIPELINE' },
        { color: '#990021', text: 'USED' },
    ];
    return (
        <Box sx={{ display: 'flex', mt: 2, flexDirection: 'column', marginLeft: '80px' }}>
            {open && (
                <Box sx={{ display: 'flex', mt: 2 }}>
                    <Card
                        sx={{
                            p: 2,
                            m: 1,
                            boxShadow: 'none',
                            border: '1px solid #E1E3E6',
                            maxHeight: '70px',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                            <Box sx={{ width: 200 }}>
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
                            m: 1,
                            boxShadow: 'none',
                            border: '1px solid #E1E3E6',
                            maxHeight: '70px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                gap: '10px',
                                marginTop: '10px',
                            }}
                        >
                            <Typography sx={{ fontSize: '12px' }}>
                                AVAILABLE <br /> INVENTORY
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: 55,
                                        height: 55,
                                        transform: `rotate(${rotationDeg}deg)`,
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
                            </Box>
                        </Box>
                    </Card>

                    <Card
                        sx={{
                            p: 2,
                            m: 1,
                            boxShadow: 'none',
                            border: '1px solid #E1E3E6',
                            maxHeight: '70px',
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
                            <Box sx={{ width: 100 }}>
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
                            m: 1,
                            boxShadow: 'none',
                            border: '1px solid #E1E3E6',
                            maxHeight: '70px',
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
                            m: 1,
                            boxShadow: 'none',
                            border: '1px solid #E1E3E6',
                            maxHeight: '70px',
                        }}
                    >
                        <Typography>Card 5</Typography>
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
