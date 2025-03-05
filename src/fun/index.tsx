import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-config";
import Box from "../utils/box";
import React from "react";
import { DateGrouper, Row } from "../utils/fn";
import LoadingSpinner from "../components/LoadingSpinner";

const mapTypeToTitle = {
    music: "Music",
    anime: "Anime & Manga",
    video: "Video",
} as { [type: string]: string };

const mapTitleToType = {} as { [title: string]: string };

Object.entries(mapTypeToTitle).forEach(([type, title]) => {
    mapTitleToType[title] = type;
});

const order = Object.keys(mapTypeToTitle);

const sleep = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res(null);
        }, 1000);
    });
};

async function fetch_data() {
    const response = await supabase.rpc("get_latest_5_days_per_type");
    await sleep();
    return response.data as any[];
}

function Fun() {
    const query = useQuery({
        queryKey: ["fetch_fun_details"],
        queryFn: fetch_data,
    });

    const generate_page = React.useMemo(() => {
        if (!query.data) return null;

        const groupedRows = query.data.reduce((acc, { type, ...row }: Row) => {
            const key =
                mapTypeToTitle[type] ??
                type.charAt(0).toUpperCase() + type.slice(1);

            if (!acc.has(key)) acc.set(key, []);
            acc.get(key)!.push(row);

            return acc;
        }, new Map()) as Map<string, Omit<Row, "type">[]>;

        const t = Array.from(groupedRows).sort((a, b) => {
            const indexOfTypeA = order.indexOf(mapTitleToType[a[0]]);
            const indexOfTypeB = order.indexOf(mapTitleToType[b[0]]);

            return indexOfTypeA - indexOfTypeB;
        });

        return (
            <section className="flex flex-col gap-10">
                {t.map(([type, rows]) => (
                    <Box key={type} text={<span>{type}</span>}>
                        <div className="flex flex-col gap-2">
                            <DateGrouper rows={rows} />
                        </div>
                    </Box>
                ))}
            </section>
        );
    }, [query.data]);

    if (query.isLoading) {
        return (
            <section className="font-geist-mono text-lexend-grey mx-auto max-w-3xl px-6 pb-24 text-base/[150%] sm:pb-32 lg:px-10">
                <LoadingSpinner
                    text="Fetching fun details..."
                    className="justify-center"
                />
            </section>
        );
    }

    return (
        <section className="font-geist-mono text-lexend-grey mx-auto max-w-3xl px-6 pb-24 text-base/[150%] sm:pb-32 lg:px-10">
            {generate_page}
        </section>
    );
}

export default Fun;
