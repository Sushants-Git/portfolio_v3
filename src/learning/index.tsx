import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-config";
import Box from "../utils/box";
import React from "react";
import { DateGrouper, Row } from "../utils/fn";

async function fetch_data() {
    const response = await supabase.from("learning").select();
    return response.data;
}

export default function Learning() {
    const query = useQuery({
        queryKey: ["fetch_learning_details"],
        queryFn: fetch_data,
    });

    const generate_page = React.useMemo(() => {
        if (!query.data) return null;

        return <DateGrouper rows={query.data as Omit<Row, "type">[]} />;
    }, [query.data]);

    return (
        <section className="font-geist-mono text-lexend-grey mx-auto max-w-3xl px-6 pb-24 text-base/[150%] sm:pb-32 lg:px-10">
            <Box text={<span>Learning Log Book</span>}>
                <div className="flex flex-col gap-2">{generate_page}</div>
            </Box>
        </section>
    );
}
