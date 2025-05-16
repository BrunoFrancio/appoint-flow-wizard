
export interface AppointmentData {
  date: Date | undefined;
  time: string;
  service: string;
  customerInfo: CustomerInfo;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
}

export type StepType = "date" | "time" | "service" | "info" | "summary";
