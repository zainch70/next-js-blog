"use client";

import { useEffect } from "react";
import { normalizeBlogHtml } from "@/app/lib/html";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";

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
  const editor = useEditor({
    immediatelyRender: true,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2] },
        link: {
          openOnClick: false,
          autolink: true,
          linkOnPaste: true,
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyNodeClass:
          "is-editor-empty before:content-[attr(data-placeholder)] before:text-muted/50 before:float-left before:pointer-events-none before:h-0",
      }),
    ],
    content: normalizeBlogHtml(value || ""),
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "tiptap-editor rich-text-editor min-h-[200px] max-h-[400px] overflow-y-auto p-4 text-sm text-foreground focus:outline-none",
      },
    },
    autofocus: false,
  });

  useEffect(() => {
    if (!editor) return;
    const incoming = normalizeBlogHtml(value || "");
    if (editor.isFocused) return;
    if (editor.getHTML() !== incoming) {
      editor.commands.setContent(incoming, { emitUpdate: false });
    }
  }, [editor, value]);

  const promptForLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter link URL", previousUrl || "https://");
    if (url === null) return;
    const next = url.trim();
    if (!next) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: next }).run();
  };

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-background">
        <ToolButton
          label="B"
          title="Bold"
          active={!!editor?.isActive("bold")}
          onMouseDown={() => editor?.chain().focus().toggleBold().run()}
        />
        <ToolButton
          label="I"
          title="Italic"
          active={!!editor?.isActive("italic")}
          onMouseDown={() => editor?.chain().focus().toggleItalic().run()}
        />
        <ToolButton
          label="U"
          title="Underline"
          active={!!editor?.isActive("underline")}
          onMouseDown={() => editor?.chain().focus().toggleUnderline().run()}
        />
        <ToolButton
          label="H1"
          title="Heading 1"
          active={!!editor?.isActive("heading", { level: 1 })}
          onMouseDown={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
        />
        <ToolButton
          label="H2"
          title="Heading 2"
          active={!!editor?.isActive("heading", { level: 2 })}
          onMouseDown={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        />
        <ToolButton
          label="•"
          title="Bullet list"
          active={!!editor?.isActive("bulletList")}
          onMouseDown={() => editor?.chain().focus().toggleBulletList().run()}
        />
        <ToolButton
          label="1."
          title="Numbered list"
          active={!!editor?.isActive("orderedList")}
          onMouseDown={() => editor?.chain().focus().toggleOrderedList().run()}
        />
        <ToolButton
          label="❝"
          title="Quote"
          active={!!editor?.isActive("blockquote")}
          onMouseDown={() => editor?.chain().focus().toggleBlockquote().run()}
        />
        <ToolButton
          label="🔗"
          title="Link"
          active={!!editor?.isActive("link")}
          onMouseDown={promptForLink}
        />
      </div>

      <EditorContent editor={editor} />

      <p className="px-3 py-1.5 text-[11px] text-muted border-t border-border/60 bg-background">
        Tip: select text, then apply formatting. Use Enter for new paragraphs.
      </p>
    </div>
  );
}

function ToolButton({
  label,
  title,
  active,
  onMouseDown,
}: {
  label: string;
  title: string;
  active: boolean;
  onMouseDown: () => void;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => {
        e.preventDefault();
        onMouseDown();
      }}
      className={[
        "min-w-8 h-8 px-2 text-xs font-bold rounded-lg border transition-all cursor-pointer",
        active
          ? "text-accent border-border bg-card"
          : "text-muted border-transparent hover:bg-card hover:text-accent hover:border-border",
      ].join(" ")}
    >
      {label}
    </button>
  );
}
