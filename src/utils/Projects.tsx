import Link from "./Link";

export default function Projects() {
    return (
        <>
            <h1 className="text-2xl font-bold">Projects</h1>
            <section className="flex flex-col gap-6 mt-4">
                <Naash />
                <Locus />
                <DejaVu />
            </section>
        </>
    );
}

function DejaVu() {
    return (
        <div>
            <h2 className="highlight-color max-w-max">
                <Link
                    href="https://github.com/Sushants-Git/Deja-Vu"
                    name="Deja-Vu"
                />
            </h2>
            <ul className="list-disc pl-4 flex gap-[0.15rem] flex-col">
                <li className="text-justify">
                    AI powered chrome extension which offers a seamless way to
                    find bookmarks.
                </li>
                <li>Tech - Transformers.js, Chrome extension </li>
                <li>
                    Links -{" "}
                    <span className="highlight-color">
                        <Link
                            name="Video"
                            href="https://www.youtube.com/watch?v=1E9y_XeGhkY"
                        />
                        {"  "}
                        <Link
                            name="GitHub"
                            href="https://github.com/Sushants-Git/Deja-Vu"
                        />{" "}
                    </span>
                </li>
            </ul>
        </div>
    );
}

function Locus() {
    return (
        <div>
            <h2 className="highlight-color max-w-max">
                <Link
                    href="https://github.com/Sushants-Git/locus"
                    name="Locus"
                />
            </h2>
            <ul className="list-disc pl-4 flex flex-col gap-[0.15rem]">
                <li className="text-justify">
                    Intelligent activity tracker that helps you understand and
                    improve your focus habits.
                </li>
                <li>Tech - Tauri, Rust, React, Linux</li>
                <li>
                    Links -{" "}
                    <span className="highlight-color">
                        <Link
                            name="Video"
                            href="https://www.youtube.com/watch?v=qW-37O67yW0"
                        />{" "}
                        <Link
                            name="GitHub"
                            href="https://github.com/Sushants-Git/locus"
                        />{" "}
                    </span>
                </li>
            </ul>
        </div>
    );
}

function Naash() {
    return (
        <div>
            <h2 className="highlight-color max-w-max">
                <Link
                    href="https://github.com/Sushants-Git/naash"
                    name="NAASH"
                />
            </h2>
            <ul className="list-disc pl-4 flex gap-[0.15rem] flex-col">
                <li className="mt-1 text-justify">
                    AI-powered terminal shell that enhances speed and efficiency
                    through natural language interaction, clipboard and error
                    log history.
                </li>
                <li className="text-justify">
                    Won{" "}
                    <span className="highlight-color">
                        <Link
                            href="https://devfolio.co/projects/yaash-yet-another-ai-shell-192b"
                            name="HackThisFall 2024 Virtual"
                        />
                    </span>{" "}
                    and received a prize of{" "}
                    <span className="lili-code">$1000 USD</span>.
                </li>
                <li>Tech - Node.js, CLI, AI</li>
                <li>
                    Links -{" "}
                    <span className="highlight-color">
                        <Link
                            name="Video"
                            href="https://www.youtube.com/watch?v=6xZ1Gxxiu1U"
                        />{" "}
                        <Link
                            name="GitHub"
                            href="https://github.com/Sushants-Git/naash"
                        />{" "}
                    </span>
                </li>
            </ul>
        </div>
    );
}
