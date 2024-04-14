import { useEffect, useState } from 'react';
import { getJobById } from '../services/jobs';
import { toast } from 'react-toastify';
import { DocumentData } from 'firebase/firestore';

const useSingleJob = (id: string) => {
  // const navigate = useNavigate();
  const [jobData, setJobData] = useState<DocumentData | null>(null);
  const [isLoad, setIsload] = useState(false);

  const fetchJobData = async () => {
    try {
      const response = await getJobById(id);

      if (response.success) {
        setJobData(response.data);
      }

    } catch (error) {
      toast.error(`${error}`, { position: 'top-center' });
    }
  };

  useEffect(() => {
    if (id) {
      fetchJobData();
    }
  }, []);

  return { isLoad, jobData, setIsload };
};

export default useSingleJob;
