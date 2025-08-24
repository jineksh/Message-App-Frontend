import Quill from "quill";
import { useEffect, useRef, useState } from "react";

const MessageRenderer = ({ value }) => {
  // Ye div ka ref rakhega jaha Quill ka content render hoga
  const rendererRef = useRef(null);

  // Quill instance store karne ke liye ref (taaki dobara create na ho)
  const quillRef = useRef(null);

  // State to track if message empty hai (sirf whitespace)
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    // Agar rendererRef ka div available hi nahi hai to return
    if (!rendererRef.current) return;

    // Quill instance sirf ek baar banani hai
    if (!quillRef.current) {
      quillRef.current = new Quill(document.createElement("div"), { theme: "snow" });
      quillRef.current.disable(); // Disable editing (read-only mode)
      rendererRef.current.appendChild(quillRef.current.root); // Quill ke root ko hamare div me inject kar diya
    }

    const quill = quillRef.current;
    let content;

    try {
      // Agar value string hai to usse JSON.parse karo (Delta format ke liye)
      // Agar object hi hai (ops ke sath), to direct use ho jayega
      content = typeof value === "string" ? JSON.parse(value) : value;
    } catch (err) {
      console.error("Invalid value for Quill:", value, err);
      return; // Agar parse fail ho gaya to kuch render nahi karenge
    }

    // Agar content Quill ke Delta format (ops) me hai
    if (content?.ops) {
      quill.setContents(content); // Delta ko directly set kar do
    }
    // Agar HTML string aa gaya (like "<p>Hello</p>")
    else if (typeof content === "string" && content.startsWith("<")) {
      quill.clipboard.dangerouslyPasteHTML(content); // HTML ko render kar do
    }
    // Warna simple plain text render kar do
    else {
      quill.setText(content || "");
    }

    // Check karo ki content empty hai ya nahi
    setIsEmpty(quill.getText().trim().length === 0);
  }, [value]); // Ye effect tab chalega jab value change hogi

  // Agar message empty hai to kuch render hi mat karo
  if (isEmpty) return null;

  // Warna Quill ka editor ka div render karo (read-only)
  return <div ref={rendererRef} className="ql-editor ql-renderer" />;
};

export default MessageRenderer;
