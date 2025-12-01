// Profile Type Definitions
type UserProfile = {
  id: number;
  avatar?: string;
  name: string;
  bio?: string;
  email: string;
  telephone?: string;
  externalLinks?: ExternalLink;
  createdAt: string;
  updateAt?: string;
  status?: {
    isOnline: boolean;
    lastOnlineAt?: string;
  }
}

// Store Profile Type Definitions
type StoreProfile = {
  id: number;
  avatar?: string;
  name: string;
  bio?: string;
  email: string;
  telephone?: string;
  externalLinks?: ExternalLink;
  productCount: number;
  staffCount: number;
  createdAt: string;
  updatedAt?: string;
}

// Staff Role
type StaffRole = 
  | "owner"
  | "manager"
  | "cashier"
  | "staff";

// Define a type for external links with optional properties for various platforms
type ExternalLink = Partial<
  Record<
  | "instagram"
  | "facebook"
  | "youtube"
  | "tiktok"
  | "whatsapp"
  | "telegram"
  | "shopee"
  | "tokopedia"
  | "web",
  string
>
>;