import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router";
import { HomeIcon } from "./icons/home";
import { BookTextIcon } from "./icons/document";
import { AudioLinesIcon } from "./icons/audio";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

import Home from "./home";
import Fun from "./fun";
import Learning from "./learning";
import DataEntry from "./data-entry/DataEntry";

function App() {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/learning" element={<Learning />} />
                        <Route path="/fun" element={<Fun />} />
                        <Route path="/data-entry" element={<DataEntry />} />
                    </Routes>
                </Layout>
            </QueryClientProvider>
        </BrowserRouter>
    );
}

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Nav />
            {children}
        </div>
    );
}

function Nav() {
    const navigate = useNavigate();

    const handleClick = (route: string) => {
        navigate(route);
    };

    return (
        <div className="font-geist-mono w-max rounded-xl flex text-lili-red shadow-tooltip my-12 md:my-16 ml-auto mr-auto">
            <HomeIcon size={15} onClick={() => handleClick("/")} />
            <BookTextIcon size={15} onClick={() => handleClick("/learning")} />
            <AudioLinesIcon size={15} onClick={() => handleClick("/fun")} />
        </div>
    );
}

export default App;
