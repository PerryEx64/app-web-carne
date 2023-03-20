import React, { SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { MainColor } from "../../../utils/Colors";
import Select from "react-select";

interface Props {
  setDataFilter: React.Dispatch<SetStateAction<any>>;
  dataFilter: any;
  data: any;
  filter: string;
  label?: string;
  styleContent?: string;
}
function Search({
  setDataFilter,
  dataFilter,
  data,
  filter,
  label,
  styleContent,
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
      <label className=" font-thin text-sm">{label}</label>

      <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col"}>
        <input
          placeholder="buscar"
          className="rounded-lg h-9 w-full text-center "
          {...register("search")}
        />
        <div className="flex justify-evenly -mt-2">
          <button
            className={`bg-[#fe9a66] p-2 rounded-lg shadow-xl mt-5 `}
            type="button"
            onClick={handleSubmit(onSubmit)}
          >
            Buscar
          </button>
          <button
            className={`bg-[#fed766] p-2 rounded-lg shadow-xl mt-5 `}
            type="button"
            onClick={() => {
              setDataFilter(data);
              reset({
                search: "",
              });
            }}
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
