// Staff Role
type StaffRole = "owner" | "manager" | "cashier" | "staff";

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
