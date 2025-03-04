import LinkIcon from "../../utils/links-icon";
import Link from "../../utils/link";
import { ClapIcon } from "../../icons/video";
import { GithubIcon } from "../../icons/github";

export default function Projects() {
    return (
        <>
            <h1>
                <span className="font-semibold text-base">Projects</span>
                <sup className="select-none text-muted-foreground text-xs ml-1">
                    (3)
                </sup>
            </h1>
            <section className="flex flex-col gap-6 mt-4 text-sm">
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
            <h2 className="max-w-max flex flex-col">
                <span>DejaVu</span>

                <span className="highlight-color flex sm:gap-1">
                    <LinkIcon
                        href="https://www.youtube.com/watch?v=1E9y_XeGhkY"
                        text="Video |"
                        hide={false}
                    >
                        <ClapIcon size={15} className="pl-0" />
                    </LinkIcon>
                    <LinkIcon
                        href="https://github.com/Sushants-Git/Deja-Vu"
                        text="Github"
                        hide={false}
                    >
                        <GithubIcon size={15} />
                    </LinkIcon>
                </span>
            </h2>

            <ul className="list-disc pl-4 flex gap-[0.15rem] flex-col">
                <li>
                    AI powered chrome extension which offers a seamless way to
                    find bookmarks.
                </li>
                <li>Tech - Transformers.js, Chrome extension </li>
            </ul>
        </div>
    );
}

function Locus() {
    return (
        <div>
            <h2 className="max-w-max flex flex-col">
                <span>Locus</span>

                <span className="highlight-color flex sm:gap-1">
                    <LinkIcon
                        href="https://www.youtube.com/watch?v=qW-37O67yW0"
                        text="Video |"
                        hide={false}
                    >
                        <ClapIcon size={15} className="pl-0" />
                    </LinkIcon>
                    <LinkIcon
                        href="https://github.com/Sushants-Git/locus"
                        text="Github"
                        hide={false}
                    >
                        <GithubIcon size={15} />
                    </LinkIcon>
                </span>
            </h2>

            <ul className="list-disc pl-4 flex flex-col gap-[0.15rem]">
                <li>
                    Intelligent activity tracker that helps you understand and
                    improve your focus habits.
                </li>
                <li>Tech - Tauri, Rust, React, Linux</li>
            </ul>
        </div>
    );
}

function Naash() {
    return (
        <div>
            <h2 className="max-w-max flex flex-col">
                <span>NAASH</span>

                <span className="highlight-color flex sm:gap-1">
                    <LinkIcon
                        href="https://www.youtube.com/watch?v=6xZ1Gxxiu1U"
                        text="Video |"
                        hide={false}
                    >
                        <ClapIcon size={15} className="pl-0" />
                    </LinkIcon>
                    <LinkIcon
                        href="https://github.com/Sushants-Git/naash"
                        text="Github"
                        hide={false}
                    >
                        <GithubIcon size={15} />
                    </LinkIcon>
                </span>
            </h2>
            <ul className="list-disc pl-4 flex gap-[0.15rem] flex-col">
                <li className="mt-1">
                    AI-powered terminal shell that enhances speed and efficiency
                    through natural language interaction, clipboard and error
                    log history.
                </li>
                <li>
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
            </ul>
        </div>
    );
}
