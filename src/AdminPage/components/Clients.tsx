import React from "react";
import { MainColor } from "../../../utils/Colors";
import InfoData from "../../components/InfoData";
import Persons from "./Persons";

/* interface FormImput {
  nombre: string;
  encargado: string;
  cantidad: number;
  telefono: string;
  status: true;
  uuid: any;
} */

export interface FormImput {
  email: string;
  id: number;
  iglesia: string;
  type: string;
  name: string;
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
    <div className={`bg-[#feb966] shadow-sm rounded-lg  text-center my-3 mx-5`}>
      <h1 className=" font-bold text-lg ">{item.name}</h1>
      <div className="">
        <div>
          {/* <InfoData
            title={"Carnéts Elaborados"}
            content={Number(item.cantidad)}
          /> */}
          <InfoData title={"Usuario"} content={item.email} />
          <InfoData title={"Iglesia"} content={item.iglesia} />
        </div>
      </div>
      <button
        type="button"
        className={`shadow-lg rounded-md p-2 my-2 bg-gray-50 text-sm`}
        onClick={() => {
          setUuid(item.email);
        }}
      >
        Ver Personas
      </button>
    </div>
  );
}

export default Clients;
