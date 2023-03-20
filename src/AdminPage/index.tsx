import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Clients from "./components/Clients";
import Persons from "./components/Persons";
import Wrapper from "../components/Wrapper";
import { Element } from "react-scroll";

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

const ITEMS_PER_PAGE = 2;

function AdminPage() {
  firebase.initializeApp(FIREBASE_CONFIG);
  const [data, setData] = React.useState([]);
  const [dataClient, setDataClient] = React.useState<FormImput[]>([]);
  const [nextDisable, setNextDisable] = React.useState(false);
  const [prevDisable, setPrevDisable] = React.useState(false);
  const [uuid, setUuid] = React.useState("");
  const [items, setItems] = React.useState(
    [...dataClient].splice(0, ITEMS_PER_PAGE)
  );
  const [currentPage, setCurrentPage] = React.useState(0);

  const nextHandle = () => {
    const totalElement = data.length;

    const nextPage = currentPage + 1;

    const firstIndex = nextPage * ITEMS_PER_PAGE;

    console.log(firstIndex, totalElement);
    if (firstIndex === totalElement) return;

    setItems(dataClient.splice(firstIndex, ITEMS_PER_PAGE));
    setCurrentPage(nextPage);
  };

  const prevHandle = () => {
    const prevPage = currentPage - 1;

    if (prevPage < 0) return;

    const firstIndex = prevPage * ITEMS_PER_PAGE;
    setItems([...dataClient].splice(firstIndex, ITEMS_PER_PAGE));
    setCurrentPage(prevPage);
  };

  const onResult = (querySnapshot: any) => {
    const result = querySnapshot.docs.map((doc: any) => doc.data());
    setDataClient(result);

    const result2 = querySnapshot.docs.map((doc: any) => doc.data());
    setData(result2);

    const result3 = querySnapshot.docs.map((doc: any) => doc.data());
    setItems(result3.splice(0, ITEMS_PER_PAGE));
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
      <Element
        name="test7"
        className="h-screen overflow-auto  w-1/3 mr-5"
        id="containerElement"
      >
        {dataClient?.map((data, index) => (
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
        {/* <div className=" w-1/2 "> */}
        {uuid.length > 0 ? (
          <>
            <Persons uuid={uuid} />
          </>
        ) : null}
        {/*  </div> */}
      </Element>
    </div>
  );
}

export default AdminPage;
