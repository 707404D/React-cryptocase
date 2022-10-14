export const getOldPriceFromLS = () => {
  const dataPrice = localStorage.getItem('price');
  const oldPrice: number = dataPrice ? JSON.parse(dataPrice) : 0;

  return oldPrice;
};
