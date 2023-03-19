import React from "react";
import { MainColor } from "../../../utils/Colors";
import InfoData from "../../components/InfoData";
import Persons from "./Persons";

interface FormImput {
  nombre: string;
  encargado: string;
  cantidad: number;
  telefono: string;
  status: true;
  uuid: any;
}

function Clients({
  item,
  setUuid,
  index,
}: {
  item: FormImput;
  index: number;
  setUuid: any;
}) {
  return (
    <div
      className={`bg-[#feb966] shadow-sm rounded-lg w-1/2  text-center my-3 ml-3`}
    >
      <h1 className=" font-bold text-lg ">{item.nombre}</h1>
      <div className="">
        <div>
          <InfoData
            title={"Carnéts Elaborados"}
            content={Number(item.cantidad)}
          />
          <InfoData
            title={"Numero de Teléfono"}
            content={Number(item.telefono)}
          />
          <InfoData title={"Encargado"} content={item.encargado} />
        </div>
      </div>
      <button
        type="button"
        className={`shadow-lg rounded-md p-2 my-2 bg-gray-50 text-sm`}
        onClick={() => {
          setUuid(item.uuid);
        }}
      >
        Ver Personas
      </button>
    </div>
  );
}

export default Clients;
