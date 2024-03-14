import React from 'react';

// Reusable Card component with children prop for content
const Card = ({ children }) => {
    return (
        <div style={{
            border: '1px solid #E1E3E6', // Border color
            backgroundColor: '#FFFFFF', // Background color
            borderRadius: '8px', // Optional: adds rounded corners
            padding: '20px', // Inner spacing
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Optional: adds a subtle shadow
            margin: '10px', // Outer spacing
            maxHeight: '75px'
        }}>
            {children}
        </div>
    );
};

export default Card;
