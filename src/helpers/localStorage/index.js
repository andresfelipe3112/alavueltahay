import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    AsyncStorage.removeItem(key);
    const data = JSON.stringify(value);
    await AsyncStorage.setItem(key, data);
    return true;
  } catch (error) {
    return false;
    // console.log(error);
  }
};

const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
    // console.log(error);
  }
};

const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  } catch (error) {
    return false;
    // console.log(error);
  }
};

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (e) {
    return false;
    // console.log(e);
  }
};

const Storage = {
  storeData,
  removeItem,
  getItem,
  clearAll,
};

export default Storage;
