import Designs from "./components/designs";
import Footer from "./components/footer";
import Intro from "./components/intro";
import Projects from "./components/projects";
import { designImages } from "./constants/images";

function Home() {
    return (
        <section className="font-geist-mono text-lexend-grey mx-auto max-w-3xl px-6 pb-24 text-base/[150%] sm:pb-32 lg:px-10">
            <Intro />
            <section className="mt-10">
                <Projects />
            </section>
            <section className="mt-10">
                <Designs designImages={designImages} />
            </section>
            <section className="mt-14">
                <Footer />
            </section>
        </section>
    );
}

export default Home;
