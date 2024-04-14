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
  where,
} from 'firebase/firestore';
import { fireDB } from '../firebaseConfig';
import moment from 'moment';
import { JobType } from '../types/jobType';

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

    await addDoc(collection(fireDB, 'users', 'admin', 'notifications'), {
      title: `New Job Post Request from ${user.name}`,
      createdAt: moment().format('DD-MM-YYYY HH:mm A'),
      path: '/admin/jobs',
      status: 'unread',
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

    if (docSnap.exists()) {
      return {
        success: true,
        message: 'Job was found',
        data: { id, ...docSnap.data() },
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

export const getAllJobs = async () => {
  try {
    const jobs: DocumentData[] = [];
    const qry = query(collection(fireDB, 'jobs'), orderBy('postedOn', 'desc'));
    const querySnapshot = await getDocs(qry);

    querySnapshot.forEach((doc) => {
      jobs.push({ id: doc.id, ...doc.data() });
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

export const changeJobStatusFromAdmin = async (payload: DocumentData) => {
  try {
    await updateDoc(doc(fireDB, 'jobs', payload.id), {
      ...payload,
      updatedOn: moment().format('DD-MM-YYYY HH:mm A'),
    });

    await addDoc(
      collection(fireDB, 'users', payload.userId, 'notifications'),
      {
        title: `Your job post request for ${payload.title} has been ${payload.status}`,
        createdAt: moment().format('DD-MM-YYYY HH:mm A'),
        path: '/posted-jobs',
        status: 'unread',
      },
    );

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

export const applyJobPost = async (payload: DocumentData) => {
  const user = JSON.parse(localStorage.getItem('user')!);

  try {
    await addDoc(collection(fireDB, 'applications'), {
      jobId: payload.id,
      jobTitle: payload.title,
      company: payload.company,
      userId: user.id,
      userName: user.name,
      email: user.email,
      appliedOn: moment().format('DD-MM-YYYY HH:mm A'),
      status: 'pending',
    });

    return {
      success: true,
      message: 'Job applied successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
    };
  }
};

export const getApplicationsById = async (payloadId: string, id: string) => {
  try {
    const applications: DocumentData[] = [];
    const qry = query(
      collection(fireDB, 'applications'),
      where(payloadId, '==', id),
    );
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });

    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
      data: null,
    };
  }
};

export const getAllApplications = async () => {
  try {
    const applications: DocumentData = [];
    const qry = query(collection(fireDB, 'applications'));
    const querySnapshot = await getDocs(qry);
    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });

    return {
      success: true,
      data: applications,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
      data: null,
    };
  }
};

export const changeApplicationStatus = async (payload: DocumentData) => {
  try {
    await updateDoc(doc(fireDB, 'applications', payload.id), {
      status: payload.status,
    });

    await addDoc(collection(fireDB, `users/${payload.userId}/notifications`), {
      title: `Your application for ${payload.jobTitle} in ${payload.company} is ${payload.status}`,
      status: 'unread',
      path: '/applied-jobs',
      createdAt: moment().format('DD-MM-YYYY HH:mm A'),
    });

    return {
      success: true,
      message: 'Application status updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong',
    };
  }
};
