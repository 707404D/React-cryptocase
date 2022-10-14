import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
type CoinType = {
  changePercent24Hr: string;
  explorer: string;
  id: string;
  marketCapUsd: string;
  maxSupply: string;
  name: string;
  priceUsd: string;
  rank: string;
  supply: string;
  symbol: string;
  volumeUsd24Hr: string;
  vwap24Hr: string;
};
const Coin = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState<CoinType>();
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const result = await axios.get(`https://api.coincap.io/v2/assets/${id?.toLowerCase()}`);
        const resData = result.data.data;
        setCoin(resData);
      } catch (err) {
        alert(err);
      }
    };
    fetchCoin();
  }, []);
  useEffect(() => {
    setCoin(coin);
  }, [coin]);

  return (
    <div className="coin">
      <div className="container">
        <ul className="coin__wrapper">
          {coin && (
            <>
              <li>
                Rank: <span>{coin.rank}</span>
              </li>
              <li>
                Name:
                <span> {coin.name}</span>
              </li>
              <li>
                Info:
                <span>
                  <a href={coin.explorer} target="_blank">
                    {coin.explorer}
                  </a>
                </span>
              </li>
              <li>
                Symbol:<span>{coin.symbol}</span>
              </li>
              <li>
                PriceUsd: <span>{coin.priceUsd}</span>
              </li>
              <li>
                ChangePercent24Hr:<span>{coin.changePercent24Hr}</span>
              </li>
              <li>
                Supply:<span>{coin.supply}</span>
              </li>
            </>
          )}
        </ul>
        <div className="coin__back">
          <Link to="/">
            <span>Вернуться назад</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Coin;
