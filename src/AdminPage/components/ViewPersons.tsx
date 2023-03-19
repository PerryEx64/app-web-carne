import React from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { MainColor } from "../../../utils/Colors";
import InfoData from "../../components/InfoData";
import { TypePersons } from "./Persons";
import { initializeApp } from "firebase/app";
/* import { saveAs } from "file-saver"; */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBHDLNclUuPljMldM7nM_YZOw0JdCAwps4",
  authDomain: "app-carnet.firebaseapp.com",
  projectId: "app-carnet",
  storageBucket: "app-carnet.appspot.com",
  messagingSenderId: "460462588965",
  appId: "1:460462588965:web:d6f429198e69202bc86bcc",
  measurementId: "G-ER3KJTT8CQ",
};

function ViewPersons({ data }: { data: TypePersons }) {
  const [img, setImg] = React.useState("");
  const app = initializeApp(FIREBASE_CONFIG);
  const storage = getStorage(app);

  const handleDownload = (nameImg: any) => {
    const starsRef = ref(storage, nameImg);
    getDownloadURL(starsRef)
      .then((url: any) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
        /*  saveAs(url); */
        setImg("");
      })
      .catch((error) => {
        // Handle any errors
      });
  };

  const handleViewImage = (nameImg: any) => {
    const startRef = ref(storage, nameImg);
    getDownloadURL(startRef).then((url) => {
      setImg(url);
    });
  };
  return (
    <div className="">
      <InfoData title={"DPI"} content={data.dpi} />
      <InfoData title={"Nombre"} content={data.name} />
      {img && (
        <>
          <img
            src={img}
            className=" w-1/2 h-1/2 ml-auto mr-auto  rounded-md self-center  "
          />
          <button
            className="font-bold text-red-500 mb-3 text-xl"
            onClick={() => {
              setImg("");
            }}
          >
            X
          </button>
        </>
      )}
      <div className="flex flex-col">
        <button
          type="button"
          className={`bg-[${MainColor.secondary}] rounded-md p-1 w-3/4 self-center `}
          onClick={() => {
            handleDownload(data.image);
          }}
        >
          Descagar Imagen
        </button>
        <button
          className=" text-blue-600 text-sm underline "
          type="button"
          onClick={() => {
            handleViewImage(data.image);
          }}
        >
          ver imagen
        </button>
      </div>
    </div>
  );
}

export default ViewPersons;
