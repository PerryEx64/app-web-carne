import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MainColor } from "../../utils/Colors";
import { RiLogoutBoxLine } from "react-icons/ri";

const Client = () => {
  const onSubmit = () => {
    console.log("");
  };
  return (
    <div>
      <div
        className={`flex flex-row bg-[${MainColor.primary}] px-2 py-0.5 items-center justify-between`}
      >
        <img
          src={"./../public/icon.png"}
          alt="Logo IDEC"
          style={{ width: 50, height: 50, alignSelf: "center" }}
        />
        <div className=" flex justify-center w-1/2 ">
          <Link to="addInfoCards" className="font-semibold ">
            Agregar Miembro
          </Link>
        </div>
        <Link
          to={"/"}
          onClick={() => onSubmit()}
          className={`flex flex-row rounded-lg ]`}
        >
          <RiLogoutBoxLine className="w-6 h-6 text-white" />
          <label className={`text-[${MainColor.secondary}`}>
            Cerrar Sesion
          </label>
        </Link>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Client;
