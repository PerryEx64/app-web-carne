import React from "react";
import { FormImput } from "../AdminPage";
import Clients from "../AdminPage/components/Clients";

interface Props {
  items: FormImput[];
  prevHandle: Function;
  nextHandle: Function;
  nextDisable: boolean;
  prevDisable: boolean;
  currentPage: Number;
  setUuid: any;
}

function Wrapper({
  items,
  prevHandle,
  nextHandle,
  prevDisable,
  nextDisable,
  setUuid,
}: Props) {
  const data = items.map((item, index) => {
    return (
      <li>
        <Clients item={item} index={index} setUuid={setUuid} />
      </li>
    );
  });
  return (
    <div>
      <button
        disabled={prevDisable}
        onClick={() => {
          prevHandle();
        }}
      >
        prev
      </button>
      <button
        disabled={nextDisable}
        onClick={() => {
          nextHandle();
        }}
      >
        next
      </button>

      <h2>Items:</h2>

      <ul>{data}</ul>
    </div>
  );
}

export default Wrapper;
