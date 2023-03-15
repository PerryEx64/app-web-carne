import React from "react";

interface Props {
  title: string;
  content: number | string;
}

function InfoData({ title, content }: Props) {
  return (
    <div>
      <label className="text-base font-semibold ">{title}: </label>
      <label className="text-sm">{content}</label>
    </div>
  );
}

export default InfoData;
