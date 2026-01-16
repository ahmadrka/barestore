import { StoreProfile } from "./store";

export type UserStore = {
  memberId: number;
  userId: number;
  storeId: number;
  role: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
  store: StoreProfile;
};
