"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import Highlight from "@tiptap/extension-highlight";
import { Node as ProsemirrorNode } from "@tiptap/pm/model";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  UnderlineIcon,
  Strikethrough,
  SuperscriptIcon,
  SubscriptIcon,
  ImageIcon,
  Minus,
  LinkIcon,
  Code,
  List,
  ListOrdered,
  HighlighterIcon,
  HelpCircle,
} from "lucide-react";

const RichTextEditorDocs = () => (
  <div className="mb-4 p-4 bg-gray-100 rounded-md">
    <h3 className="text-lg font-semibold mb-2">RichTextEditor Usage Guide</h3>
    <ul className="list-disc pl-5 space-y-2">
      <li>
        <strong>Enter key behavior:</strong> Pressing Enter creates a new
        paragraph (&#60;p&#62; element) instead of a line break.
      </li>
      <li>
        <strong>Creating line breaks:</strong> To create a line break without
        starting a new paragraph, use Shift + Enter.
      </li>
      <li>
        <strong>Formatting:</strong> Use the toolbar buttons or keyboard
        shortcuts for basic formatting (bold, italic, etc.).
      </li>
      <li>
        <strong>Images:</strong> Click the image icon to upload and insert
        images. You can resize images after insertion.
      </li>
      <li>
        <strong>Links:</strong> Select text and click the link icon to insert or
        edit links.
      </li>
    </ul>
  </div>
);

interface ImageAttributes {
  src: string;
  width: string;
}

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: "100%",
        renderHTML: (attributes) => {
          return {
            width: attributes.width,
            style: `width: ${attributes.width}`,
          };
        },
      },
    };
  },
});

// Reusable FormatButton Component
const FormatButton = ({
  onClick,
  isActive,
  icon: Icon,
  size = "icon",
  variant = "outline",
  className = "",
}: {
  onClick: () => void;
  isActive: boolean;
  icon: React.ComponentType<{ className?: string }>;
  size?: "icon" | "sm";
  variant?: "outline" | "default";
  className?: string;
}) => (
  <Button
    variant={variant}
    size={size}
    onClick={onClick}
    className={`${isActive ? "bg-muted" : ""} ${className}`}
  >
    <Icon className="h-4 w-4" />
  </Button>
);

