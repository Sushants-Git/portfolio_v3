function Box({ text, children }: { text: React.ReactNode; children: React.ReactNode }) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col space-y-1.5 p-6 py-0">
                <h3 className="text-base font-normal leading-none tracking-tight -mb-1">
                    <span className="relative z-10 bg-white px-2 text-lili-red">
                        {text}
                    </span>
                </h3>
            </div>
            <div className="relative p-3 md:p-6 rounded-xl shadow-tooltip">
                {children}
            </div>
        </div>
    );
}

export default Box;
