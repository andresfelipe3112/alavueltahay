import Storage from '../localStorage';

import cloudStorage from '../../utils/cloudStorage';

const saveWishCloud = async item => {
  try {
    if (item?.id && item?.name) {
      const emailUserCurrent = String(await Storage.getItem('email'));
      let dataSave = {
        id: item.id,
        name: item.name ?? '',
        picture: item.picture ?? '',
        price: item.price ?? '',
        category: item.category ?? null,
        model: item.model ?? '',
        product_image: item?.product_image || [],
        row: `${emailUserCurrent}|${item.id}|${item.name.replaceAll(' ', '_')}`,
      };

      await cloudStorage.execSetDataCollection('Wish', dataSave);
      return true;
    } else {
      return false;
    }
  } catch (_) {
    return false;
  }
};

export default {saveWishCloud};
