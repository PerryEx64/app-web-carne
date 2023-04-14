import React from "react";
import { useForm } from "react-hook-form";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUserData } from "../../futures/counts/countsSlice";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { setDataUser } from "../../app/futures/accountSlice";

type FormData = {
  username: string;
  password: string;
};

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBHDLNclUuPljMldM7nM_YZOw0JdCAwps4",
  authDomain: "app-carnet.firebaseapp.com",
  projectId: "app-carnet",
  storageBucket: "app-carnet.appspot.com",
  messagingSenderId: "460462588965",
  appId: "1:460462588965:web:d6f429198e69202bc86bcc",
  measurementId: "G-ER3KJTT8CQ",
};
const Login = () => {
  const [storage, setStorage] = React.useState<any>();
  const app = initializeApp(FIREBASE_CONFIG);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onSubmit = (data: FormData) => {
    signInWithEmailAndPassword(auth, data.username, data.password)
      .then(async (userCredential) => {
        const docRef = doc(db, "users", data.username);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const result = docSnap.data();
          dispatch(
            setDataUser({
              id: result.id,
              iglesia: result.iglesia,
              name: result.name,
              type: result.type,
              email: result.email,
            })
          );
          if (result.type === "user") {
            navigate("/user");
          } else if (result.type === "admin") {
            navigate("/admin");
          }
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className="flex flex-col mx-3 h-screen">
      <div className="flex grow flex-row p-3 justify-center items-center">
        <img
          src={"./../public/login.svg"}
          alt="Login"
          className="w-2/3 h-2/3"
        />
        <div className="w-1/2">
          <form
            className="flex flex-col justify-around w-96 h-96 p-2 bg-gray-50 shadow-lg shadow-[#1e2738] rounded-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-center text-[#fe9a66] font-bold text-3xl mb-10 mt-5 underline underline-offset-8 ">
              {"Inicio de Sesion"}
            </h1>
            <div className="flex flex-1 flex-col ">
              <label className="text-gray-400 mb-1 text-sm ml-3 ">
                {"Usuario"}
              </label>
              <input
                placeholder={"ingrese su usuario"}
                {...register("username")}
                className=" rounded-lg mx-2 p-2 shadow-lg "
              />
            </div>

            <div className="flex flex-1 flex-col ">
              <label className="text-gray-400 mb-1 text-sm ml-3 ">
                {"Contraseña"}
              </label>
              <input
                placeholder={"ingrese su usuario"}
                {...register("password")}
                className=" rounded-lg mx-2 p-2 shadow-lg "
              />
            </div>

            <div className="flex justify-center mt-5 mb-3">
              <input
                type="submit"
                value={"Iniciar Sesion"}
                className={`shadow-xl rounded-lg  bg-[#fed766] p-2`}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="flex-none h-5">
        <h5> </h5>
      </div>
    </div>
  );
};

export default Login;