const RichTextEditor = ({
  content,
  onChange,
}: {
  content: string;
  onChange: (content: string) => void;
}) => {
  const [isLinkInputVisible, setIsLinkInputVisible] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState<{
    pos: number;
    node: ProsemirrorNode | null;
  } | null>(null);
  const [imageWidth, setImageWidth] = useState(100);
  const [showDocs, setShowDocs] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
      }),
      CustomImage.configure({
        inline: true,
        allowBase64: true,
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      Superscript,
      Subscript,
      TextStyle,
      Color,
      Link.configure({
        openOnClick: false,
      }),
      OrderedList,
      BulletList,
      Highlight,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "px-3 py-2 outline-none min-h-[200px]",
      },
      handleClick: (view, pos, event) => {
        const node = view.state.doc.nodeAt(pos);
        if (node && node.type.name === "image") {
          setSelectedImage({ pos, node });
          setImageWidth(parseInt(node.attrs.width) || 100);
          event.preventDefault();
          return true;
        }
        setSelectedImage(null);
        return false;
      },
    },
  });

  const addImage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (typeof result === "string") {
            editor
              ?.chain()
              .focus()
              .setImage({ src: result, width: "100%" } as ImageAttributes)
              .run();
          }
        };
        reader.readAsDataURL(file);
      }
    },
    [editor]
  );

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  useEffect(() => {
    if (selectedImage && editor) {
      const { pos, node } = selectedImage;
      if (node) {
        const newAttrs = { ...node.attrs, width: `${imageWidth}%` };
        editor
          .chain()
          .focus()
          .setNodeSelection(pos)
          .command(({ tr }) => {
            tr.setNodeMarkup(pos, undefined, newAttrs);
            return true;
          })
          .run();
      }
    }
  }, [imageWidth, selectedImage, editor]);

  const memoizedToolbarButtons = useMemo(
    () => (
      <>
        <FormatButton
          onClick={() => editor?.chain().focus().toggleBold().run()}
          isActive={editor?.isActive("bold") || false}
          icon={Bold}
        />
        <FormatButton
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          isActive={editor?.isActive("italic") || false}
          icon={Italic}
        />
        <FormatButton
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          isActive={editor?.isActive("underline") || false}
          icon={UnderlineIcon}
        />
        <FormatButton
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          isActive={editor?.isActive("strike") || false}
          icon={Strikethrough}
        />
        <FormatButton
          onClick={() => editor?.chain().focus().toggleSuperscript().run()}
          isActive={editor?.isActive("superscript") || false}
          icon={SuperscriptIcon}
        />
        <FormatButton
          onClick={() => editor?.chain().focus().toggleSubscript().run()}
          isActive={editor?.isActive("subscript") || false}
          icon={SubscriptIcon}
        />
        <FormatButton
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor?.isActive("heading", { level: 1 }) || false}
          icon={Heading1}
        />
        <FormatButton
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor?.isActive("heading", { level: 2 }) || false}
          icon={Heading2}
        />
        <FormatButton
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          isActive={editor?.isActive("heading", { level: 3 }) || false}
          icon={Heading3}
        />
        <FormatButton
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
          isActive={editor?.isActive({ textAlign: "left" }) || false}
          icon={AlignLeft}
        />
        <FormatButton
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
          isActive={editor?.isActive({ textAlign: "center" }) || false}
          icon={AlignCenter}
        />
        <FormatButton
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
          isActive={editor?.isActive({ textAlign: "right" }) || false}
          icon={AlignRight}
        />
        <FormatButton
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
          isActive={false}
          icon={Minus}
        />
        <FormatButton
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          isActive={editor?.isActive("bulletList") || false}
          icon={List}
        />
        <FormatButton
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          isActive={editor?.isActive("orderedList") || false}
          icon={ListOrdered}
        />
        <FormatButton
          onClick={() => editor?.chain().focus().toggleHighlight().run()}
          isActive={editor?.isActive("highlight") || false}
          icon={HighlighterIcon}
        />
        <input
          type="color"
          onChange={(e) =>
            editor?.chain().focus().setColor(e.target.value).run()
          }
          className="w-8 h-8 rounded-md cursor-pointer"
        />
        <FormatButton
          onClick={() => document.getElementById("image-upload")?.click()}
          isActive={false}
          icon={ImageIcon}
        />
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={addImage}
          className="hidden"
        />
        <FormatButton
          onClick={() => setIsLinkInputVisible(true)}
          isActive={false}
          icon={LinkIcon}
        />
        <FormatButton
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          isActive={editor?.isActive("codeBlock") || false}
          icon={Code}
        />
        <FormatButton
          onClick={() => setShowDocs(!showDocs)}
          isActive={showDocs}
          icon={HelpCircle}
        />
      </>
    ),
    [editor, addImage, showDocs]
  );

  if (!editor) {
    return null;
  }

  const setLink = () => {
    if (linkUrl === "") {
      editor.chain().focus().unsetLink().run();
    } else if (
      !linkUrl.startsWith("http://") &&
      !linkUrl.startsWith("https://")
    ) {
      alert("Please enter a valid URL starting with http:// or https://");
    } else {
      editor.chain().focus().setLink({ href: linkUrl }).run();
    }
    setIsLinkInputVisible(false);
    setLinkUrl("");
  };

  return (
    <div className="border rounded-md">
      {showDocs && <RichTextEditorDocs />}
      <div className="mb-4 flex flex-wrap gap-2 p-2 border-b">
        {memoizedToolbarButtons}
      </div>
      {isLinkInputVisible && (
        <div className="flex items-center gap-2 p-2 border-b">
          <input
            type="text"
            placeholder="Enter URL"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="flex-grow p-1 border rounded"
          />
          <Button onClick={setLink}>Set Link</Button>
          <Button
            variant="outline"
            onClick={() => setIsLinkInputVisible(false)}
          >
            Cancel
          </Button>
        </div>
      )}
      <div className="relative">
        <EditorContent editor={editor} className="tiptap max-w-none" />
        {selectedImage && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <span className="block mb-2 text-sm font-medium text-gray-700">
                Resize Image:
              </span>
              <div className="flex items-center gap-4">
                <Slider
                  value={[imageWidth]}
                  onValueChange={(value) => setImageWidth(value[0])}
                  min={10}
                  max={100}
                  step={1}
                  className="w-64"
                />
                <span className="text-sm font-medium">{imageWidth}%</span>
              </div>
              <Button className="mt-4" onClick={() => setSelectedImage(null)}>
                Done
              </Button>
            </div>
          </div>
        )}
      </div>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <FormatButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            icon={Bold}
            size="sm"
          />
          <FormatButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            icon={Italic}
            size="sm"
          />
          <FormatButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            icon={UnderlineIcon}
            size="sm"
          />
          <FormatButton
            onClick={() => setIsLinkInputVisible(true)}
            isActive={false}
            icon={LinkIcon}
            size="sm"
          />
          <FormatButton
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            isActive={editor.isActive("highlight")}
            icon={HighlighterIcon}
            size="sm"
          />
        </BubbleMenu>
      )}
    </div>
  );
};

export default RichTextEditor;
