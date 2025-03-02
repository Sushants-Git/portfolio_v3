import ComesInUnderline from "./fancy-components/underline-left-to-right";

function LinkIcon({
    href,
    className,
    text,
    hide = true,
    children,
}: {
    href: string;
    className?: string;
    text?: string;
    hide?: boolean;
    children: React.ReactNode;
}) {
    const parts = text?.split(" ");
    let name = "";
    let decorator = "";

    if (parts) {
        [name, decorator] = parts;
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center ${className}`}
        >
            {children}
            <span className={hide ? "hidden sm:inline" : ""}>
                {text ? (
                    <h1 className="text-sm">
                        <ComesInUnderline label={name} /> {decorator}
                    </h1>
                ) : null}
            </span>
        </a>
    );
}

export default LinkIcon;
