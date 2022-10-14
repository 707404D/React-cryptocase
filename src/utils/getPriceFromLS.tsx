export const getPriceFromLS = () => {
  const dataPrice = localStorage.getItem('price');
  const price = dataPrice ? JSON.parse(dataPrice) : 0.0001;

  return price;
};
