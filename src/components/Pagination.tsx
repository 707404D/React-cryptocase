import React, { useEffect, useState } from 'react';

const Pagination = ({ setPage }: any) => {
  const [inputPageValue, setInputPageValue] = useState(1);
  const onChangePageInput = (e: any) => {
    setInputPageValue(e.target.value);
  };

  useEffect(() => {
    setPage(inputPageValue);
  }, [onChangePageInput]);

  return (
    <>
      <div className="pagination">
        <div className="pagination__input">
          <span>Начать с :</span>
          <input type="number" onChange={onChangePageInput} value={inputPageValue} />
        </div>
      </div>
    </>
  );
};

export default Pagination;
