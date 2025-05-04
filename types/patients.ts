export type PatientType = {
  id: string;
  name: string;
  dob: string;
  age: number;
  phone: string;
  email: string;
  address: string;
  avatar: string;
  status: string;
  medicalHistory?: string;
  allergies?: string;
  obstetricHistory?: {
    pregnancies: number;
    births: number;
    cesarean: number;
    abortions: number;
    lastPeriod?: string;
  };
  medications?: {
    name: string;
    dosage: string;
    frequency: string;
  }[];
};