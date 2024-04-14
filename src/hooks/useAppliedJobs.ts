import { DocumentData } from 'firebase/firestore';
import { getApplicationsById } from '../services/jobs';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useAppliedJobs = (key: string, id?: string) => {
  const [apliedJobs, setApliedJobs] = useState<DocumentData[] | null>(null);
  const [isLoad, setIsload] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')!);

  const getapliedJobs = async () => {
    setIsload(true);

    try {
      const response = await getApplicationsById(key, id || user.id);

      if (response.data!.filter((item) => item.userId === user.id).length) {
        setIsApplied(true);
      }

      if (response.success) {
        setApliedJobs(response.data);
      }
    } catch (error) {
      toast.error(`${error}`, { position: 'top-center' });
    } finally {
      setIsload(false);
    }
  };

  useEffect(() => {
    getapliedJobs();
  }, []);

  return { apliedJobs, isLoad, isApplied };
};

export default useAppliedJobs;
