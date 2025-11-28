"use client";
import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link2,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Minus,
} from "lucide-react";

export default function TextEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const [fontSize, setFontSize] = useState("14");

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const exec = (cmd, val) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
    onChange(editorRef.current.innerHTML);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
      {/* toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-2">
        <select
          value={fontSize}
          onChange={(e) => {
            setFontSize(e.target.value);
            exec("fontSize", e.target.value);
          }}
          className="px-2 py-1 border rounded text-sm"
        >
          {[10, 12, 14, 16, 18, 20, 24, 28, 32].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {[Bold, Italic, Underline].map((Icon, i) => (
          <button
            key={i}
            type="button"
            onClick={() => exec(Icon.name.toLowerCase())}
            className="p-1.5 hover:bg-gray-200 rounded"
          >
            <Icon size={16} />
          </button>
        ))}

        <button onClick={() => exec("strikethrough")} className="p-1.5">
          <Minus size={16} />
        </button>

        {[AlignLeft, AlignCenter, AlignRight].map((Icon, i) => (
          <button
            key={i}
            type="button"
            onClick={() =>
              exec(
                i === 0
                  ? "justifyLeft"
                  : i === 1
                  ? "justifyCenter"
                  : "justifyRight"
              )
            }
            className="p-1.5 hover:bg-gray-200 rounded"
          >
            <Icon size={16} />
          </button>
        ))}

        {[
          { c: "insertUnorderedList", i: List },
          { c: "insertOrderedList", i: ListOrdered },
        ].map(({ c, i: Icon }, i) => (
          <button
            key={i}
            type="button"
            onClick={() => exec(c)}
            className="p-1.5"
          >
            <Icon size={16} />
          </button>
        ))}

        {/* link */}
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter URL");
            if (url) exec("createLink", url);
          }}
          className="p-1.5"
        >
          <Link2 size={16} />
        </button>

        {/* code block */}
        <button
          type="button"
          onClick={() => exec("formatBlock", "<pre>")}
          className="p-1.5"
        >
          <Code size={16} />
        </button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        className="min-h-32 p-3 outline-none bg-white text-sm"
        onInput={() => onChange(editorRef.current.innerHTML)}
      />
    </div>
  );
}
