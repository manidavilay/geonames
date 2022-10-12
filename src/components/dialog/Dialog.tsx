import * as React from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import "./Dialog.scss";

type Props = {
  // onClose: () => void;
  closeDialog: () => void;
};

const Dialog = ({ closeDialog, }: Props) => {
  return (
    <div className="dialog">
        <IoMdCloseCircleOutline size={30} color="#FFFFFF" onClick={closeDialog} className="dialog__button" />
        <div className='dialog__text'>
          <h2>Warning :</h2> <br />
          This website works better on larger screens !
        </div>
    </div>
  );
};

export default Dialog;