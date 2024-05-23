/* eslint-disable react/prop-types */
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import Conf from "../Conf/Conf.js";

// for refernce read this
// https://react-hook-form.com/docs/usecontroller/controller
// https://www.tiny.cloud/docs/tinymce/latest/react-ref/

export default function Rte({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full h-full">
      {label && (
        <label className=" text-gray-100 inline-block mb-1 pl-1">{label}</label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={Conf.rteApiKey}
            initialValue={defaultValue}
            onEditorChange={onChange}
            init={{
              initialValue: defaultValue,
              height: 600,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                " undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              skin: "oxide-dark",
              content_css: "dark",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        )}
      />
    </div>
  );
}
