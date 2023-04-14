import React from "react";
import Select from "react-dropdown-select";

interface Props {
  register: any;
  name: string;
  placeholder: string;
  label: string;
  data: any;
  setValue: any;
  disabled: boolean;
}
const DropsDown = ({
  register,
  name,
  placeholder,
  label,
  data,
  setValue,
  disabled,
}: Props) => {
  const [selectedOption, setSelectedOption] = React.useState(null);
  return (
    <div className="flex flex-1 flex-col my-5 ">
      <label className="text-sm ml-3 ">{label}</label>
      <div className="rounded-lg mx-2 p-2 shadow-sm shadow-[#fe9a66]">
        <Select
          disabled={disabled}
          placeholder={placeholder}
          defaultValue={selectedOption}
          {...register(name, { required: true })}
          onChange={(value: any) => setValue(name, value[0].value)}
          options={data}
        />
      </div>
    </div>
  );
};

export default DropsDown;
