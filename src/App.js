import './App.css';
import SimpleCircleProgressBar from './Components/Atoms/SimpleCircleProgressBar/SimpleCircleProgressBar';
import Card from './Components/Molecules/Card/Card';
import SimpleProgressBar from './Components/Atoms/SimpleProgressBar/SimpleProgressBar';
import { useState } from 'react';
import './Components/Atoms/SimpleProgressBar/SimpleProgressBar.css';
import * as React from 'react';
import { ChartContainer, BarPlot } from '@mui/x-charts';
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
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Card>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '200px' }}>
                        <p style={{ fontSize: '12px' }}>INCOMING VEHICLES THIS WEEK/MONTH</p>
                        <p style={{ fontSize: '14px' }}>
                            <b>08</b>
                        </p>
                    </div>
                    <SimpleCircleProgressBar value={60} />
                </div>
            </Card>
            <Card>card 2</Card>
            <Card>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '100px' }}>
                        <p style={{ fontSize: '14px' }}>UNITS SOLD THIS MONTH</p>
                        <p style={{ fontSize: '14px' }}>
                            <b>{progress}</b>
                        </p>
                    </div>

                    <div className='progress-container'>
                        <div className='tooltip' style={{ left: tooltipPosition, bottom: '160%' }}>
                            {progress}%<div className='tooltip-arrow'></div>
                        </div>
                        <SimpleProgressBar completed={progress} targetText='Target' />
                    </div>
                </div>
            </Card>
            <Card>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        gap: '20px',
                        bottom: '40px',
                    }}
                >
                    <div style={{ width: '30px' }}>
                        <p style={{ fontSize: '14px' }}>AGING INVENTORY</p>
                        <p style={{ fontSize: '14px' }}>
                            <b>35 DAYS</b>
                        </p>
                    </div>
                    <ChartContainer
                        width={170}
                        height={170}
                        series={[{ data: uData, label: 'uv', type: 'bar' }]}
                        xAxis={[{ scaleType: 'band', data: xLabels }]}
                    >
                        {uData.map((dataPoint, index) => (
                            <BarPlot
                                key={xLabels[index]}
                                dataKey={xLabels[index]}
                                fill={barColors[index % barColors.length]}
                                style={{ borderRadius: '20px' }}
                            />
                        ))}
                    </ChartContainer>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            {dayRanges.map((range, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        fontSize: '10px',
                                    }}
                                >
                                    <span
                                        style={{
                                            width: '10px',
                                            height: '10px',
                                            display: 'flex',
                                            borderRadius: '10%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: range.color,
                                            color: 'white',
                                        }}
                                    />
                                    {range.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
            <Card>
                <p>Card 5</p>
            </Card>
        </div>
    );
}

export default App;
