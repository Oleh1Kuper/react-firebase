import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { fireDB } from '../firebaseConfig';

export const updateUserProfile = async (payload: any) => {
  const user = JSON.parse(localStorage.getItem('user')!);

  try {
    await updateDoc(doc(fireDB, 'users', user.id), payload);
    return {
      success: true,
      message: 'Profile updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: new Error('Something went wrong'),
    };
  }
};

export const getUserProfile = async (id: string) => {
  try {
    const docRef = doc(fireDB, 'users', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { success: true, message: 'User profile was received', data: docSnap.data() };
    }

    return { success: false, message: 'No such user!', data: null };
  } catch (error) {
    return {
      success: false,
      message: new Error('Something went wrong'),
      data: null,
    };
  }
};
