import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Clients from "./components/Clients";
import Persons from "./components/Persons";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBHDLNclUuPljMldM7nM_YZOw0JdCAwps4",
  authDomain: "app-carnet.firebaseapp.com",
  projectId: "app-carnet",
  storageBucket: "app-carnet.appspot.com",
  messagingSenderId: "460462588965",
  appId: "1:460462588965:web:d6f429198e69202bc86bcc",
  measurementId: "G-ER3KJTT8CQ",
};

interface FormImput {
  nombre: string;
  encargado: string;
  cantidad: number;
  telefono: string;
  status: true;
  uuid: any;
}

function AdminPage() {
  const [dataClient, setDataClient] = React.useState<FormImput[]>([]);
  const [uuid, setUuid] = React.useState("");
  firebase.initializeApp(FIREBASE_CONFIG);

  const onResult = (querySnapshot: any) => {
    const result = querySnapshot.docs.map((doc: any) => doc.data());
    setDataClient(result);
  };

  const onErrors = () => {};

  React.useEffect(() => {
    const query = firebase.firestore().collection("client");
    query.onSnapshot(onResult, onErrors);
    return () => {
      query && query === null;
    };
  }, []);

  return (
    <div className="flex flex-1 flex-row mt-48 ">
      <div className="w-1/2 ">
        {/*  <PaginatedItems itemsPerPage={2} data={dataClient} setUuid={setUuid} />, */}
        {dataClient?.map((data, index) => (
          <div key={index}>
            <Clients item={data} index={index} setUuid={setUuid} />
          </div>
        ))}
      </div>
      <div className=" w-1/2">
        {uuid.length > 0 ? (
          <>
            <Persons uuid={uuid} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default AdminPage;
