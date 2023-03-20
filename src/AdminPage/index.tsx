import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Clients from "./components/Clients";
import Persons, { TypePersons } from "./components/Persons";
import { Element } from "react-scroll";
import Search from "./components/Search";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBHDLNclUuPljMldM7nM_YZOw0JdCAwps4",
  authDomain: "app-carnet.firebaseapp.com",
  projectId: "app-carnet",
  storageBucket: "app-carnet.appspot.com",
  messagingSenderId: "460462588965",
  appId: "1:460462588965:web:d6f429198e69202bc86bcc",
  measurementId: "G-ER3KJTT8CQ",
};

export interface FormImput {
  nombre: string;
  encargado: string;
  cantidad: number;
  telefono: string;
  status: true;
  uuid: any;
}

function AdminPage() {
  firebase.initializeApp(FIREBASE_CONFIG);
  const [dataClient, setDataClient] = React.useState<FormImput[]>([]);
  const [dataFilter, setDataFilter] = React.useState<FormImput[]>([]);
  const [dataPersons, setDataPersons] = React.useState<TypePersons[]>([]);
  const [dataPersonsFilter, setDataPersonsFilter] = React.useState<
    TypePersons[]
  >([]);
  const [uuid, setUuid] = React.useState("");

  const onResult = (querySnapshot: any) => {
    const result = querySnapshot.docs.map((doc: any) => doc.data());
    setDataClient(result);
    setDataFilter(result);
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
    <div className="flex flex-1 flex-row ">
      <div className="w-1/4 ">
        <div className="bg-green-400 p-5 rounded-lg h-2/3 mt-5 mx-5">
          <Search
            dataFilter={dataFilter}
            setDataFilter={setDataFilter}
            data={dataClient}
            filter={"encargado"}
            label={"Filtrar por nombre de Institución"}
          />
          {uuid.length > 0 ? (
            <Search
              dataFilter={dataPersonsFilter}
              setDataFilter={setDataPersonsFilter}
              data={dataPersons}
              filter={"name"}
              label={"Filtrar por nombre de Persona"}
              styleContent={"mt-16"}
            />
          ) : null}
        </div>
      </div>

      <Element
        name="test7"
        className="h-screen overflow-auto  w-1/3 mr-5"
        id="containerElement"
      >
        {dataFilter?.map((data, index) => (
          <div key={index}>
            <Clients item={data} index={index} setUuid={setUuid} />
          </div>
        ))}
      </Element>

      <Element
        name="test7"
        className="h-screen overflow-auto w-1/3 mr-5 "
        id="containerElement"
      >
        {uuid.length > 0 ? (
          <>
            <Persons
              uuid={uuid}
              dataFilter={dataPersonsFilter}
              setDataFilter={setDataPersonsFilter}
              setData={setDataPersons}
            />
          </>
        ) : null}
      </Element>
    </div>
  );
}

export default AdminPage;
