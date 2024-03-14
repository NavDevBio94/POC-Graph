import React from 'react';
import ProgressBar from '@ramonak/react-progress-bar'

const SimpleProgressBar = ({ completed ,targetText }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <ProgressBar completed={completed}
                bgColor="black"
                height="8px"
                borderRadius="8px"
                baseBgColor="#e0e0de"
                labelColor="white"
                width='150px'
                labelSize="0px"
            />
            <div style={{ marginTop: '4px', fontSize:'11px' }}>
                <span>{targetText}</span>
            </div>
        </div>

    );
};

export default SimpleProgressBar;
