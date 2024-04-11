import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { fireDB } from '../firebaseConfig';
import moment from 'moment';
import { JobType } from '../types/jobType';

// {
//   id: doc.id,
//   company: doc.data().company,
//   experience: doc.data().experience,
//   industry: doc.data().industry,
//   jobDescription: doc.data().jobDescription,
//   jobType: doc.data().jobType,
//   lastDateToApply: doc.data().lastDateToApply,
//   location: doc.data().location,
//   noticePeriod: doc.data().noticePeriod,
//   postedOn: doc.data().postedOn,
//   salary: doc.data().salary,
//   status: doc.data().status,
//   title: doc.data().title,
//   userId: doc.data().userId,
//   userName: doc.data().userName,
// }

export const addNewJobPost = async (payload: JobType) => {
  const user = JSON.parse(localStorage.getItem('user')!);

  try {
    await addDoc(collection(fireDB, 'jobs'), {
      ...payload,
      status: 'panding',
      userId: user.id,
      userName: user.name,
      postedOn: moment().format('DD-MM-YYYY HH:mm A'),
    });

    return {
      success: true,
      message: 'Job posted successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
    };
  }
};

export const getPostedJobsByUserId = async (id: string) => {
  try {
    const jobs: DocumentData[] = [];
    const qry = query(collection(fireDB, 'jobs'), orderBy('postedOn', 'desc'));
    const querySnapshot = await getDocs(qry);

    querySnapshot.forEach((doc) => {
      if (doc.data().userId === id) {
        jobs.push({ id: doc.id, ...doc.data() });
      }
    });

    return {
      success: true,
      data: jobs,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
      data: null,
    };
  }
};

export const getJobById = async (id: string) => {
  try {
    const docRef = doc(fireDB, 'jobs', id);
    const docSnap = await getDoc(docRef);

    console.log(docSnap.data());

    if (docSnap.exists()) {
      return {
        success: true,
        message: 'Job was found',
        data: docSnap.data(),
      };
    }

    return {
      success: false,
      message: 'No such job!',
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
      data: null,
    };
  }
};

export const editJobDetails = async (payload: DocumentData) => {
  try {
    await updateDoc(doc(fireDB, 'jobs', payload.id), {
      ...payload,
      updatedOn: moment().format('DD-MM-YYYY HH:mm A'),
    });

    return {
      success: true,
      message: 'Job updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
    };
  }
};

export const deleteJobById = async (id: string) => {
  try {
    await deleteDoc(doc(fireDB, 'jobs', id));
    return {
      success: true,
      message: 'Job deleted successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
    };
  }
};
