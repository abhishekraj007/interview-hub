import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  memo,
} from "react";
import { Editor } from "@tinymce/tinymce-react";

export interface EditorProps {
  initialValue: string;
}

const TinyEditor = forwardRef(({ initialValue }: EditorProps, ref) => {
  useImperativeHandle(ref, () => {
    return {
      getValue: () => {
        return editorRef?.current.getContent();
      },
    };
  });

  const editorRef = useRef(null);
  const [_, setDirty] = useState(false);

  useEffect(() => setDirty(false), [initialValue]);

  return (
    <Editor
      apiKey="0s9hpo84lh3ckoamzm6ulx0prfu1e82rhz7v6bqblw3y9dkb"
      initialValue={initialValue}
      init={{
        body_class: "tiny_editor",
        content_css: "dark",
        menubar: false,
        plugins: "lists codesample",
        toolbar:
          "h1 h2 h3 paragraph bold italic underline codesample numlist bullist blockquote",
        width: "100%",
        codesample_global_prismjs: true,
        codesample_languages: [
          { text: "JavaScript", value: "javascript" },
          { text: "TypeScript", value: "typescript" },
          { text: "HTML", value: "markup" },
          { text: "Java", value: "java" },
          { text: "CSS", value: "css" },
          { text: "PHP", value: "php" },
          { text: "Ruby", value: "ruby" },
          { text: "Python", value: "python" },
          { text: "C", value: "c" },
          { text: "C#", value: "csharp" },
          { text: "C++", value: "cpp" },
        ],
      }}
      onInit={(_, editor) => (editorRef.current = editor)}
      onDirty={() => setDirty(true)}
    />
  );
});

export default memo(TinyEditor);
