import React from 'react';

function Loading() {
    return (
        <div className="flex w-full h-screen justify-center items-center">
            <div className="border-4 border-black border-r-transparent  animate-spin inline-block w-10 h-10 rounded-full">
            </div>
        </div>
    )
}

export default Loading;
