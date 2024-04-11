export interface JobType {
  company: string;
  experience: string;
  industry: string;
  jobDescription: string;
  jobType: string;
  lastDateToApply: string;
  location: string;
  noticePeriod: string;
  salary: string;
  title: string;
}

export interface ExtendedJobType extends JobType {
  status: string;
  userId: string;
  userName: string;
  postedOn: string;
  id: string;
}
