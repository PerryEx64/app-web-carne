import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MainColor } from "../../utils/Colors";
import { RiLogoutBoxLine } from "react-icons/ri";
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { FIREBASE_CONFIG } from "../assets/Account";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setDataUser } from "../app/futures/accountSlice";

const Client = () => {
  const app = initializeApp(FIREBASE_CONFIG);
  const dispatch = useDispatch();
  const onSubmit = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        dispatch(
          setDataUser({
            email: "",
            id: 0,
            iglesia: "",
            name: "",
            type: "",
          })
        );
        Swal.fire("Sesion Terminada", "", "info");
      })
      .catch((error) => {
        // An error happened.
      });
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
          <RiLogoutBoxLine className="w-6 h-6 " />
          <label className={``}>Cerrar Sesion</label>
        </Link>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Client;
