// Gallery for images type
type Gallery = {
  id: string;
  type: GalleryItemType;
  title: string;
  url: string;
  description?: string;
  like: number;
  dislike: number;
  createdAt: string;
  updatedAt?: string;
};


// Define different types of gallery items
type GalleryItemType = 
  | "product"
  | "post"
  | "banner"
  | "other";