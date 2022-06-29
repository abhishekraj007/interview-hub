import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Editor } from "@tinymce/tinymce-react";

export interface EditorProps {
  initialValue: string;
}

const TinyEditor = forwardRef(({ initialValue }: EditorProps, ref) => {
  console.log(ref);

  useImperativeHandle(ref, () => {
    return {
      getValue: () => {
        return editorRef?.current.getContent();
      },
    };
  });

  const editorRef = useRef(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => setDirty(false), [initialValue]);

  const onChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      setDirty(false);
      editorRef.current.setDirty(false);
      // an application would save the editor content to the server here

      console.log(content);
    }
  };

  return (
    <Editor
      apiKey="0s9hpo84lh3ckoamzm6ulx0prfu1e82rhz7v6bqblw3y9dkb"
      initialValue={initialValue}
      init={{
        menubar: false,
        plugins: "lists codesample",
        toolbar:
          "h1 h2 h3 bold italic underline codesample numlist bullist blockquote",
        width: "100%",
        codesample_global_prismjs: true,
      }}
      onInit={(evt, editor) => (editorRef.current = editor)}
      onDirty={() => setDirty(true)}
    />
  );
});

export default TinyEditor;
