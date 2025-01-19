import ComesInUnderline from "./fancy-components/underline-left-to-right";

function Link({ href, name }: { href: string; name: string }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer">
            <ComesInUnderline label={name} />
        </a>
    );
}

export default Link;
