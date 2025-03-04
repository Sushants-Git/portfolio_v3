import { cn } from "../lib/utils";
import ComesInUnderline from "./fancy-components/underline-left-to-right";

function Link({
    href,
    name,
    className,
}: {
    href: string;
    name: string;
    className?: string;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
        >
            <ComesInUnderline label={name} />
        </a>
    );
}

function SimpleLink({
    href,
    name,
    className,
}: {
    href: string;
    name: string;
    className?: string;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(className, "hover:underline")}
        >
            {name}
        </a>
    );
}

export { SimpleLink };
export default Link;
