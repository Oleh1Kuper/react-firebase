import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { fireDB } from '../firebaseConfig';
import { FormData } from '../components/Form';
import CryptoJs from 'crypto-js';

export const loginUser = async (payload: FormData) => {
  try {
    const qry = query(
      collection(fireDB, 'users'),
      where('email', '==', payload.email),
    );
    const querySnapshot = await getDocs(qry);

    if (querySnapshot.empty) {
      return {
        success: false,
        message: new Error('User is not found'),
        data: null,
      };
    }

    const snapshotsData = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        password: doc.data().password,
        email: doc.data().email,
        name: doc.data().name,
      };
    });

    const user = snapshotsData[0];
    const decryptedPassword = CryptoJs.AES.decrypt(
      user.password,
      'secret-key',
    ).toString(CryptoJs.enc.Utf8);

    return decryptedPassword === payload.password
      ? {
          success: true,
          message: 'Login was successful',
          data: { ...user, password: '' },
        }
      : {
          success: false,
          message: new Error('Incorrect password'),
          data: null,
        };
  } catch (error) {
    return {
      success: false,
      message: new Error('Something went wrong'),
      data: null,
    };
  }
};

export const registerUser = async (payload: FormData) => {
  try {
    const qry = query(
      collection(fireDB, 'users'),
      where('email', '==', payload.email),
    );
    const querySnapshot = await getDocs(qry);

    if (!querySnapshot.empty) {
      return {
        success: false,
        message: new Error('User with this email already exists'),
        data: null,
      };
    }

    const encryptedPassword = CryptoJs.AES.encrypt(
      payload.password,
      'secret-key',
    ).toString();

    payload.password = encryptedPassword;
    const response = await addDoc(collection(fireDB, 'users'), payload);

    return {
      success: true,
      message: 'User was registered successfully',
      data: response,
    };
  } catch {
    return {
      success: false,
      message: new Error('Something went wrong'),
      data: null,
    };
  }
};
