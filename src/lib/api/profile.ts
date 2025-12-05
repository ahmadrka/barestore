import notFound from "@/app/not-found";

const DATABASE_API = "";

/*
export async function getUsers() {}
export async function getUser(id: number) {}

export async function getStores() {}
export async function getStore(id: number) {}

export async function getProducts() {}
export async function getProduct(id: number) {}
*/

// // DUMMY EXPORT FOR TESTING PURPOSES // //

export async function getUser(id: number): Promise<UserProfile> {
  try {
    const response = await fetch("/dummy/userProfile.json");
    if (!response.ok) {
      notFound();
    }
    return response.json();
  } catch (err) {
    console.error("Failed fetching data :", err);
    throw new Error("Failed fetching data");
  }
}

export async function getStoreProfile(id?: number): Promise<StoreProfile> {
  try {
    const response = await fetch("/dummy/storeProfile.json");
    if (!response.ok) {
      notFound();
    }
    return response.json();
  } catch (err) {
    console.error("Failed fetching data :", err);
    throw new Error("Failed fetching data");
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch("/dummy/products.json");
    if (!response.ok) {
      notFound();
    }
    return response.json();
  } catch (err) {
    // console.error("Failed fetching data :", err);
    throw new Error("Failed fetching data");
  }
}
