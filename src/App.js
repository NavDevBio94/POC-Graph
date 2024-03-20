import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import SimpleCircleProgressBar from './Components/Atoms/SimpleCircleProgressBar/SimpleCircleProgressBar';
import SimpleProgressBar from './Components/Atoms/SimpleProgressBar/SimpleProgressBar';
import './App.css';
import { BarChart, Bar, Cell } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
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

    const progressBars = [
        { value: 80, strokeWidth: 10, color: '#2F2F2F' },
        { value: 65, size: 48, margin: '8%', color: '#990021', strokeWidth: 18 },
        { value: 58, size: 72, margin: '12%', color: '#828282', strokeWidth: 13 },
    ];

    const legends = [
        { color: '#2F2F2F', text: 'ON GROUND' },
        { color: '#828282', text: 'PIPELINE' },
        { color: '#990021', text: 'USED' },
    ];
    const size = 82; // Diameter of the circle
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const dotRadius = radius - 10; // Adjust this value to move dots towards the center

    const circumference = 2 * Math.PI * radius;

    const dashArray = circumference.toFixed(2);
    const dashOffset = (((100 - 45) / 100) * circumference).toFixed(2);

    const containerStyle = {
        width: `${size}px`,
        height: `${size}px`, // Full height for circular appearance
        overflow: 'hidden',
        borderRadius: '20%', // Fully round to only show the intended part as filled
        position: 'relative', // Needed to position the needle correctly
    };
    const needleLength = radius - 10; // Length of the needle from center

    const newNeedleLength = needleLength * 1.5;

    const progressAngle = (72 / 100) * 360; // Progress converted to angle

    const svgStyle = {
        transform: 'rotate(140deg) scale(1, 1)', // Adjusted rotation to start progress from the left
        overflow: 'visible',
    };

    // Function to calculate dot positions
    const getDotPosition = (index, numDots) => {
        const angle = (index / numDots) * 2 * Math.PI; // Angle in radians
        const x = size / 2 + dotRadius * Math.cos(angle - Math.PI / 2); // Adjusted by -90 degrees to start from top
        const y = size / 2 + dotRadius * Math.sin(angle - Math.PI / 2);
        return { x, y };
    };

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
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px',
                            }}
                        >
                            <Box>
                                <Typography sx={{ fontSize: '13px' }}>RDR RATE</Typography>
                                <Typography sx={{ fontSize: '18px' }}>
                                    <b>61%</b>
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography
                                    sx={{
                                        fontSize: '12px',
                                        position: 'relative',
                                        top: '20px',
                                        right: '5px',
                                    }}
                                >
                                    RDR
                                </Typography>

                                <div style={containerStyle}>
                                    <svg
                                        width={size}
                                        height={size}
                                        style={svgStyle}
                                        viewBox={`0 0 ${size} ${size}`}
                                    >
                                        <defs>
                                            <linearGradient
                                                id='gradient'
                                                x1='0%'
                                                y1='0%'
                                                x2='100%'
                                                y2='0%'
                                            >
                                                <stop offset='20%' stopColor='#990021' />
                                                <stop offset='80%' stopColor='black' />
                                            </linearGradient>
                                        </defs>

                                        <path
                                            d={`
        M ${size / 2 + radius * Math.cos(Math.PI / 6)} ${size / 2 + radius * Math.sin(Math.PI / 6)}
        A ${radius} ${radius} 0 1 1 ${45 / 2 + 12 * Math.cos(-Math.PI / 6)} ${
                                                45 / 2 + radius * Math.sin(-Math.PI / 6)
                                            }
    `}
                                            fill='none'
                                            stroke='#E0E0E0'
                                            strokeWidth={`${strokeWidth}px`}
                                            strokeLinecap='round'
                                        />

                                        {/* Filled progress */}
                                        <circle
                                            cx={size / 2}
                                            cy={size / 2}
                                            r={radius}
                                            fill='none'
                                            stroke='url(#gradient)'
                                            strokeWidth={`${strokeWidth}px`}
                                            strokeDasharray={dashArray}
                                            strokeDashoffset={dashOffset}
                                            strokeLinecap='round'
                                            style={{
                                                transition: 'stroke-dashoffset 0.3s ease-in-out',
                                            }}
                                        />

                                        {/* Gauge Dots */}
                                        {Array.from({ length: 21 }).map((_, index) => {
                                            const { x, y } = getDotPosition(index, 21);
                                            // Since the rotation starts at 140 degrees, adjust the angle accordingly
                                            const angle = (index / 21) * 360 + 250;
                                            // Determine the correct range to exclude dots from the visual bottom
                                            // This range is based on your setup and needs to be aligned with the rotated view
                                            // Adjust the range to exclude dots from the bottom considering the 140-degree rotation
                                            if (angle > 200 && angle < 340) return null; // Adjust this range as needed for your visual bottom

                                            return (
                                                <circle
                                                    key={index}
                                                    cx={x}
                                                    cy={y}
                                                    r='2.0'
                                                    fill='#D9D9D9'
                                                    strokeWidth='2.0'
                                                />
                                            );
                                        })}

                                        {/* Needle (Adjust the needle length and position as necessary) */}
                                        <line
                                            x1={size / 2}
                                            y1={size / 2}
                                            x2={
                                                size / 2 +
                                                newNeedleLength *
                                                    Math.cos((progressAngle - 35) * (Math.PI / 180)) // Using the new needle length
                                            }
                                            y2={
                                                size / 2 +
                                                newNeedleLength *
                                                    Math.sin((progressAngle - 90) * (Math.PI / 180)) // Using the new needle length
                                            }
                                            stroke='black'
                                            strokeWidth='3.5' // Adjust thickness as needed
                                        />
                                        <circle
                                            cx={size / 2}
                                            cy={size / 2}
                                            r='5' // Adjust the size as needed
                                            fill='lightgrey'
                                        />

                                        {/* Middle of the Needle Dot */}
                                    </svg>
                                </div>

                                <Typography
                                    sx={{
                                        fontSize: '12px',
                                        position: 'relative',
                                        top: '20px',
                                        left: '5px',
                                    }}
                                >
                                    PRESOLD
                                </Typography>
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
