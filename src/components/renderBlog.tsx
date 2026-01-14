import { Fragment } from "react";
import { Code2 } from "lucide-react";

// =============================
// Inline Content Renderer
// =============================
const renderInlineContent = (content) => {
    return content.map((item, index) => {
        switch (item.type) {
            case "text": {
                let rendered = item.text;
                if (item.styles?.bold) rendered = <b>{rendered}</b>;
                if (item.styles?.italic) rendered = <i>{rendered}</i>;
                if (item.styles?.underline) rendered = <u>{rendered}</u>;
                if (item.styles?.code)
                    rendered = (
                        <code className="px-1 py-0.5 rounded bg-gray-200 text-sm">
                            {rendered}
                        </code>
                    );

                return <Fragment key={index}>{rendered}</Fragment>;
            }

            case "link":
                return (
                    <a
                        key={index}
                        href={item.href}
                        className="underline text-blue-600 hover:text-blue-800"
                    >
                        {renderInlineContent(item.content)}
                    </a>
                );

            default:
                return null;
        }
    });
};

// =============================
// Block Renderer
// =============================
export function renderBlocks(blocks) {
    return blocks.map((block) => {
        const content = block.content || [];
        const children = block.children?.length
            ? renderBlocks(block.children)
            : null;

        switch (block.type) {
            // =============================
            // Headings
            // =============================
            case "heading": {
                const Tag =
                    block.props.level === 1
                        ? "h1"
                        : block.props.level === 2
                            ? "h2"
                            : block.props.level === 3
                                ? "h3"
                                : block.props.level === 4
                                    ? "h4"
                                    : block.props.level === 5
                                        ? "h5"
                                        : "h6";

                const levelClass = {
                    1: "text-3xl font-bold",
                    2: "text-2xl font-semibold",
                    3: "text-xl font-semibold",
                    4: "text-lg font-semibold",
                    5: "text-base font-semibold",
                    6: "text-sm font-semibold",
                }[block.props.level];

                const style = {
                    color: block.props.textColor,
                    backgroundColor: block.props.backgroundColor,
                    textAlign: block.props.textAlignment,
                };

                if (block.props.isToggleable) {
                    return (
                        <details key={block.id} className="my-2">
                            <summary className="cursor-pointer list-none">
                                <Tag className={levelClass} style={style}>
                                    {renderInlineContent(content)}
                                </Tag>
                            </summary>
                            <div className="mt-2 ml-4">{children}</div>
                        </details>
                    );
                }

                return (
                    <Tag key={block.id} className={levelClass} style={style}>
                        {renderInlineContent(content)}
                    </Tag>
                );
            }

            // =============================
            // Paragraph
            // =============================
            case "paragraph":
                return (
                    <p key={block.id} className="my-2 leading-7">
                        {renderInlineContent(content)}
                    </p>
                );

            // =============================
            // Quote
            // =============================
            case "quote":
                return (
                    <blockquote
                        key={block.id}
                        className="border-l-4 pl-4 italic text-gray-500 my-2"
                    >
                        {renderInlineContent(content)}
                    </blockquote>
                );

            // =============================
            // Toggle List
            // =============================
            case "toggleListItem":
                return (
                    <details key={block.id} className="my-2">
                        <summary className="cursor-pointer font-medium">
                            {renderInlineContent(content)}
                        </summary>
                        <div className="ml-4 mt-1">{children}</div>
                    </details>
                );

            // =============================
            // Bullet List
            // =============================
            case "bulletListItem":
                return (
                    <ul key={block.id} className="list-disc list-inside ml-6">
                        <li>{renderInlineContent(content)}</li>
                        {children}
                    </ul>
                );

            // =============================
            // Numbered List
            // =============================
            case "numberedListItem":
                return (
                    <ol key={block.id} className="list-decimal list-inside ml-6">
                        <li>{renderInlineContent(content)}</li>
                        {children}
                    </ol>
                );

            // =============================
            // Checklist
            // =============================
            case "checkListItem":
                return (
                    <label
                        key={block.id}
                        className="flex items-center gap-2 my-1"
                    >
                        <input
                            type="checkbox"
                            checked={block.props.checked}
                            readOnly
                            className="h-4 w-4"
                        />
                        <span>{renderInlineContent(content)}</span>
                    </label>
                );

            // =============================
            // Code Block
            // =============================
            case "divider":
                return (
                    <div key={block.id} className="my-8 flex items-center">
                        <div className="flex-grow border-t border-gray-300" />
                    </div>
                );

            case "codeBlock":
                return (
                    <div
                        key={block.id}
                        className="my-4 rounded-md bg-gray-100 p-4 font-mono text-sm relative"
                    >
                        <div className="absolute right-2 top-2 flex items-center text-gray-500 text-xs gap-1">
                            <Code2 className="h-4 w-4" />
                            {block.props.language || "code"}
                        </div>

                        <div className="max-h-72 overflow-auto">
                            <pre>
                                <code>
                                    {content
                                        ?.map((c) => (c.type === "text" ? c.text : ""))
                                        .join("")}
                                </code>
                            </pre>
                        </div>
                    </div>
                );

            // =============================
            // Fallback
            // =============================
            default:
                return (
                    <p key={block.id} className="text-red-500">
                        ⚠️ Unsupported block: {block.type}
                    </p>
                );
        }
    });
}