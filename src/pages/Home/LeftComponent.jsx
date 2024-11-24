import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ArrowRight } from 'lucide-react';

const LeftComponent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate(); // Initialize navigate hook

    const handleNavigate = () => {
        navigate('/collab'); // Redirect to CollabHome
    };

    return (
        <div className="left-container flex justify-center items-center bg-dusk relative">
            <div className="items-left flex flex-col items-center gap-5 text-light-purple">
                <h1 className="text-pale-blue text-4xl">SynCode</h1>
                <h3 className="text-light-purple-alt">
                    Code. Collaborate. Communicate
                </h3>
                
                {/* Main container for button with overflow handling */}
                <div className="relative w-full overflow-hidden">
                    {/* Workspace button with slide-in animation */}
                    <div className={`relative w-full flex justify-center transition-all duration-500 ${
                        isVisible 
                            ? 'opacity-100 translate-x-0' 
                            : 'opacity-0 -translate-x-full pointer-events-none'
                    }`}>
                        <button 
                            onClick={handleNavigate} // Add navigation on click
                            className="flex items-center justify-center bg-coral cursor-pointer h-12 w-[90%] rounded-md border-none text-xl hover:shadow-lg text-night-blue group">
                            <span className="flex items-center gap-2">
                                Collaborative Workspace
                                <ArrowRight size={20} />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Toggle button positioned on the top left */}
            <button 
                onClick={() => setIsVisible(!isVisible)}
                className={`absolute top-4 left-4 p-2 rounded-lg bg-coral text-night-blue 
                    hover:shadow-lg transition-all duration-300 ${
                        isVisible ? 'translate-x-0 rotate-180' : '-translate-x-1 rotate-0'
                    }`}
            >
                <ArrowRight 
                    className="transition-transform duration-300"
                    size={20}
                />
            </button>
        </div>
    );
};

export default LeftComponent;
