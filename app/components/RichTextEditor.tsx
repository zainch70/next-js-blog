"use client";

import { useRef, useCallback, useEffect } from "react";
import { normalizeBlogHtml } from "@/app/lib/html";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your blog content here...",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) return;
    const prepared = normalizeBlogHtml(value);
    if (editorRef.current.innerHTML !== prepared) {
      editorRef.current.innerHTML = prepared;
    }
  }, [value]);

  const exec = useCallback((command: string, arg?: string) => {
    document.execCommand(command, false, arg);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const html = e.clipboardData.getData("text/html");
    const plain = e.clipboardData.getData("text/plain");

    if (html) {
      document.execCommand("insertHTML", false, html);
    } else if (plain.includes("<") || plain.includes("&lt;")) {
      document.execCommand("insertHTML", false, normalizeBlogHtml(plain));
    } else {
      document.execCommand("insertText", false, plain);
    }
    handleInput();
  };

  const tools = [
    { label: "B", cmd: "bold", title: "Bold" },
    { label: "I", cmd: "italic", title: "Italic" },
    { label: "U", cmd: "underline", title: "Underline" },
    { label: "H1", cmd: "formatBlock", arg: "h1", title: "Heading 1" },
    { label: "H2", cmd: "formatBlock", arg: "h2", title: "Heading 2" },
    { label: "•", cmd: "insertUnorderedList", title: "Bullet list" },
    { label: "1.", cmd: "insertOrderedList", title: "Numbered list" },
    { label: "❝", cmd: "formatBlock", arg: "blockquote", title: "Quote" },
    { label: "🔗", cmd: "createLink", arg: "https://", title: "Link" },
  ];

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-background">
        {tools.map((tool) => (
          <button
            key={tool.title}
            type="button"
            title={tool.title}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => exec(tool.cmd, tool.arg)}
            className="min-w-8 h-8 px-2 text-xs font-bold text-muted hover:bg-card hover:text-accent rounded-lg border border-transparent hover:border-border transition-all cursor-pointer"
          >
            {tool.label}
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        data-placeholder={placeholder}
        className="min-h-[200px] max-h-[400px] overflow-y-auto p-4 text-sm text-foreground focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-muted/50"
        suppressContentEditableWarning
      />
    </div>
  );
}
