"use client"

import { useState } from "react"
import {
    Type,
    Minus,
    Circle,
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    List,
    ListOrdered,
    Table,
    Link,
} from "lucide-react"

export default function RichTextEditor({ value, onChange }) {
    const [isFocused, setIsFocused] = useState(false)

    const handleTextChange = (e) => {
        onChange(e.target.value)
    }

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="bg-gray-100 border-b border-gray-300 p-2 sm:p-3 flex flex-wrap gap-1 sm:gap-2">
                <button className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Font size">
                    <Type className="h-4 w-4" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Decrease">
                    <Minus className="h-4 w-4" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Bullet">
                    <Circle className="h-4 w-4" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Bold">
                    <Bold className="h-4 w-4" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Italic">
                    <Italic className="h-4 w-4" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Underline">
                    <Underline className="h-4 w-4" />
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                <button className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Align left">
                    <AlignLeft className="h-4 w-4" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Align center">
                    <AlignCenter className="h-4 w-4" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Align right">
                    <AlignRight className="h-4 w-4" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Justify">
                    <AlignJustify className="h-4 w-4" />
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                <button className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Bullet list">
                    <List className="h-4 w-4" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Numbered list">
                    <ListOrdered className="h-4 w-4" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Table">
                    <Table className="h-4 w-4" />
                </button>
                <button className="p-2 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Link">
                    <Link className="h-4 w-4" />
                </button>
            </div>

            {/* Editor */}
            <textarea
                value={value}
                onChange={handleTextChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full min-h-32 sm:min-h-40 p-3 sm:p-4 focus:outline-none resize-none text-sm sm:text-base"
                placeholder="Add your description..."
            />
        </div>
    )
}