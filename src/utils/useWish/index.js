import Storage from '../../helpers/localStorage';

// Proceso de save de item en wishlist
const setWishItem = async item => {
  try {
    // recupero la lista actual de items en wish
    const wishlistcurrent = JSON.parse(
      await Storage.getItem('currentWishList'),
    );

    const emailUserCurrent = String(await Storage.getItem('email'));

    // verifico si se cumplen las condiciones del wish si tiene datos y no esta null
    if (wishlistcurrent && wishlistcurrent.wishlist && emailUserCurrent) {
      let exists = false;

      // Verifico si existe el id en el wishlist
      wishlistcurrent.wishlist.find(function (value, index) {
        // console.log({index}, {value});
        value?.id === item?.id && value?.emailUser === emailUserCurrent
          ? (exists = true)
          : (exists = false);
      });
      let newwish = wishlistcurrent.wishlist;
      if (!exists) {
        let dataSave = {
          id: item.id,
          name: item.name,
          picture: item.picture || '',
          price: item.price || '',
          category: item.category || null,
          model: item.model || '', 
          product_image: item?.product_image || [],
          object_ar: item?.object_ar || '',
          emailUser: emailUserCurrent,
        };
        newwish.push(dataSave);
        Storage.removeItem('currentWishList');
        let objwish = {};
        objwish.wishlist = newwish;
        Storage.storeData('currentWishList', JSON.stringify(objwish));
        return 'saved';
      } else {
        return 'already exists';
      }
    } else {
      let dataSave = {
        id: item.id,
        name: item.name,
        picture: item.picture || '',
        price: item.price || '',
        category: item.category || null,
        model: item.model || '',
        product_image: item?.product_image || [],
        object_ar: item?.object_ar || '',
        emailUser: emailUserCurrent,
      };
      let objwish = {};
      objwish.wishlist = [dataSave];
      Storage.storeData('currentWishList', JSON.stringify(objwish));
      return 'saved';
    }
  } catch (e) {
    return false;
  }
};

const getWishList = async () => {
  try {
    // recupero la lista actual de items en wish
    const wishlistcurrent = JSON.parse(
      await Storage.getItem('currentWishList'),
    );
    const emailUserCurrent = String(await Storage.getItem('email'));

    // verifico si se cumplen las condiciones del wish si tiene datos y no esta null
    if (wishlistcurrent && wishlistcurrent.wishlist && emailUserCurrent) {
      const result = wishlistcurrent.wishlist.filter(
        res => res.emailUser === emailUserCurrent,
      );

      return result;
    } else {
      return 'empty';
    }
  } catch (error) {
    return 'error';
  }
};

const getWishItem = async idItem => {
  try {
    // recupero la lista actual de items en wish
    const wishlistcurrent = JSON.parse(
      await Storage.getItem('currentWishList'),
    );
    const emailUserCurrent = String(await Storage.getItem('email'));

    // verifico si se cumplen las condiciones del wish si tiene datos y no esta null
    if (wishlistcurrent && wishlistcurrent.wishlist && emailUserCurrent) {
      const result = wishlistcurrent.wishlist.filter(
        res => res.emailUser === emailUserCurrent && res.id === idItem,
      );

      return result?.length > 0 ? result : 'no located';
    } else {
      return 'no located';
    }
  } catch (error) {
    return 'error';
  }
};

const dropWishItem = async id => {
  try {
    // recupero la lista actual de items en wish
    const wishlistcurrent = JSON.parse(
      await Storage.getItem('currentWishList'),
    );
    const emailUserCurrent = String(await Storage.getItem('email'));

    if (wishlistcurrent && wishlistcurrent.wishlist && emailUserCurrent) {
      let exists = null;
      let indextoslice = null;
      // Verifico si existe el id en el wishlist
      wishlistcurrent.wishlist.find(function (value, index) {
        // console.log({index}, {value});
        if (value?.id === id && value?.emailUser === emailUserCurrent) {
          exists = true;
          indextoslice = index;
        }
      });

      let newwish = wishlistcurrent.wishlist;
      if (exists) {
        newwish.splice(indextoslice, 1);
        Storage.removeItem('currentWishList');
        let objwish = {};
        objwish.wishlist = newwish;
        // console.log(objwish);
        if (newwish.length > 0) {
          Storage.storeData('currentWishList', JSON.stringify(objwish));
        }
        return 'updated';
      } else {
        return 'item no exists';
      }
    }
  } catch (e) {
    return 'error';
  }
};

const clearAll = () => {
  Storage.removeItem('currentWishList');
};

export default {setWishItem, getWishList, getWishItem, dropWishItem, clearAll};
