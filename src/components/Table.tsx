import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CoinType } from '../pages/CoinTable';
import Modal from './Modal';
import Pagination from './Pagination';

const Table: FC<any> = ({
  myCase,
  setMyCase,
  myCasePrice,
  setMyCasePrice,
  openModal,
  currentCoin,
  setCurrentCoin,
  setOpenModal,
}) => {
  const [coinsData, setCoinsData] = useState<CoinType[]>();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchCoins = async () => {
      const result = await axios.get(
        `https://api.coincap.io/v2/assets?offset=${page - 1}&limit=10`,
      );
      const resData = result.data.data;
      setCoinsData(resData);
    };
    fetchCoins();
  }, [page]);

  const addCurrentCoin = (item: CoinType) => {
    setCurrentCoin(item);
    setOpenModal(true);
  };
  useEffect(() => {
    setCurrentCoin(currentCoin);
  }, [currentCoin]);
  return (
    <>
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          myCase={myCase}
          setMyCase={setMyCase}
          currentCoin={currentCoin}
          myCasePrice={myCasePrice}
          setMyCasePrice={setMyCasePrice}
        />
      )}
      <div className="cointable">
        <div className="container">
          <div className="cointable__wrapper">
            <ul className="cointable__items">
              <div className="cointable__header">
                <div className="cointable__header-list">
                  <li>Ранг</li>
                  <li>Название</li>
                  <li>Цена</li>
                  <li>Symbol</li>
                  <li>24Hr change %</li>
                </div>
              </div>
              <div className="cointable__list">
                {coinsData?.map((item: any) => (
                  <li key={item.rank}>
                    <Link to={'/coin/' + item.id}>
                      <span>{item.rank}</span>
                      <span>{item.name}</span>
                      <span>{Number(item.priceUsd).toFixed(5)} $</span>
                      <span>{item.symbol}</span>
                      <span>{Number(item.changePercent24Hr).toFixed(5)} %</span>
                    </Link>
                    <span>
                      <button
                        className="cointable__button"
                        onClick={() => addCurrentCoin(item)}></button>
                    </span>
                  </li>
                ))}
              </div>
              <Pagination page={page} setPage={setPage} />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
