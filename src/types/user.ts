export interface UserProfile {
  uid: string;
  email: string | null;
  name?: string;
  farmName?: string; 
  createdAt: unknown; 
}