import { links } from "./constants/links";
import Link from "./Link";

export default function Intro() {
    return (
        <section>
            <h1 className="text-2xl font-bold">Sushant Mishra</h1>
            <section className="flex gap-4 mt-1 text-sm font-geist-mono highlight-color">
                {links.map((link) => (
                    <Link key={link.name} href={link.href} name={link.name} />
                ))}
            </section>
            <section className="mt-4 text-[16px]">
                21, Software Engineer & Designer.
            </section>
            <section className="mt-3 text-[16px] text-justify">
                I’m a full-stack developer from Telangana, India, building web
                and desktop applications. At my previous internship at{" "}
                <span className="highlight-color">
                    <Link href="https://garden.finance/" name="Garden fi" />
                </span>
                , I worked majorly on AWS and backend systems, focusing on
                writing robust and type-safe solutions. When I’m not coding, I
                enjoy working on design.
            </section>
        </section>
    );
}
