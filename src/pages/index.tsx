import React from 'react';
import Icons from '../components/Icons/Icons';

const Index: React.FC = () => {
    return (
        <div className="">
            <Icons />
            <div className="absolute top-0 left-0 w-full flex justify-between items-center p-5">
                <div className="flex flex-col items-start">
                    <h1 className="text-xl font-bold mb-12 text-white">Lilysaria Gaska</h1>
                </div>
                <div className="absolute left-1/2 top-0 transform -translate-x-1/2 text-center">
                    <h2 className="text-lg text-white">Web Developer</h2>
                    <p className="text-sm mt-1 text-white">Murphy, Oregon</p>
                </div>
            </div>
        </div> 
    );
}

export default Index;
