import {initializeApp} from 'firebase/app';
import {getFirestore, doc, setDoc, getDoc} from 'firebase/firestore/lite';

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

import GlobalVars from '../../global/globalVars';

const app = initializeApp(GlobalVars.firebaseConfig);
const db = getFirestore(app);

// Create a root reference
const storage = getStorage();

const execSetDataCollection = async (collectionName, data) => {
  try {
    await setDoc(doc(db, collectionName, data.row), data);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const execGetDataDoc = async (collectionName, data) => {
  try {
    const dataRefGet = await doc(db, collectionName, data.row);
    const res = await getDoc(dataRefGet);
    return res || 'empty';
  } catch (e) {
    return 'empty';
  }
};

const execStoreFile = async file => {
  try {
    if (!file && !file?.fileName && !file?.uri) return false;

    // Create a reference
    const storageRef = ref(storage, file?.fileName);

    const metadata = {
      contentType: file?.type || '',
      width: file?.width || '',
      height: file?.height || '',
      fileSize: file?.fileSize || '',
    };

    const img = await fetch(file?.uri);
    const bytes = await img.blob();

    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, bytes, metadata).then(snapshot => {
      // console.log({snapshot});
      // console.log('Uploaded a blob or file!');
    });
    return true;
  } catch (e) {
    return false;
  }
};

const execGetStoreFile = async file => {
  try {
    // Create a reference
    const storageRef = ref(storage, file?.fileName);
    const res = await getDownloadURL(storageRef);
    return res;
  } catch (e) {
    return false;
  }
};

const execDropStoreFile = async file => {
  try {
    // Create a reference
    const storageRef = ref(storage, file?.fileName);
    const res = await deleteObject(storageRef)
      .then(() => {
        // File deleted successfully
      })
      .catch(error => {
        // Uh-oh, an error occurred!
      });
  } catch (e) {
    return false;
  }
};

// usage
// execSetDataCollection('Wish', data);
// execGetDataDoc('Wish', data);
// execStoreFile(file);
// execGetStoreFile(file);
// execDropStoreFile(file);

export default {
  execSetDataCollection,
  execGetDataDoc,
  execStoreFile,
  execGetStoreFile,
  execDropStoreFile,
};
