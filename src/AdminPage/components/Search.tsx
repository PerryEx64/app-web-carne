import React, { SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { BiSearchAlt } from "react-icons/bi";
import { TbFilterOff, TbFilter } from "react-icons/tb";
import { BsPersonVcard } from "react-icons/bs";
import { RiBuildingLine } from "react-icons/ri";

export enum TypeLabel {
  "PERSON" = "person",
  "CLIENT" = "client",
}

interface Props {
  setDataFilter: React.Dispatch<SetStateAction<any>>;
  dataFilter: any;
  data: any;
  filter: string;
  label?: string;
  styleContent?: string;
  type: TypeLabel;
}
function Search({
  setDataFilter,
  dataFilter,
  data,
  filter,
  label,
  styleContent,
  type,
}: Props) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = (dataSearch: any) => {
    if (dataSearch.search) {
      const newData = dataFilter.filter((item: any) => {
        const itemData = item[filter]
          ? item[filter].toUpperCase()
          : "".toUpperCase();
        const textData = dataSearch.search.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setDataFilter(newData);
    } else {
      setDataFilter(data);
    }
  };

  return (
    <div className={styleContent}>
      <label className="flex flex-row items-center font-thin text-sm">
        {type === TypeLabel.PERSON ? (
          <BsPersonVcard className="mr-2 w-4 h-4" />
        ) : type === TypeLabel.CLIENT ? (
          <RiBuildingLine className="mr-2 w-4 h-4" />
        ) : null}
        {label}
      </label>

      <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col"}>
        <input
          placeholder="buscar"
          className="rounded-lg h-9 w-full text-center "
          {...register("search")}
        />
        <div className="flex justify-evenly -mt-2">
          <button
            className={`flex flex-row  items-center bg-[#fe9a66] p-2 rounded-lg shadow-xl mt-5 `}
            type="button"
            onClick={handleSubmit(onSubmit)}
          >
            <TbFilter /> Buscar
          </button>
          <button
            className={`flex flex-row items-center bg-[#fed766] p-2 rounded-lg shadow-xl mt-5 `}
            type="button"
            onClick={() => {
              setDataFilter(data);
              reset({
                search: "",
              });
            }}
          >
            <TbFilterOff /> Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
