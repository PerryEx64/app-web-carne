import React, { SetStateAction } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import ViewPersons from "./ViewPersons";

interface Props {
  uuid: any;
  setDataFilter: React.Dispatch<SetStateAction<TypePersons[]>>;
  dataFilter: TypePersons[];
  setData: React.Dispatch<SetStateAction<TypePersons[]>>;
}

export interface TypePersons {
  name: string;
  dpi: string;
  cargo: string;
  id: string;
  titulo: string;
  status: string;
  image: string;
}

function Persons({ uuid, setDataFilter, dataFilter, setData }: Props) {
  /*  const [data, setData] = React.useState<TypePersons[]>([]); */
  const onResult = (querySnapshot: any) => {
    const result = querySnapshot.docs.map((doc: any) => doc.data());
    setDataFilter(result);
    setData(result);
  };

  const onErrors = () => {};

  React.useEffect(() => {
    const query = firebase
      .firestore()
      .collection("client")
      .doc(uuid)
      .collection("persons");
    query.onSnapshot(onResult, onErrors);
    return () => {
      query && query === null;
    };
  }, [uuid]);

  console.log(dataFilter);
  return (
    <>
      {dataFilter.map((data, index) => (
        <div
          key={index}
          className=" bg-gray-200 p-1.5 shadow-sm rounded-lg text-center my-3 mx-5"
        >
          <ViewPersons data={data} />
        </div>
      ))}
    </>
  );
}

export default Persons;
