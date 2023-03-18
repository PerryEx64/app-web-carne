import React from "react";
import { useForm } from "react-hook-form";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

type FormData = {
  username: string;
  password: string;
};

function Account() {
  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyBHDLNclUuPljMldM7nM_YZOw0JdCAwps4",
    authDomain: "app-carnet.firebaseapp.com",
    projectId: "app-carnet",
    storageBucket: "app-carnet.appspot.com",
    messagingSenderId: "460462588965",
    appId: "1:460462588965:web:d6f429198e69202bc86bcc",
    measurementId: "G-ER3KJTT8CQ",
  };
  initializeApp(FIREBASE_CONFIG);
  const auth = getAuth();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const onSubmit = async (data: FormData) => {
    await signInWithEmailAndPassword(auth, data.username, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/admin");
        // ...
      })
      .catch((error) => {
        console.log("error");
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className=" justify-center w-1/3 ml-auto mr-auto  bg-[#feb966] rounded-xl mt-52 p-5 ">
      <h1 className="text-center my-2 text-2xl font-bold">
        {"Inicio de Sesion"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col"}>
        <label className="text-x text-center">Nombre</label>
        <input
          className="shadow-lg bg-gray-50 rounded-md ml-2 w-80 self-center"
          {...register("username")}
        />

        <label className="text-xl text-center ">Contraseña</label>
        <input
          className="shadow-lg bg-gray-50 rounded-md ml-2 w-80 self-center"
          {...register("password")}
        />

        <button
          className={`bg-[#fe9a66] p-2 rounded-lg shadow-xl mt-5 self-center `}
          type="button"
          onClick={handleSubmit(onSubmit)}
        >
          Iniciar Sesion
        </button>
      </form>
    </div>
  );
}

export default Account;
