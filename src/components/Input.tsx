import React from "react";
import { MainColor } from "../../utils/Colors";

interface Props {
  register: any;
  name: string;
  placeholder: string;
  label: string;
  disabled: boolean;
}
const Input = ({ register, name, placeholder, label, disabled }: Props) => {
  return (
    <div className="flex flex-1 flex-col my-5 ">
      <label className="text-gray-400 mb-1 text-sm ml-3 ">{label}</label>
      <input
        disabled={disabled}
        placeholder={placeholder}
        {...register(name, { required: true })}
        className={`rounded-lg mx-2 p-2 shadow-sm shadow-[#fe9a66]`}
      />
    </div>
  );
};

export default Input;
