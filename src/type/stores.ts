export type StoreProfile = {
  storeId: number;
  ownerId: number;
  avatar?: string;
  name: string;
  description?: string;
  inviteCode?: string;
  storeStatus: string;
  operatingHour: {
    monday: { open: string; close: string; isOpen: boolean };
    tuesday: { open: string; close: string; isOpen: boolean };
    wednesday: { open: string; close: string; isOpen: boolean };
    thursday: { open: string; close: string; isOpen: boolean };
    friday: { open: string; close: string; isOpen: boolean };
    saturday: { open: string; close: string; isOpen: boolean };
    sunday: { open: string; close: string; isOpen: boolean };
  };
  createdAt: string;
  updatedAt?: string;
};

export type StoreInfo = {
  storeId: number;
  memberCount: number;
  categoriesCount: number;
  productsCount: number;
  readyStock: number;
  outofStock: number;
};
