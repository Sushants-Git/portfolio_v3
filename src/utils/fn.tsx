import React from "react";
import dayjs from "dayjs";
import Box from "./box";

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

    return <span className="flex flex-col gap-8">{dg}</span>;
}

function renderContentWithDate(rows: Omit<Row, "type">[]) {
    return (
        <div key={rows[0].id} className="text-sm">
            <Box
                text={
                    <span>{dayjs(rows[0].record_time).format("DD MMM")}</span>
                }
            >
                {parse_text_with_links(rows[0].data)}
            </Box>
        </div>
    );
}

const enum TokenType {
    TEXT,
    BOLD,
    ITALIC,
    CODE,
    LINK,
    HEADING,
    PARAGRAPH,
    LIST_ITEM,
}

interface Token {
    type: TokenType;
    value?: string;
    href?: string;
    children?: Token[];
}

function parseInlineMarkdown(text: string): Token[] {
    const tokens: Token[] = [];
    const regex = /\*\*(.*?)\*\*|\*(.*?)\*|`(.*?)`|\[(.*?)\]\((.*?)\)/g;

    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text))) {
        if (match.index > lastIndex) {
            tokens.push({
                type: TokenType.TEXT,
                value: text.slice(lastIndex, match.index),
            });
        }

        if (match[1]) tokens.push({ type: TokenType.BOLD, value: match[1] });
        else if (match[2])
            tokens.push({ type: TokenType.ITALIC, value: match[2] });
        else if (match[3])
            tokens.push({ type: TokenType.CODE, value: match[3] });
        else if (match[4] && match[5])
            tokens.push({
                type: TokenType.LINK,
                value: match[4],
                href: match[5],
            });

        lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
        tokens.push({ type: TokenType.TEXT, value: text.slice(lastIndex) });
    }

    return tokens;
}

function parseMarkdown(text: string): Token[] {
    const lines = text.split("\n");
    console.log("lines", lines);

    const tokens: Token[] = [];
    let currentList: Token[] = [];

    for (let line of lines) {
        const trimmed = line.trim();

        // Skip empty lines
        if (trimmed === "") {
            if (currentList.length) {
                tokens.push({
                    type: TokenType.LIST_ITEM,
                    children: currentList,
                });
                currentList = [];
            }
            continue;
        }

        // Headings
        const headingMatch = /^(#{1,3})\s+(.*)/.exec(trimmed);
        if (headingMatch) {
            const level = headingMatch[1].length;
            tokens.push({
                type: TokenType.HEADING,
                value: headingMatch[2],
                href: level.toString(),
            });
            continue;
        }

        // List item
        const listMatch = /^[-*]\s+(.*)/.exec(trimmed);
        if (listMatch) {
            currentList.push({
                type: TokenType.PARAGRAPH,
                children: parseInlineMarkdown(listMatch[1]),
            });
            continue;
        }

        // Paragraph
        tokens.push({
            type: TokenType.PARAGRAPH,
            children: parseInlineMarkdown(trimmed),
        });
    }

    console.log("tokens", tokens);
    console.log("currentList", currentList);

    if (currentList.length) {
        tokens.push({ type: TokenType.LIST_ITEM, children: currentList });
    }

    return tokens;
}

function renderInlineTokens(tokens: Token[]): React.ReactNode[] {
    return tokens.map((token, index) => {
        switch (token.type) {
            case TokenType.TEXT:
                return <span key={index}>{token.value}</span>;
            case TokenType.BOLD:
                return <strong key={index}>{token.value}</strong>;
            case TokenType.ITALIC:
                return <em key={index}>{token.value}</em>;
            case TokenType.CODE:
                return (
                    <code key={index} className="lili-code">
                        {token.value}
                    </code>
                );
            case TokenType.LINK:
                return (
                    <a
                        key={index}
                        href={token.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline highlight-color"
                    >
                        {token.value}
                    </a>
                );
            default:
                return null;
        }
    });
}

export function parse_text_with_links(text: string): React.ReactNode {
    const tokens = parseMarkdown(text);

    return (
        <div className="whitespace-pre-wrap space-y-2">
            {tokens.map((token, index) => {
                switch (token.type) {
                    case TokenType.HEADING: {
                        const level = Number(token.href);
                        const Tag = `h${level}` as keyof JSX.IntrinsicElements;
                        return (
                            <Tag key={index} className="font-bold text-xl my-2">
                                {token.value}
                            </Tag>
                        );
                    }

                    case TokenType.PARAGRAPH:
                        return (
                            <p key={index}>
                                {renderInlineTokens(token.children || [])}
                            </p>
                        );

                    case TokenType.LIST_ITEM:
                        return (
                            <ul
                                key={index}
                                className="list-disc ml-6 space-y-1"
                            >
                                {token.children?.map((item, i) => (
                                    <li key={i}>
                                        {renderInlineTokens(
                                            item.children || []
                                        )}
                                    </li>
                                ))}
                            </ul>
                        );

                    default:
                        return null;
                }
            })}
        </div>
    );
}
