import React, { useEffect, useState } from "react";

interface SpinnerFrame {
    animation: string;
    state: string;
}

const frames: SpinnerFrame[] = [
    { animation: "⟨ ◠◡◠ ⟩", state: "fetch" },
    { animation: "⟨ ◡◠◡ ⟩", state: "load" },
    { animation: "⟨ ◠◡◠ ⟩", state: "read" },
    { animation: "⟨ ◡◠◡ ⟩", state: "sync" },

    { animation: "[←↔→]", state: "data" },
    { animation: "[→↔←]", state: "sort" },
    { animation: "[←↔→]", state: "prep" },
    { animation: "[→↔←]", state: "init" },
];

interface LoadingSpinnerProps {
    text?: string;
    className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    text = "",
    className = "",
}) => {
    const [frameIndex, setFrameIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFrameIndex((prev) => (prev + 1) % frames.length);
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const { animation } = frames[frameIndex];
    const color = "text-lili-red";

    return (
        <div className={`flex items-center gap-2 font-mono ${className}`}>
            <span className={color}>
                {animation}
            </span>
            {text && <span className="text-lexend-grey text-sm">{text}</span>}
        </div>
    );
};

export default LoadingSpinner;
