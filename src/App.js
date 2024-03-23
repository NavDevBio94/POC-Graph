import { useState, useEffect } from 'react';
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
import React from 'react';
import { data, colorRanges, legends, progressBars, tickPaths } from '.././src/Utils/Data';

function App() {
    const [progress] = useState(75);
    const tooltipPosition = `calc(${progress}% - 10px)`;
    const [open, setOpenClose] = useState(true);
    const [rotate, setRotate] = useState(0);
    const [endAngleDegrees] = useState(40);

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
                                    <svg
                                        width={'180'}
                                        height={'85'}
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <defs>
                                            <linearGradient
                                                id='progressGradient'
                                                x1='0%'
                                                y1='0%'
                                                x2='100%'
                                                y2='0%'
                                            >
                                                <stop
                                                    offset='0%'
                                                    style={{ stopColor: '#2F2F2F', stopOpacity: 1 }}
                                                />
                                                <stop
                                                    offset='100%'
                                                    style={{ stopColor: '#990021', stopOpacity: 1 }}
                                                />
                                            </linearGradient>
                                        </defs>

                                        <path
                                            d={circlePath}
                                            className='radial-slider__content-wrapper__track-background'
                                            stroke='#EEEEEE'
                                            strokeWidth='6'
                                        />

                                        <path
                                            d={progressPath}
                                            className='radial-slider__content-wrapper__progress'
                                            stroke='url(#progressGradient)'
                                            strokeWidth='6'
                                        />

                                        {tickPaths.map((tick, index) => (
                                            <path
                                                key={index}
                                                d={tick.d}
                                                stroke={tick.stroke}
                                                strokeWidth='2'
                                                strokeLinecap='round'
                                            />
                                        ))}
                                        <ellipse
                                            cx='89.5'
                                            cy='34.5'
                                            rx='3'
                                            ry='3.5'
                                            fill='#D9D9D9'
                                        />
                                        <ellipse
                                            cx='89.5'
                                            cy='34.5'
                                            rx='3'
                                            ry='3.5'
                                            fill='#D9D9D9'
                                        />
                                        <path
                                            d='M100.012 16.6778C100.171 16.4429 100.487 16.3748 100.728 16.5234C100.97 16.672 101.052 16.9845 100.915 17.2327L90.8109 35.4414C90.4085 36.1666 89.4823 36.4096 88.7756 35.9754C88.0689 35.5412 87.8673 34.6051 88.3325 33.9184L100.012 16.6778Z'
                                            fill='#39056C'
                                            transform={`rotate(${rotate}, 89, 35)`}
                                        />

                                        <circle cx='90' cy='34.5' r='0.5' fill='white' />
                                        <circle cx='90' cy='34.5' r='0.5' fill='white' />
                                        <path
                                            d='M125.732 54V46.3H128.262C128.864 46.3 129.359 46.399 129.747 46.597C130.136 46.795 130.422 47.0627 130.605 47.4C130.796 47.7373 130.891 48.1187 130.891 48.544C130.891 48.962 130.8 49.3397 130.616 49.677C130.433 50.0143 130.147 50.2857 129.758 50.491C129.37 50.689 128.871 50.788 128.262 50.788H126.656V54H125.732ZM126.656 50.007H128.24C128.856 50.007 129.293 49.8787 129.549 49.622C129.813 49.358 129.945 48.9987 129.945 48.544C129.945 48.082 129.813 47.7227 129.549 47.466C129.293 47.202 128.856 47.07 128.24 47.07H126.656V50.007ZM132.542 54V46.3H135.028C135.63 46.3 136.121 46.399 136.502 46.597C136.884 46.795 137.166 47.0663 137.349 47.411C137.533 47.7557 137.624 48.137 137.624 48.555C137.624 49.039 137.492 49.4753 137.228 49.864C136.972 50.2527 136.568 50.5277 136.018 50.689L137.701 54H136.612L135.05 50.821H134.984H133.466V54H132.542ZM133.466 50.095H134.962C135.556 50.095 135.989 49.952 136.26 49.666C136.532 49.38 136.667 49.0133 136.667 48.566C136.667 48.1113 136.532 47.752 136.26 47.488C135.996 47.2167 135.56 47.081 134.951 47.081H133.466V50.095ZM139.503 54V46.3H144.266V47.059H140.427V49.743H143.936V50.491H140.427V53.241H144.266V54H139.503ZM148.605 54.132C148.04 54.132 147.549 54.0293 147.131 53.824C146.713 53.6187 146.39 53.3327 146.163 52.966C145.936 52.5993 145.822 52.174 145.822 51.69H146.79C146.79 51.9907 146.86 52.2693 146.999 52.526C147.138 52.7753 147.34 52.977 147.604 53.131C147.875 53.2777 148.209 53.351 148.605 53.351C149.126 53.351 149.529 53.2263 149.815 52.977C150.101 52.7277 150.244 52.416 150.244 52.042C150.244 51.734 150.178 51.4883 150.046 51.305C149.914 51.1143 149.734 50.9603 149.507 50.843C149.287 50.7257 149.03 50.623 148.737 50.535C148.451 50.447 148.15 50.348 147.835 50.238C147.241 50.0327 146.801 49.7797 146.515 49.479C146.229 49.171 146.086 48.7713 146.086 48.28C146.079 47.8693 146.174 47.5063 146.372 47.191C146.57 46.8683 146.849 46.619 147.208 46.443C147.575 46.2597 148.007 46.168 148.506 46.168C148.997 46.168 149.423 46.2597 149.782 46.443C150.149 46.6263 150.431 46.8793 150.629 47.202C150.834 47.5247 150.941 47.8913 150.948 48.302H149.98C149.98 48.0893 149.925 47.8803 149.815 47.675C149.705 47.4623 149.536 47.29 149.309 47.158C149.089 47.026 148.81 46.96 148.473 46.96C148.055 46.9527 147.71 47.059 147.439 47.279C147.175 47.499 147.043 47.8033 147.043 48.192C147.043 48.522 147.135 48.775 147.318 48.951C147.509 49.127 147.773 49.2737 148.11 49.391C148.447 49.501 148.836 49.6293 149.276 49.776C149.643 49.908 149.973 50.062 150.266 50.238C150.559 50.414 150.787 50.6413 150.948 50.92C151.117 51.1987 151.201 51.5543 151.201 51.987C151.201 52.3537 151.106 52.702 150.915 53.032C150.724 53.3547 150.435 53.6187 150.046 53.824C149.665 54.0293 149.184 54.132 148.605 54.132ZM156.449 54.132C155.694 54.132 155.03 53.967 154.458 53.637C153.894 53.2997 153.45 52.8303 153.127 52.229C152.812 51.6277 152.654 50.9347 152.654 50.15C152.654 49.3653 152.812 48.676 153.127 48.082C153.45 47.4807 153.894 47.0113 154.458 46.674C155.03 46.3367 155.694 46.168 156.449 46.168C157.212 46.168 157.876 46.3367 158.44 46.674C159.012 47.0113 159.456 47.4807 159.771 48.082C160.087 48.676 160.244 49.3653 160.244 50.15C160.244 50.9347 160.087 51.6277 159.771 52.229C159.456 52.8303 159.012 53.2997 158.44 53.637C157.876 53.967 157.212 54.132 156.449 54.132ZM156.449 53.318C157.014 53.318 157.509 53.1933 157.934 52.944C158.367 52.6873 158.701 52.3243 158.935 51.855C159.177 51.3783 159.298 50.81 159.298 50.15C159.298 49.49 159.177 48.9253 158.935 48.456C158.701 47.9867 158.367 47.6273 157.934 47.378C157.509 47.1213 157.014 46.993 156.449 46.993C155.885 46.993 155.386 47.1213 154.953 47.378C154.528 47.6273 154.194 47.9867 153.952 48.456C153.718 48.9253 153.6 49.49 153.6 50.15C153.6 50.81 153.718 51.3783 153.952 51.855C154.194 52.3243 154.528 52.6873 154.953 52.944C155.386 53.1933 155.885 53.318 156.449 53.318ZM162.017 54V46.3H162.941V53.263H166.527V54H162.017ZM168.237 54V46.3H170.602C171.958 46.3 172.956 46.6447 173.594 47.334C174.239 48.0233 174.562 48.9693 174.562 50.172C174.562 51.3527 174.239 52.2877 173.594 52.977C172.956 53.659 171.958 54 170.602 54H168.237ZM169.161 53.23H170.58C171.328 53.23 171.922 53.109 172.362 52.867C172.809 52.6177 173.128 52.2657 173.319 51.811C173.509 51.349 173.605 50.8027 173.605 50.172C173.605 49.5267 173.509 48.973 173.319 48.511C173.128 48.049 172.809 47.6933 172.362 47.444C171.922 47.1947 171.328 47.07 170.58 47.07H169.161V53.23Z'
                                            fill='#474747'
                                        />
                                        <path
                                            d='M125.732 54V46.3H128.262C128.864 46.3 129.359 46.399 129.747 46.597C130.136 46.795 130.422 47.0627 130.605 47.4C130.796 47.7373 130.891 48.1187 130.891 48.544C130.891 48.962 130.8 49.3397 130.616 49.677C130.433 50.0143 130.147 50.2857 129.758 50.491C129.37 50.689 128.871 50.788 128.262 50.788H126.656V54H125.732ZM126.656 50.007H128.24C128.856 50.007 129.293 49.8787 129.549 49.622C129.813 49.358 129.945 48.9987 129.945 48.544C129.945 48.082 129.813 47.7227 129.549 47.466C129.293 47.202 128.856 47.07 128.24 47.07H126.656V50.007ZM132.542 54V46.3H135.028C135.63 46.3 136.121 46.399 136.502 46.597C136.884 46.795 137.166 47.0663 137.349 47.411C137.533 47.7557 137.624 48.137 137.624 48.555C137.624 49.039 137.492 49.4753 137.228 49.864C136.972 50.2527 136.568 50.5277 136.018 50.689L137.701 54H136.612L135.05 50.821H134.984H133.466V54H132.542ZM133.466 50.095H134.962C135.556 50.095 135.989 49.952 136.26 49.666C136.532 49.38 136.667 49.0133 136.667 48.566C136.667 48.1113 136.532 47.752 136.26 47.488C135.996 47.2167 135.56 47.081 134.951 47.081H133.466V50.095ZM139.503 54V46.3H144.266V47.059H140.427V49.743H143.936V50.491H140.427V53.241H144.266V54H139.503ZM148.605 54.132C148.04 54.132 147.549 54.0293 147.131 53.824C146.713 53.6187 146.39 53.3327 146.163 52.966C145.936 52.5993 145.822 52.174 145.822 51.69H146.79C146.79 51.9907 146.86 52.2693 146.999 52.526C147.138 52.7753 147.34 52.977 147.604 53.131C147.875 53.2777 148.209 53.351 148.605 53.351C149.126 53.351 149.529 53.2263 149.815 52.977C150.101 52.7277 150.244 52.416 150.244 52.042C150.244 51.734 150.178 51.4883 150.046 51.305C149.914 51.1143 149.734 50.9603 149.507 50.843C149.287 50.7257 149.03 50.623 148.737 50.535C148.451 50.447 148.15 50.348 147.835 50.238C147.241 50.0327 146.801 49.7797 146.515 49.479C146.229 49.171 146.086 48.7713 146.086 48.28C146.079 47.8693 146.174 47.5063 146.372 47.191C146.57 46.8683 146.849 46.619 147.208 46.443C147.575 46.2597 148.007 46.168 148.506 46.168C148.997 46.168 149.423 46.2597 149.782 46.443C150.149 46.6263 150.431 46.8793 150.629 47.202C150.834 47.5247 150.941 47.8913 150.948 48.302H149.98C149.98 48.0893 149.925 47.8803 149.815 47.675C149.705 47.4623 149.536 47.29 149.309 47.158C149.089 47.026 148.81 46.96 148.473 46.96C148.055 46.9527 147.71 47.059 147.439 47.279C147.175 47.499 147.043 47.8033 147.043 48.192C147.043 48.522 147.135 48.775 147.318 48.951C147.509 49.127 147.773 49.2737 148.11 49.391C148.447 49.501 148.836 49.6293 149.276 49.776C149.643 49.908 149.973 50.062 150.266 50.238C150.559 50.414 150.787 50.6413 150.948 50.92C151.117 51.1987 151.201 51.5543 151.201 51.987C151.201 52.3537 151.106 52.702 150.915 53.032C150.724 53.3547 150.435 53.6187 150.046 53.824C149.665 54.0293 149.184 54.132 148.605 54.132ZM156.449 54.132C155.694 54.132 155.03 53.967 154.458 53.637C153.894 53.2997 153.45 52.8303 153.127 52.229C152.812 51.6277 152.654 50.9347 152.654 50.15C152.654 49.3653 152.812 48.676 153.127 48.082C153.45 47.4807 153.894 47.0113 154.458 46.674C155.03 46.3367 155.694 46.168 156.449 46.168C157.212 46.168 157.876 46.3367 158.44 46.674C159.012 47.0113 159.456 47.4807 159.771 48.082C160.087 48.676 160.244 49.3653 160.244 50.15C160.244 50.9347 160.087 51.6277 159.771 52.229C159.456 52.8303 159.012 53.2997 158.44 53.637C157.876 53.967 157.212 54.132 156.449 54.132ZM156.449 53.318C157.014 53.318 157.509 53.1933 157.934 52.944C158.367 52.6873 158.701 52.3243 158.935 51.855C159.177 51.3783 159.298 50.81 159.298 50.15C159.298 49.49 159.177 48.9253 158.935 48.456C158.701 47.9867 158.367 47.6273 157.934 47.378C157.509 47.1213 157.014 46.993 156.449 46.993C155.885 46.993 155.386 47.1213 154.953 47.378C154.528 47.6273 154.194 47.9867 153.952 48.456C153.718 48.9253 153.6 49.49 153.6 50.15C153.6 50.81 153.718 51.3783 153.952 51.855C154.194 52.3243 154.528 52.6873 154.953 52.944C155.386 53.1933 155.885 53.318 156.449 53.318ZM162.017 54V46.3H162.941V53.263H166.527V54H162.017ZM168.237 54V46.3H170.602C171.958 46.3 172.956 46.6447 173.594 47.334C174.239 48.0233 174.562 48.9693 174.562 50.172C174.562 51.3527 174.239 52.2877 173.594 52.977C172.956 53.659 171.958 54 170.602 54H168.237ZM169.161 53.23H170.58C171.328 53.23 171.922 53.109 172.362 52.867C172.809 52.6177 173.128 52.2657 173.319 51.811C173.509 51.349 173.605 50.8027 173.605 50.172C173.605 49.5267 173.509 48.973 173.319 48.511C173.128 48.049 172.809 47.6933 172.362 47.444C171.922 47.1947 171.328 47.07 170.58 47.07H169.161V53.23Z'
                                            fill='#474747'
                                        />
                                        <path
                                            d='M18.5239 52V44.3H21.0099C21.6112 44.3 22.1026 44.399 22.4839 44.597C22.8652 44.795 23.1476 45.0663 23.3309 45.411C23.5142 45.7557 23.6059 46.137 23.6059 46.555C23.6059 47.039 23.4739 47.4753 23.2099 47.864C22.9532 48.2527 22.5499 48.5277 21.9999 48.689L23.6829 52H22.5939L21.0319 48.821H20.9659H19.4479V52H18.5239ZM19.4479 48.095H20.9439C21.5379 48.095 21.9706 47.952 22.2419 47.666C22.5132 47.38 22.6489 47.0133 22.6489 46.566C22.6489 46.1113 22.5132 45.752 22.2419 45.488C21.9779 45.2167 21.5416 45.081 20.9329 45.081H19.4479V48.095ZM25.4844 52V44.3H27.8494C29.2061 44.3 30.2034 44.6447 30.8414 45.334C31.4867 46.0233 31.8094 46.9693 31.8094 48.172C31.8094 49.3527 31.4867 50.2877 30.8414 50.977C30.2034 51.659 29.2061 52 27.8494 52H25.4844ZM26.4084 51.23H27.8274C28.5754 51.23 29.1694 51.109 29.6094 50.867C30.0567 50.6177 30.3757 50.2657 30.5664 49.811C30.7571 49.349 30.8524 48.8027 30.8524 48.172C30.8524 47.5267 30.7571 46.973 30.5664 46.511C30.3757 46.049 30.0567 45.6933 29.6094 45.444C29.1694 45.1947 28.5754 45.07 27.8274 45.07H26.4084V51.23ZM33.5836 52V44.3H36.0696C36.6709 44.3 37.1623 44.399 37.5436 44.597C37.9249 44.795 38.2073 45.0663 38.3906 45.411C38.5739 45.7557 38.6656 46.137 38.6656 46.555C38.6656 47.039 38.5336 47.4753 38.2696 47.864C38.0129 48.2527 37.6096 48.5277 37.0596 48.689L38.7426 52H37.6536L36.0916 48.821H36.0256H34.5076V52H33.5836ZM34.5076 48.095H36.0036C36.5976 48.095 37.0303 47.952 37.3016 47.666C37.5729 47.38 37.7086 47.0133 37.7086 46.566C37.7086 46.1113 37.5729 45.752 37.3016 45.488C37.0376 45.2167 36.6013 45.081 35.9926 45.081H34.5076V48.095Z'
                                            fill='#474747'
                                        />
                                        <path
                                            d='M18.5239 52V44.3H21.0099C21.6112 44.3 22.1026 44.399 22.4839 44.597C22.8652 44.795 23.1476 45.0663 23.3309 45.411C23.5142 45.7557 23.6059 46.137 23.6059 46.555C23.6059 47.039 23.4739 47.4753 23.2099 47.864C22.9532 48.2527 22.5499 48.5277 21.9999 48.689L23.6829 52H22.5939L21.0319 48.821H20.9659H19.4479V52H18.5239ZM19.4479 48.095H20.9439C21.5379 48.095 21.9706 47.952 22.2419 47.666C22.5132 47.38 22.6489 47.0133 22.6489 46.566C22.6489 46.1113 22.5132 45.752 22.2419 45.488C21.9779 45.2167 21.5416 45.081 20.9329 45.081H19.4479V48.095ZM25.4844 52V44.3H27.8494C29.2061 44.3 30.2034 44.6447 30.8414 45.334C31.4867 46.0233 31.8094 46.9693 31.8094 48.172C31.8094 49.3527 31.4867 50.2877 30.8414 50.977C30.2034 51.659 29.2061 52 27.8494 52H25.4844ZM26.4084 51.23H27.8274C28.5754 51.23 29.1694 51.109 29.6094 50.867C30.0567 50.6177 30.3757 50.2657 30.5664 49.811C30.7571 49.349 30.8524 48.8027 30.8524 48.172C30.8524 47.5267 30.7571 46.973 30.5664 46.511C30.3757 46.049 30.0567 45.6933 29.6094 45.444C29.1694 45.1947 28.5754 45.07 27.8274 45.07H26.4084V51.23ZM33.5836 52V44.3H36.0696C36.6709 44.3 37.1623 44.399 37.5436 44.597C37.9249 44.795 38.2073 45.0663 38.3906 45.411C38.5739 45.7557 38.6656 46.137 38.6656 46.555C38.6656 47.039 38.5336 47.4753 38.2696 47.864C38.0129 48.2527 37.6096 48.5277 37.0596 48.689L38.7426 52H37.6536L36.0916 48.821H36.0256H34.5076V52H33.5836ZM34.5076 48.095H36.0036C36.5976 48.095 37.0303 47.952 37.3016 47.666C37.5729 47.38 37.7086 47.0133 37.7086 46.566C37.7086 46.1113 37.5729 45.752 37.3016 45.488C37.0376 45.2167 36.6013 45.081 35.9926 45.081H34.5076V48.095Z'
                                            fill='#474747'
                                        />
                                    </svg>
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
