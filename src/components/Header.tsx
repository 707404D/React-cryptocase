import axios from 'axios';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CoinType, ContextItemsCase } from '../pages/CoinTable';
const Header = () => {
  const [coinsData, setCoinsData] = useState<CoinType[]>();
  const [itemsCase, setItemsCase, myCasePrice, setMyCasePrice, myCaseOldPrice, setMyCaseOldPrice] =
    useContext(ContextItemsCase);
  const fetchCoinsCallBack = useCallback(() => {
    const fetchCoins = async () => {
      const result = await axios.get('https://api.coincap.io/v2/assets?limit=10');
      const resData = result.data.data;
      setCoinsData(resData);
    };
    fetchCoins();
  }, [coinsData]);
  useEffect(() => {
    fetchCoinsCallBack();
  }, []);
  useEffect(() => {
    const updateCaseOldPrice = () => {
      setMyCaseOldPrice(myCasePrice);
    };
    updateCaseOldPrice();
  }, []);
  useEffect(() => {
    const updateCasePrice = () => {
      setMyCasePrice(myCasePrice);
    };

    updateCasePrice();
  }, [itemsCase, setItemsCase]);

  return (
    <div className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__top-coins">
            <span>Лучшие коины:</span>
            <div className="header__top-coins-wrapper">
              {coinsData?.map((item) =>
                item.rank <= 3 ? (
                  <div className="header__top-coin" key={item.id}>
                    <span>
                      {item.name} :{Number(item.priceUsd).toFixed(3)} $
                    </span>
                  </div>
                ) : (
                  ''
                ),
              )}
            </div>
          </div>

          <div className="header__case">
            <div className="header__case--wrapper">
              <span> Портфель: {Number(myCasePrice).toFixed(3)} $</span>
              <span className="header__case-plus">
                {myCasePrice > 0
                  ? `( ${Number(((myCasePrice - myCaseOldPrice) / myCaseOldPrice) * 100).toFixed(
                      2,
                    )} %)`
                  : `+ 0 %`}
              </span>
            </div>

            <Link to="/case">
              <button>Открыть мой портфель</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
