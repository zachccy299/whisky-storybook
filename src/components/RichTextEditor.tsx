import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, Underline as UnderlineIcon, Strikethrough, AlignLeft, AlignCenter, AlignRight, Link as LinkIcon, Image as ImageIcon, List, ListOrdered, Heading2, Heading3, Undo, Redo, Quote } from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: '開始寫文章...' }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  const btn = (active: boolean) =>
    `p-2 rounded-lg transition-colors ${active ? 'bg-amber-500/30 text-amber-400' : 'text-white/50 hover:text-white hover:bg-white/10'}`;

  const addImage = () => {
    const url = prompt('圖片網址：');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const setLink = () => {
    const url = prompt('連結網址：');
    if (url) editor.chain().focus().setLink({ href: url }).run();
    else editor.chain().focus().unsetLink().run();
  };

  return (
    <div className="border border-white/10 rounded-xl bg-white/[0.03]">
      <div className="flex flex-wrap gap-1 p-2 border-b border-white/10 bg-zinc-900 sticky top-[64px] z-20">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive('bold'))}><Bold className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive('italic'))}><Italic className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btn(editor.isActive('underline'))}><UnderlineIcon className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={btn(editor.isActive('strike'))}><Strikethrough className="w-4 h-4" /></button>
        <div className="w-px bg-white/10 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor.isActive('heading', { level: 2 }))}><Heading2 className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btn(editor.isActive('heading', { level: 3 }))}><Heading3 className="w-4 h-4" /></button>
        <div className="w-px bg-white/10 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={btn(editor.isActive({ textAlign: 'left' }))}><AlignLeft className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={btn(editor.isActive({ textAlign: 'center' }))}><AlignCenter className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={btn(editor.isActive({ textAlign: 'right' }))}><AlignRight className="w-4 h-4" /></button>
        <div className="w-px bg-white/10 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive('bulletList'))}><List className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor.isActive('orderedList'))}><ListOrdered className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btn(editor.isActive('blockquote'))}><Quote className="w-4 h-4" /></button>
        <div className="w-px bg-white/10 mx-1" />
        <button type="button" onClick={setLink} className={btn(editor.isActive('link'))}><LinkIcon className="w-4 h-4" /></button>
        <button type="button" onClick={addImage} className={btn(false)}><ImageIcon className="w-4 h-4" /></button>
        <div className="w-px bg-white/10 mx-1" />
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className={btn(false)}><Undo className="w-4 h-4" /></button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className={btn(false)}><Redo className="w-4 h-4" /></button>
      </div>
      <EditorContent
        editor={editor}
        className="prose prose-invert prose-amber max-w-none p-4 min-h-[400px] [&_.tiptap]:outline-none [&_.tiptap_p.is-editor-empty:first-child::before]:text-white/20 [&_.tiptap_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.tiptap_p.is-editor-empty:first-child::before]:float-left [&_.tiptap_p.is-editor-empty:first-child::before]:pointer-events-none"
      />
    </div>
  );
}
