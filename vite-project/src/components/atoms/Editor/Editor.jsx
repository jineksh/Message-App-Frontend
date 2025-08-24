import 'quill/dist/quill.snow.css'; // Quill editor ke liye default CSS (snow theme)
import { ImageIcon, XIcon } from 'lucide-react'; // icons for image + close
import Quill from 'quill'; // Quill rich text editor
import { useEffect, useRef, useState } from 'react';
import { MdSend } from 'react-icons/md'; // send button ka icon
import { PiTextAa } from 'react-icons/pi'; // text/toolbar toggle icon
import { Button } from '@/components/ui/button'; // custom button component
import Hint from '../Hint/Hint'; // tooltip component

const Editor = ({ onSubmit }) => {
  // toolbar show/hide state
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);
  // selected image file
  const [image, setImage] = useState(null);

  // refs
  const editorRef = useRef(null); // editor container ke liye ref
  const quillRef = useRef(null); // quill instance ka ref
  const imageInputRef = useRef(null); // hidden file input ka ref

  // toolbar toggle karne ka function
  function toggleToolbar() {
    setIsToolbarVisible((prev) => !prev);
    const toolbar = editorRef.current?.querySelector('.ql-toolbar');
    if (toolbar) toolbar.classList.toggle('hidden'); // toolbar ko hide/show karega
  }

  // quill editor initialize karna
  useEffect(() => {
    if (!editorRef.current) return;

    // prevent double-init on hot reload
    if (quillRef.current) return;

    const options = {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'], // text formatting
          ['link'], // link insert
          [{ list: 'ordered' }, { list: 'bullet' }], // lists
          ['clean'], // clear formatting
        ],
        keyboard: {
          bindings: {
            // shift + enter => new line
            shift_enter: {
              key: 'Enter',
              shiftKey: true,
              handler: () => {
                quillRef.current?.insertText(
                  quillRef.current.getSelection()?.index || 0,
                  '\n'
                );
              },
            },
          },
        },
      },
    };

    // create new Quill instance
    const quill = new Quill(editorRef.current, options);
    quillRef.current = quill;
  }, []);

  return (
    <div className="flex flex-col">
      {/* editor wrapper */}
      <div className="flex flex-col border border-slate-300 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400 bg-white">
        
        {/* ✅ toolbar + editor quill ke andar auto-generate hote hain */}
        <div className="h-full ql-custom" ref={editorRef} />

        {/* Image preview (agar user ne select kiya ho) */}
        {image && (
          <div className="p-2">
            <div className="relative size-[60px] flex items-center justify-center group/image">
              {/* remove image button */}
              <button
                className="hidden group-hover/image:flex rounded-full bg-black/70 hover:bg-black absolute -top-2.5 -right-2.5 text-white size-6 z-[5] border-2 border-white items-center justify-center"
                onClick={() => {
                  setImage(null);
                  if (imageInputRef.current) {
                    imageInputRef.current.value = '';
                  }
                }}
              >
                <XIcon className="size-4" />
              </button>
              {/* image preview */}
              <img
                src={URL.createObjectURL(image)}
                className="rounded-xl overflow-hidden border object-cover"
              />
            </div>
          </div>
        )}

        {/* Action buttons (toolbar toggle, image upload, send) */}
        <div className="flex px-2 pb-2 z-[5] gap-4">
          {/* toolbar toggle */}
          <Hint
            label={!isToolbarVisible ? 'Show toolbar' : 'Hide toolbar'}
            side="bottom"
            align="center"
          >
            <Button size="iconSm" variant="ghost" onClick={toggleToolbar}>
              <PiTextAa className="size-4" />
            </Button>
          </Hint>

          {/* image upload button */}
          <Hint label="Image">
            <Button
              size="iconSm"
              variant="ghost"
              onClick={() => imageInputRef.current?.click()}
            >
              <ImageIcon className="size-4" />
            </Button>
          </Hint>

          {/* hidden file input for selecting image */}
          <input
            type="file"
            className="hidden"
            ref={imageInputRef}
            onChange={(e) => setImage(e.target.files[0])}
          />

          {/* send button */}
          <Hint label="Send Message">
            <Button
              size="iconLg"
              className="ml-auto bg-[#007a6a] hover:bg-[#007a6a]/80 text-white"
              onClick={() => {
                // quill ka content json me stringify karke send
                const messageContent = JSON.stringify(
                  quillRef.current?.getContents()
                );
                // callback onSubmit me bhejna
                onSubmit({ body: messageContent, image });
                // editor clear karna
                quillRef.current?.setText('');
                // image clear karna
                setImage(null);
                if (imageInputRef.current) {
                  imageInputRef.current.value = '';
                }
              }}
            >
              <MdSend className="size-4" />
            </Button>
          </Hint>
        </div>
      </div>

      {/* shortcut info */}
      <p className="p-2 text-[10px] text-mutes-foreground flex justify-end">
        <strong>Shift + return</strong> &nbsp; to add a new line
      </p>
    </div>
  );
};

export default Editor;
