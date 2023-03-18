import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { MainColor } from "../../utils/Colors";

function SideBar() {
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
                  "flex w-1/2 bg-gray-50 shadow-2xl p-2 rounded-md ml-auto mr-auto"
                }
              >
                Clientes
              </Link>
            </li>
          </ul>
        </nav>
        <h1 className="">El final de todo</h1>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default SideBar;
