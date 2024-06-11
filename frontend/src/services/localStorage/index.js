export const useLocalStorage = () => {
  const getItem = (key) => localStorage.getItem(key);
  const setItem = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value));
  const removeItem = (key) => localStorage.removeItem(key);

  return { getItem, setItem, removeItem };
};
