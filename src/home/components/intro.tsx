import Link from "../../utils/link";
import LinkIcon from "../../utils/links-icon";
import { AttachFileIcon } from "../../icons/attach";
import { GithubIcon } from "../../icons/github";
import { LinkedinIcon } from "../../icons/linkedin";
import { AtSignIcon } from "../../icons/mail";
import { TwitterIcon } from "../../icons/twitter";

export default function Intro() {
    return (
        <section>
            <h1 className="text-base font-semibold">Sushant Mishra</h1>
            <h1 className="text-sm">[mr. professional bug writer]</h1>
            <section className="flex gap-0.5 text-sm font-geist-mono highlight-color mt-0.5">
                <LinkIcon
                    href="https://github.com/Sushants-Git"
                    text="Github |"
                >
                    <GithubIcon size={15} className="pl-0" />
                </LinkIcon>

                <LinkIcon href="https://x.com/sushantstwt" text="Twitter |">
                    <TwitterIcon size={15} />
                </LinkIcon>

                <LinkIcon href="mailto:sushantsgml@gmail.com" text="Mail |">
                    <AtSignIcon size={15} />
                </LinkIcon>

                <LinkIcon
                    href="https://www.linkedin.com/in/sushants-li/"
                    text="LinkedIn |"
                >
                    <LinkedinIcon size={15} />
                </LinkIcon>

                <LinkIcon
                    href="https://drive.google.com/file/d/1_Uo8pYHEoMMToxWTusjjn189Av2WvY4k/view?usp=sharing"
                    text="Resume"
                >
                    <AttachFileIcon size={15} />
                </LinkIcon>
            </section>

            <section className="mt-6 text-sm">
                21, Software Engineer & Designer.
            </section>
            <section className="mt-3 text-sm text-pretty">
                I am a full-stack developer. Building web and desktop
                applications. Currently, i write and fix bugs at{" "}
                <span className="highlight-color">
                    <Link href="https://getswipe.in/" name="Swipe (YC 21)" />
                </span>
                . When I’m not writing bugs, I like to design.
            </section>
        </section>
    );
}
