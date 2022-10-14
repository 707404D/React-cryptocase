import React, { useContext } from 'react';
import { ContextItemsCase } from '../pages/CoinTable';
import { Link } from 'react-router-dom';

const Case = () => {
  const [itemsCase, setItemsCase, myCasePrice, setMyCasePrice] = useContext(ContextItemsCase);

  return (
    <div className="case">
      <div className="container">
        {itemsCase.length > 0 ? (
          <div className="case__coins">
            <div className="case__coins-titles">
              <li>Ранг</li>
              <li>Название</li>
              <li>Цена</li>
              <li>Добавленное</li>
            </div>
            {itemsCase.map((coin: any, i: any) => (
              <div key={i} className="case__coin">
                <div className="case__coin-wrapper">
                  <span className="case__rank">{coin.currentCoin.rank}</span>
                  <span className="case__name">{coin.currentCoin.name}</span>
                  <span className="case__price">
                    {Number(coin.currentCoin.priceUsd).toFixed(3)} $
                  </span>
                  <div className="case__value">
                    <span>{coin.inputValue} Coins </span>
                    <span>=</span>
                    <span>{Number(coin.addedInCase).toFixed(5)} $</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setItemsCase([...itemsCase.slice(0, i), ...itemsCase.slice(i + 1)]);
                    setMyCasePrice(myCasePrice - coin.addedInCase);
                  }}
                  className="case__delete"></button>
              </div>
            ))}
          </div>
        ) : (
          <div className="case__empty">
            <span>Ваш портфель пуст</span>
            <Link to="/">
              <button>Вернуться назад</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Case;
