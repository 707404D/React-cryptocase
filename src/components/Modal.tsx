import React, { useContext, useEffect, useRef, useState } from 'react';
import { ContextItemsCase } from '../pages/CoinTable';

const Modal = ({
  currentCoin,
  myCase,
  setMyCase,
  myCasePrice,
  setMyCasePrice,
  setOpenModal,
}: any) => {
  const ModalRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<number>(0);
  const [itemsCase, setItemsCase] = useContext(ContextItemsCase);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const closeModalOnClickOutside = (e: any) => {
    if (e.target == ModalRef.current) {
      setOpenModal(false);
    }
  };
  const onChangeInput = (e: any) => {
    setInputValue(Number(e.target.value));
  };

  const addToCase = () => {
    if (inputValue > 0) {
      setMyCase([...myCase, currentCoin]);
      const addedInCase = inputValue * currentCoin.priceUsd;
      setMyCasePrice(myCasePrice + addedInCase);
      setItemsCase([...itemsCase, { currentCoin, addedInCase, inputValue }]);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1000);
    }
  };
  useEffect(() => {
    setMyCase(myCase);
    setMyCasePrice(myCasePrice);
    setItemsCase(itemsCase);
  }, [myCase, myCasePrice]);
  return (
    <div ref={ModalRef} onClick={(e) => closeModalOnClickOutside(e)} className="modal">
      <div className="modal__inner">
        <form action="">
          <span className={`modal__add ${error ? 'modal__add-error' : ''}`}>
            {error ? 'Нельзя добавить 0' : ' Вы добавляете:'}
          </span>
          <p>{currentCoin.name}</p>
          <div className="modal__input">
            <input
              onChange={onChangeInput}
              value={inputValue}
              type="number"
              placeholder="Введите кол-во коинов"
            />
          </div>

          <button
            onClick={addToCase}
            className={`modal__button ${success ? 'modal__button-success' : ''}`}
            type="button">
            {success ? 'Успешно' : 'Добавить'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
