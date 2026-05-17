export type UserRole = "admin" | "customer";

export interface BusinessProfile {
  id: string;
  name: string;
  description: string;
  category: string;
  address: string;
  logoUrl?: string;
  bannerUrl?: string;
  averageServiceTime: number; // in minutes
}

export interface QueueEntry {
  id: string;
  businessId: string;
  userId: string;
  userName: string;
  queueNumber: number;
  status: "waiting" | "called" | "completed" | "cancelled";
  createdAt: any; // Firestore Timestamp
  estimatedTime?: any; // Firestore Timestamp
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  businessId?: string; // Only for admin
}
