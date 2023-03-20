import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import ViewPersons from "./ViewPersons";

interface Props {
  uuid: any;
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

function Persons({ uuid }: Props) {
  const [data, setData] = React.useState<TypePersons[]>([]);
  const onResult = (querySnapshot: any) => {
    const result = querySnapshot.docs.map((doc: any) => doc.data());
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

  return (
    <>
      {data.map((data, index) => (
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
