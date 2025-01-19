import { designImages } from "./utils/constants/images";
import Designs from "./utils/Designs";
import Footer from "./utils/Footer";
import Intro from "./utils/Intro";
import Projects from "./utils/Projects";

function App() {
    return (
        <section className="font-lexend  text-lexend-grey mx-auto max-w-3xl px-6 pb-24 pt-24 text-base/[150%] sm:pb-32 lg:px-10">
            <Intro />
            <section className="mt-14">
                <Projects />
            </section>
            <section className="mt-14">
                <Designs designImages={designImages} />
            </section>
            <section className="mt-20">
                <Footer />
            </section>
        </section>
    );
}

export default App;
