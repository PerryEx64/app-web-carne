import React from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { saveAs } from "file-saver";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Clients from "./components/Clients";
import Persons from "./components/Persons";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";

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
  const [itemOffset, setItemOffset] = React.useState(0);

  const items = [1, 2, 3, 4, 5];
  const endOffset = itemOffset + 1;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / 1);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * 1) % items.length;
    setItemOffset(newOffset);
  };

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

  function Items({ currentItems }: any) {
    return (
      <>
        {currentItems &&
          currentItems.map((item: any) => <Persons uuid={uuid} />)}
      </>
    );
  }
  return (
    <div className="flex flex-1 flex-row mt-48">
      <div className="w-1/2">
        {dataClient?.map((data, index) => (
          <Clients item={data} index={index} setUuid={setUuid} />
        ))}
      </div>
      <div className=" w-1/2">
        {uuid.length > 0 ? (
          <>
            <Items currentItems={currentItems} />
            <ReactPaginate
              breakLabel="..."
              nextLabel="siguuiente >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={1}
              pageCount={pageCount}
              previousLabel="< anterior"
              renderOnZeroPageCount={null}
              className={"flex flex-row justify-around w-1/2"}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default AdminPage;
