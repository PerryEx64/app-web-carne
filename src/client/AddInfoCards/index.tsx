import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import DropsDown from "../../components/DropDrown";
import { initializeApp } from "firebase/app";
import { FIREBASE_CONFIG } from "../../assets/Account";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";
import { selectDataUser } from "../../app/futures/accountSlice";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Swal from "sweetalert2";
import { useNavigate, useNavigation } from "react-router-dom";
import { doc, getFirestore, setDoc } from "firebase/firestore";

interface Inputs {
  name: string;
  dpi: string;
  uri: string;
  cargo: string;
  id_member: string;
}

const AddInfoCards = () => {
  const [img, setImg] = React.useState<any>(null);
  const [disabled, setDisabled] = React.useState(false);
  const selectUser = useSelector(selectDataUser);
  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  firebase.initializeApp(FIREBASE_CONFIG);
  const app = initializeApp(FIREBASE_CONFIG);
  const storage = getStorage(app);
  const db = getFirestore(app);

  const handleUpload = async (idUser: number, name: string) => {
    const storageRef = ref(storage, `${idUser}/${name}`);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, img).then((snapshot) => {
      Swal.fire("Miembro Agregado Correctamente", "", "success");

      setDisabled(false);
      resetField("cargo");
      resetField("name");
      resetField("dpi");
    });
  };

  const onSubmit = async (data: Inputs) => {
    /* setDisabled(false);
    console.log(data, img); */
    /* firebase
      .firestore()
      .collection("users")
      .doc(selectUser.email)
      .collection("persons")
      .doc(data.dpi)
      .set({
        name: data.name,
        dpi: data.dpi,
        cargo: data.cargo,
        status: true,
        image: `${selectUser.id}/${data.name}`,
      })
      .then((res) => {
        handleUpload(selectUser.id, data.name);
      })
      .catch((error) => {
        setDisabled(false);
        Swal.fire("Ah ocurrido un error", "", "error");
      }); */
    await setDoc(doc(db, "users", selectUser.email, "persons", data.dpi), {
      name: data.name,
      dpi: data.dpi,
      cargo: data.cargo,
      status: true,
      image: `${selectUser.id}/${data.dpi}`,
    })
      .then((res) => {
        handleUpload(selectUser.id, data.dpi);
      })
      .catch((error) => {
        setDisabled(false);
        Swal.fire("Ah ocurrido un error", "", "error");
      });
    console.log(selectUser);
  };
  return (
    <div className=" flex flex-col justify-evenly w-3/4 mx-auto ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Nombre Completo"
          name="name"
          placeholder="Ingresa nombre completo"
          register={register}
          disabled={disabled}
        />
        <Input
          label="Número Completo DPI"
          name="dpi"
          placeholder="Ingrese DPI Completo"
          register={register}
          disabled={disabled}
        />

        <DropsDown
          label="Cargo que desempeña"
          name="cargo"
          placeholder="Selecciona una de las opciones"
          data={DATA}
          register={register}
          setValue={setValue}
          disabled={disabled}
        />

        <input
          type="file"
          {...register("uri", { required: true })}
          name="Seleciona una Imagen"
          placeholder="Selecciona una Imagen"
          id=""
          onChange={(e) =>
            e.target.files === null ? setImg(null) : setImg(e.target.files[0])
          }
        />

        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className={`shadow-xl rounded-lg w-1/5 ${
              disabled == true ? `bg-[#848179]` : `bg-[#ffb600] `
            } p-2`}
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInfoCards;

const DATA = [
  {
    value: "miembro",
    label: "Miembro",
  },
  {
    value: "consejero",
    label: "Consejero",
  },
  {
    value: "lider niños",
    label: "Lider Niños",
  },
  {
    value: "lider jovenes",
    label: "Lider Jovenes",
  },
  {
    value: "lider damas",
    label: "Lider Damas",
  },
  {
    value: "lider caballeros",
    label: "Lider Caballeros",
  },
  {
    value: "diacono",
    label: "Diacono",
  },
  {
    value: "servidor",
    label: "Servidor",
  },
];
