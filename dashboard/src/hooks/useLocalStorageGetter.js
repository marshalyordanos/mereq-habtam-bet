const useLocalStorageGetter = (key) => {
  const storedValue = localStorage.getItem(key);
  return storedValue;
};

export default useLocalStorageGetter;
