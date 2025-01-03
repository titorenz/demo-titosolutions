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
} from "lucide-react";

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
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={editor?.isActive("bold") ? "bg-muted" : ""}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={editor?.isActive("italic") ? "bg-muted" : ""}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={editor?.isActive("underline") ? "bg-muted" : ""}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          className={editor?.isActive("strike") ? "bg-muted" : ""}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().toggleSuperscript().run()}
          className={editor?.isActive("superscript") ? "bg-muted" : ""}
        >
          <SuperscriptIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().toggleSubscript().run()}
          className={editor?.isActive("subscript") ? "bg-muted" : ""}
        >
          <SubscriptIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor?.isActive("heading", { level: 1 }) ? "bg-muted" : ""
          }
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor?.isActive("heading", { level: 2 }) ? "bg-muted" : ""
          }
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor?.isActive("heading", { level: 3 }) ? "bg-muted" : ""
          }
        >
          <Heading3 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
          className={editor?.isActive({ textAlign: "left" }) ? "bg-muted" : ""}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
          className={
            editor?.isActive({ textAlign: "center" }) ? "bg-muted" : ""
          }
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
          className={editor?.isActive({ textAlign: "right" }) ? "bg-muted" : ""}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={editor?.isActive("bulletList") ? "bg-muted" : ""}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={editor?.isActive("orderedList") ? "bg-muted" : ""}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().toggleHighlight().run()}
          className={editor?.isActive("highlight") ? "bg-muted" : ""}
        >
          <HighlighterIcon className="h-4 w-4" />
        </Button>
        <input
          type="color"
          onChange={(e) =>
            editor?.chain().focus().setColor(e.target.value).run()
          }
          className="w-8 h-8 rounded-md cursor-pointer"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => document.getElementById("image-upload")?.click()}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={addImage}
          className="hidden"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsLinkInputVisible(true)}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          className={editor?.isActive("codeBlock") ? "bg-muted" : ""}
        >
          <Code className="h-4 w-4" />
        </Button>
      </>
    ),
    [editor, addImage]
  );

  if (!editor) {
    return null;
  }

  const setLink = () => {
    if (linkUrl === "") {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: linkUrl }).run();
    }
    setIsLinkInputVisible(false);
    setLinkUrl("");
  };

  return (
    <div className="border rounded-md">
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-muted" : ""}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-muted" : ""}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "bg-muted" : ""}
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLinkInputVisible(true)}
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={editor.isActive("highlight") ? "bg-muted" : ""}
          >
            <HighlighterIcon className="h-4 w-4" />
          </Button>
        </BubbleMenu>
      )}
    </div>
  );
};

export default RichTextEditor;
