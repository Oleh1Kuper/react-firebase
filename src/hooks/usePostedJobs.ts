import { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import {
  changeJobStatusFromAdmin,
  deleteJobById,
  getAllJobs,
} from '../services/jobs';
import { toast } from 'react-toastify';

const usePostedJobs = () => {
  const [jobs, setJobs] = useState<DocumentData[] | null>(null);
  const [isLoad, setIsload] = useState(false);

  const getJobs = async () => {
    setIsload(true);

    try {
      const response = await getAllJobs();

      if (response.success) {
        setJobs(response.data);
      }
    } catch (error) {
      toast.error(`${error}`, { position: 'top-center' });
    } finally {
      setIsload(false);
    }
  };

  const removeJob = (id: string) => async () => {
    try {
      const response = await deleteJobById(id);

      if (response.success) {
        getJobs();
        toast.success(response.message, { position: 'top-center' });
      }
    } catch (error) {
      toast.error(`${error}`, { position: 'top-center' });
    }
  };

  const changeJobStatus = (postedJob: DocumentData, status: string,) => async () => {
    try {
      const response = await changeJobStatusFromAdmin({ ...postedJob, status, });

      if (response.success) {
        getJobs();
        toast.success(response.message, { position: 'top-center' });
      }
    } catch (error) {
      toast.error(`${error}`, { position: 'top-center' });
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  return { removeJob, isLoad, jobs, changeJobStatus };
};

export default usePostedJobs;
