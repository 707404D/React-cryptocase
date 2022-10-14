import axios from 'axios';
import React, { createContext, useEffect, useRef, useState } from 'react';

import Header from '../components/Header';

import Table from '../components/Table';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../components/NotFound';
import Case from '../components/Case';
import { getCaseFromLS } from '../utils/getCaseFromLS';
import { getPriceFromLS } from '../utils/getPriceFromLS';
import { getOldPriceFromLS } from '../utils/getOldPriceFromLS';
import Coin from '../components/Coin';

export type CoinType = {
  id: string;
  rank: number;
  name: string;
  changePercent24Hr: string;
  explorer: string;
  marketCapUsd: string;
  maxSupply: null;
  priceUsd: string;
  supply: string;
  symbol: string;
  volumeUsd24Hr: string;
  vwap24Hr: string;
};
export type CurrentCoinType = {
  name: string;
  quantity: number;
};

export const ContextItemsCase = createContext<any>('');

const CoinTable = () => {
  const [openModal, setOpenModal] = useState<any>(false);
  const [currentCoin, setCurrentCoin] = useState<any>();
  const [myCase, setMyCase] = useState([]);
  const [myCasePrice, setMyCasePrice] = useState<number>(getPriceFromLS());
  const [myCaseOldPrice, setMyCaseOldPrice] = useState<number>(getOldPriceFromLS());
  const [itemsCase, setItemsCase] = useState(getCaseFromLS());
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const jsonItemsCase = JSON.stringify(itemsCase);
      const jsonCasePrice = JSON.stringify(myCasePrice);
      const jsonCaseOldPrice = JSON.stringify(myCaseOldPrice);
      localStorage.setItem('case', jsonItemsCase);
      localStorage.setItem('price', jsonCasePrice);
      localStorage.setItem('oldPrice', jsonCaseOldPrice);
    }

    isMounted.current = true;
  }, [itemsCase, setItemsCase]);
  return (
    <ContextItemsCase.Provider
      value={[
        itemsCase,
        setItemsCase,
        myCasePrice,
        setMyCasePrice,
        myCaseOldPrice,
        setMyCaseOldPrice,
      ]}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Table
              openModal={openModal}
              myCase={myCase}
              setMyCase={setMyCase}
              setOpenModal={setOpenModal}
              currentCoin={currentCoin}
              myCasePrice={myCasePrice}
              setMyCasePrice={setMyCasePrice}
              setCurrentCoin={setCurrentCoin}
            />
          }
        />
        <Route path="coin/:id" element={<Coin />} />
        <Route path="/case" element={<Case />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </ContextItemsCase.Provider>
  );
};
export default CoinTable;
