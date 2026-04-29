import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";

// ── Inject ProseMirror styles once into <head> ────────────────────────────────
let stylesInjected = false;
function injectProseStyles() {
  if (stylesInjected || typeof document === "undefined") return;
  stylesInjected = true;
  const tag = document.createElement("style");
  tag.textContent = `
    .rte-prose .ProseMirror { outline: none; }
    .rte-prose .ProseMirror p { margin: 0 0 6px; }
    .rte-prose .ProseMirror p:last-child { margin-bottom: 0; }
    .rte-prose .ProseMirror strong { font-weight: 700; color: #111827; }
    .rte-prose .ProseMirror em { font-style: italic; }
    .rte-prose .ProseMirror u { text-decoration: underline; }
    .rte-prose .ProseMirror mark { background: #fef08a; border-radius: 2px; padding: 0 2px; }
    .rte-prose .ProseMirror a { color: #2dabb1; text-decoration: underline; }
    .rte-prose .ProseMirror a:hover { color: #1c9097; }
    .rte-prose .ProseMirror ul { padding-left: 20px; margin: 4px 0; }
    .rte-prose .ProseMirror li { margin-bottom: 2px; }
  `;
  document.head.appendChild(tag);
}

// ── Toolbar button ────
const ToolBtn = ({ onClick, active, title, danger, children }) => {
  const [hovered, setHovered] = useState(false);

  const style = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30px",
    height: "30px",
    padding: 0,
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    flexShrink: 0,
    fontFamily: "inherit",
    fontSize: "13px",
    lineHeight: 1,
    background: hovered
      ? active
        ? "#c8f0f1"
        : danger
          ? "#fee2e2"
          : "#f3f4f6"
      : active
        ? "#e0f7f8"
        : "transparent",
    color: danger
      ? hovered
        ? "#dc2626"
        : "#ef4444"
      : active
        ? hovered
          ? "#1c9097"
          : "#2dabb1"
        : hovered
          ? "#1c3a3a"
          : "#6b7280",
    transition: "background 0.12s, color 0.12s",
  };

  return (
    <button
      type="button"
      title={title}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const RichTextEditor = ({
  value = "",
  onChange,
  placeholder = "Write something…",
  minRows = 4,
}) => {
  injectProseStyles();
  const [focused, setFocused] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight.configure({ multicolor: false }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange?.(editor.isEmpty ? "" : editor.getHTML());
    },
    onFocus() {
      setFocused(true);
    },
    onBlur() {
      setFocused(false);
    },
  });

  // Sync when parent switches to a different item (editing mode)
  useEffect(() => {
    if (!editor) return;
    const current = editor.isEmpty ? "" : editor.getHTML();
    if (value !== current) editor.commands.setContent(value || "", false);
  }, [value, editor]);

  const addLink = () => {
    const url = window.prompt("Enter URL:", "https://");
    if (!url) return;
    if (editor.state.selection.empty) {
      editor.chain().focus().insertContent(`<a href="${url}">${url}</a>`).run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  if (!editor) return null;

  return (
    <div
      style={{
        border: `1.5px solid ${focused ? "#2dabb1" : "#e5e7eb"}`,
        borderRadius: "8px",
        background: "white",
        overflow: "hidden",
        fontFamily: "inherit",
        transition: "border-color 0.15s",
      }}
    >
      {/* ── Toolbar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2px",
          padding: "6px 8px",
          borderBottom: "1px solid #e5e7eb",
          background: "#f9fafb",
          flexWrap: "wrap",
        }}
      >
        <ToolBtn
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold (Ctrl+B)"
        >
          <b style={{ fontWeight: 800, fontFamily: "Georgia, serif" }}>B</b>
        </ToolBtn>

        <ToolBtn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic (Ctrl+I)"
        >
          <i style={{ fontStyle: "italic", fontFamily: "Georgia, serif" }}>I</i>
        </ToolBtn>

        <ToolBtn
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="Underline (Ctrl+U)"
        >
          <span style={{ textDecoration: "underline" }}>U</span>
        </ToolBtn>

        <ToolBtn
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          active={editor.isActive("highlight")}
          title="Highlight"
        >
          <span
            style={{
              background: "#fef08a",
              padding: "1px 3px",
              borderRadius: "2px",
              fontSize: "11px",
              fontWeight: 700,
              color: "#92400e",
            }}
          >
            ab
          </span>
        </ToolBtn>

        {/* separator */}
        <span
          style={{
            width: 1,
            height: 18,
            background: "#e5e7eb",
            margin: "0 4px",
          }}
        />

        <ToolBtn
          onClick={addLink}
          active={editor.isActive("link")}
          title="Add link"
        >
          {/* link chain SVG */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </ToolBtn>

        {editor.isActive("link") && (
          <ToolBtn
            onClick={() => editor.chain().focus().unsetLink().run()}
            title="Remove link"
            danger
          >
            {/* unlink SVG */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              <line x1="3" y1="3" x2="21" y2="21" />
            </svg>
          </ToolBtn>
        )}

        {/* separator */}
        <span
          style={{
            width: 1,
            height: 18,
            background: "#e5e7eb",
            margin: "0 4px",
          }}
        />

        <ToolBtn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet list"
        >
          {/* list SVG */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="9" y1="6" x2="20" y2="6" />
            <line x1="9" y1="12" x2="20" y2="12" />
            <line x1="9" y1="18" x2="20" y2="18" />
            <circle cx="4" cy="6" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="4" cy="12" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="4" cy="18" r="1.5" fill="currentColor" stroke="none" />
          </svg>
        </ToolBtn>
      </div>

      {/* ── Editor area ── */}
      <div
        className="rte-prose"
        style={{
          minHeight: `${minRows * 1.6 + 1}em`,
          padding: "10px 12px",
          fontSize: "13px",
          color: "#1c3a3a",
          lineHeight: "1.6",
          position: "relative",
          cursor: "text",
          fontFamily: "inherit",
          boxSizing: "border-box",
        }}
        onClick={() => editor.commands.focus()}
      >
        <EditorContent editor={editor} />

        {/* Placeholder */}
        {editor.isEmpty && (
          <span
            style={{
              position: "absolute",
              top: "10px",
              left: "12px",
              color: "#9ca3af",
              fontSize: "13px",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {placeholder}
          </span>
        )}
      </div>
    </div>
  );
};

export default RichTextEditor;
