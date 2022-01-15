import React from 'react';

function Centered({ children }) {
    return (
        <>
            <div className="flex justify-center items-center">
                {children}
            </div>
        </>
    )
}

export default Centered;