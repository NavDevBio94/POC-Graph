import React from 'react';
import { BarChart, Bar, Cell } from 'recharts';
import Box from '@mui/material/Box';

const CustomBarChart = ({ data, colorRanges }) => {
 
    const getColorForValue = (value) => {
        if (value <= 40) return '#2F2F2F';
        if (value <= 70) return 'pink';
        if (value <= 100) return '#990021';
        return '#ABABAB';
    };

    // Custom Legend Component
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
        <>
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
        </>
    );
};

export default CustomBarChart;
