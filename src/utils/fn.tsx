import React from "react";
import { SimpleLink } from "./link";
import dayjs from "dayjs";

export type Row = {
    data: string;
    id: number;
    record_time: string;
    type: string;
};

export function DateGrouper({ rows }: { rows: Omit<Row, "type">[] }) {
    let dg: React.ReactNode[] = [];

    let temp: Omit<Row, "type">[] = [];

    rows.forEach((row) => {
        const date = dayjs(row.record_time).format("DD MMM");

        if (temp.length === 0) {
            temp.push(row);
        } else {
            let prevDate = dayjs(temp[temp.length - 1].record_time).format(
                "DD MMM"
            );

            if (prevDate === date) {
                temp.push(row);
            } else {
                dg.push(renderContentWithDate(temp));
                temp = [row];
            }
        }
    });

    if (temp.length) {
        dg.push(renderContentWithDate(temp));
    }

    return dg;
}

function renderContentWithDate(rows: Omit<Row, "type">[]) {
    if (rows.length === 1) {
        return (
            <div key={rows[0].id} className="text-sm">
                {dayjs(rows[0].record_time).format("DD MMM")} -{" "}
                {parse_text_with_links(rows[0].data)}
            </div>
        );
    } else {
        return (
            <div className="text-sm" key={rows[0].record_time}>
                {dayjs(rows[0].record_time).format("DD MMM")}
                {rows.map((item) => (
                    <div key={item.id}>
                        - {parse_text_with_links(item.data)}
                    </div>
                ))}
            </div>
        );
    }
}

enum link_symbols {
    opening_brackets = "[",
    closing_brackets = "]",
    opening_parenthesis = "(",
    closing_parenthesis = ")",
}

export function parse_text_with_links(text: string): React.ReactNode {
    const {
        opening_parenthesis,
        opening_brackets,
        closing_parenthesis,
        closing_brackets,
    } = link_symbols;
    const content: Array<string | React.ReactNode> = [""];

    let link_flag = { content: false, link: false };
    let link_content = "";
    let link = "";

    for (let char of text) {
        switch (char) {
            case opening_brackets:
                link_flag.content = true;
                continue;
            case closing_brackets:
                link_flag.content = false;
                continue;
            case opening_parenthesis:
                link_flag.link = true;
                continue;
            case closing_parenthesis:
                const link_tag = (
                    <SimpleLink
                        href={link}
                        name={link_content}
                        className="text-lili-red"
                        key={`${link}-${link_content.substring(1, 5)}`}
                    />
                );
                content.push(link_tag);
                link_content = "";
                link = "";
                link_flag.link = false;
                continue;
        }

        if (link_flag.content) {
            link_content = link_content + char;
        }

        if (link_flag.link) {
            link = link + char;
        }

        if (!link_flag.content && !link_flag.link) {
            let last_index = content.length - 1;
            if (typeof content[last_index] === "string") {
                content[last_index] += char;
            } else {
                content.push(char);
            }
        }
    }

    if (content.length) {
        let first = content[0];
        let last = content[content.length - 1];

        if (typeof first == "string") {
            content[0] = first.trim();
        }

        if (typeof last == "string") {
            content[content.length - 1] = last.trim();
        }
    }

    return <span className="whitespace-pre-wrap">{content}</span>;
}
