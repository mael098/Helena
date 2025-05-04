export type MedicalRecordType = {
  id: string;
  patientId: string;
  date: string;
  title: string;
  description: string;
  provider: string;
  attachments?: string[];
};