import {
  updateDoc,
  doc,
  getDoc,
  collection,
  DocumentData,
  getDocs,
  query,
  onSnapshot,
} from 'firebase/firestore';
import { fireDB } from '../firebaseConfig';
import { actions } from '../features/notifications';
import store from '../store/store';

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
      return {
        success: true,
        message: 'User profile was received',
        data: docSnap.data(),
      };
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

export const getAllUsers = async () => {
  try {
    const users: DocumentData[] = [];
    const querySnapshot = await getDocs(collection(fireDB, 'users'));

    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    return {
      success: true,
      data: users,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
      data: null,
    };
  }
};

export const getUserNofications = async () => {
  const user = JSON.parse(localStorage.getItem('user')!);

  try {
    const qry = query(collection(fireDB, 'users', user.id, 'notifications'));

    onSnapshot(qry, (querySnapshot) => {
      const notifications: DocumentData[] = [];

      querySnapshot.forEach((doc) => {
        notifications.push({ id: doc.id, ...doc.data() });
      });

      const readNotifications = notifications
        .filter((notification) => notification.status === 'read');
      const unreadNotifications = notifications
        .filter((notification) => notification.status === 'unread');

      store.dispatch(actions.setReadNotifications(readNotifications));
      store.dispatch(actions.setUnreadNotifications(unreadNotifications));
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
    };
  }
};

export const changeNotificationStatus = async (id: string, status: string) => {
  const user = JSON.parse(localStorage.getItem('user')!);

  try {
    await updateDoc(doc(fireDB, 'users', user.id, 'notifications', id), {
      status,
    });
    return {
      success: true,
      message: 'Notification status changed',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
    };
  }
};
