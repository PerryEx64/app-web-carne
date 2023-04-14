import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { getAuth, signOut } from "firebase/auth";
import { VscSignOut } from "react-icons/vsc";
function SideBar() {
  const auth = getAuth();
  const navigation = useNavigate();

  return (
    <div className="flex flex-row h-screen ">
      <div className="flex items-center flex-col justify-between py-5 basis-1/4 bg-gray-300 rounded-r-xl drop-shadow-2xl   ">
        <div className="w-full ">
          <h1 className={`font-bold text-2xl text-center`}>Soy Carnét</h1>
          <div className=" w-2/3 h-0.5 bg-gray-700 mt-10 ml-auto mr-auto " />
        </div>
        <nav className="w-full self-center">
          <ul className="">
            <li className="">
              <Link
                to={"client"}
                className={
                  "flex w-1/2 bg-gray-50 shadow-2xl p-2 rounded-md ml-auto mr-auto items-center"
                }
              >
                <MdOutlineBusinessCenter className="w-6 h-6 mr-2" /> Clientes
              </Link>
            </li>
          </ul>
        </nav>
        <button
          className="flex flex-row items-center bg-red-400 rounded-md p-2"
          onClick={() => {
            signOut(auth)
              .then(() => {
                // Sign-out successful.
                navigation("/");
              })
              .catch((error) => {
                // An error happened.
              });
          }}
        >
          <VscSignOut className="mr-2" />
          Cerrar Sesion
        </button>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default SideBar;
