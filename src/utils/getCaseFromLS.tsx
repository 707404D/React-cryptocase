export const getCaseFromLS = () => {
  const dataItems = localStorage.getItem('case');
  const items = dataItems ? JSON.parse(dataItems) : [];
  return items;
};
