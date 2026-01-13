export interface IEvent {
  id: string;
  name: string;
  description: string;
  rules: string[];
  startDate: string; // atau Date jika akan diparse
  endDate: string;   // atau Date jika akan diparse
  logo: string;
  location: string | null;
  isActive: boolean;
  createdAt: string; // atau Date jika akan diparse
  updatedAt: string; // atau Date jika akan diparse
  eventLogoUrl?: string
}


export interface NewIEvent {
  id: string;
  name: string;
  description: string;
  rules: string[];
  startDate: string; // atau Date jika akan diparse
  endDate: string;   // atau Date jika akan diparse
  logo: string;
  location: string | null;
  isActive: boolean;
  createdAt: string; // atau Date jika akan diparse
  updatedAt: string; // atau Date jika akan diparse
  eventLogoUrl: string
  tournament: number

}