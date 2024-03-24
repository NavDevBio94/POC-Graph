import Card from '@mui/material/Card';
import React from 'react';

const cardStyle = {
    p: 2,
    boxShadow: 'none',
    border: '1px solid #E1E3E6',
    maxHeight: '70px',
    borderRadius: '7px',
    width: '260px',
};

const DashboardCard = ({ children }) => (
    <Card sx={cardStyle}>
        {children}
    </Card>
);
export default DashboardCard;