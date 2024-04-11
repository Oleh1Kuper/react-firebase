export interface Education {
  degree: string;
  institution: string;
  percentage: string;
}

export interface Skills {
  technology: string;
  rating: string;
}

export interface UserProfile {
  education: Education[];
  skills: Skills[];
  address: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  portfolio: string;
}
