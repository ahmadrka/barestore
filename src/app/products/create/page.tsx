"use client";

import styles from "./styles.module.css";
import form from "@/component/Styles/Form.module.css";
import button from "@/component/Styles/Button.module.css";
import PanelNavlist from "@/component/PanelNavlist/PanelNavlist";
import { useState, useEffect } from "react";
import { Category } from "@/type/category";
import { getCategories } from "@/lib/api/categories";
import usePreferences from "@/hook/usePreferences";
import { DropdownMenu } from "@/component/DropdownMenu/DropdownMenu";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/api/products";
import { toast } from "sonner";

const items = [
  { label: "Product Creation", href: "/products/create" },
  { label: "Back to Products", href: "/products" },
];

export default function CreateProduct() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categorySearch, setCategorySearch] = useState("");
  const [error, setError] = useState("");
  const [productData, setProductData] = useState({
    title: "",
    price: "0",
    description: "",
    stock: 0,
    plu: "",
    barcode: "",
    categoryId: 0,
    weightType: "",
    status: "AVAILABLE",
  });
  const { preferences, setPreference, isLoaded } = usePreferences();
  const storeId = preferences.storeSelection;

  useEffect(() => {
    if (storeId) {
      const fetchCategories = async () => {
        const categories = await getCategories(storeId);
        setCategories(categories);
      };
      fetchCategories();
    }
  }, [storeId, isLoaded]);

  // Prevent accidental reload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Check if any field has data (simple check)
      const isDirty =
        productData.title !== "" ||
        productData.price !== "0" ||
        productData.stock !== 0 ||
        productData.description !== "" ||
        productData.categoryId !== 0;

      if (isDirty) {
        e.preventDefault();
        e.returnValue = ""; // Standard for most browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [productData]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 1. Validation: Required Fields
    if (!productData.title) return setError("Product Title is required.");
    if (!productData.price) return setError("Price is required.");
    if (productData.stock < 0) return setError("Stock cannot be less than 0.");
    if (!productData.weightType) return setError("Weight Type is required.");

    // 2. Validation: Optional Fields with constraints
    if (productData.barcode && productData.barcode.length < 4) {
      return setError("Barcode must be between 4 and 15 characters.");
    }

    // 3. Validation: Category (If user typed something but didn't pick a valid one)
    if (categorySearch && productData.categoryId === 0) {
      return setError("Please select a valid Category from the list.");
    }

    if (!storeId) return;

    console.log(productData);
    try {
      // Adjust payload to match API expectation if necessary
      await createProduct(storeId, productData as any);
      toast.success("Product created successfully!");
      router.push("/products/create/images");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create product. Please try again.");
    }
  };

  return (
    <div className={styles.parent}>
      <PanelNavlist items={items} />
      <main className={styles.main}>
        <div className={styles.creation}>
          <div className={styles.creationMain}>
            <div className={styles.title}>
              <h1>Product Creation</h1>
              <p>Please fill in the form below to create a new product.</p>
            </div>
            <form className={form.form} onSubmit={(e) => e.preventDefault()}>
              <h2>Product Details</h2>
              <div>
                <label htmlFor="name">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder=""
                    value={productData.title}
                    required
                    onChange={(e) =>
                      setProductData({ ...productData, title: e.target.value })
                    }
                  />
                  <span>Product Title</span>
                </label>
                <DropdownMenu>
                  <DropdownMenu.Trigger>
                    <label htmlFor="category">
                      <input
                        type="text"
                        id="category"
                        name="category"
                        placeholder=" "
                        autoComplete="off"
                        pattern={categories.map((c) => c.name).join("|")}
                        value={categorySearch}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCategorySearch(val);
                          const match = categories.find((c) => c.name === val);

                          if (match) {
                            setProductData({
                              ...productData,
                              categoryId: match.categoryId,
                            });
                          } else if (productData.categoryId) {
                            setProductData({ ...productData, categoryId: 0 });
                          }
                        }}
                      />
                      <span>Category (Optional)</span>
                    </label>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Section>
                      {categories
                        .filter((category) =>
                          category.name
                            .toLowerCase()
                            .includes(categorySearch.toLowerCase())
                        )
                        .map((category) => (
                          <DropdownMenu.Item
                            key={category.categoryId}
                            onSelect={() => {
                              setProductData({
                                ...productData,
                                categoryId: category.categoryId,
                              });
                              setCategorySearch(category.name);
                            }}
                          >
                            {category.name}
                          </DropdownMenu.Item>
                        ))}
                    </DropdownMenu.Section>
                  </DropdownMenu.Content>
                </DropdownMenu>
              </div>
              <label htmlFor="description">
                <textarea
                  id="description"
                  name="description"
                  placeholder=" "
                  value={productData.description}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      description: e.target.value,
                    })
                  }
                />
                <span>Description (Optional)</span>
              </label>
            </form>
            <form className={form.form} onSubmit={(e) => e.preventDefault()}>
              <h2>Product Information</h2>
              <div>
                <label htmlFor="price">
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder=" "
                    prefix="Rp."
                    min={0}
                    max={999999999999999}
                    required
                    value={productData.price}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        price: e.target.value,
                      })
                    }
                  />
                  <span>Price</span>
                </label>
                <label htmlFor="stock">
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    placeholder=" "
                    min={0}
                    max={999999999999999}
                    required
                    value={productData.stock}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        stock: Number(e.target.value),
                      })
                    }
                  />
                  <span>Stock</span>
                </label>
                <DropdownMenu>
                  <DropdownMenu.Trigger>
                    <label htmlFor="weightType">
                      <input
                        type="text"
                        id="weightType"
                        name="weightType"
                        placeholder=" "
                        autoComplete="off"
                        pattern={"ABSOLUTE|WEIGHT"}
                        required
                        value={productData.weightType}
                        onChange={(e) => {
                          const val = e.target.value;
                          setProductData({
                            ...productData,
                            weightType: val,
                          });
                        }}
                      />
                      <span>Weight Type</span>
                    </label>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Section>
                      <DropdownMenu.Item
                        onSelect={() =>
                          setProductData({
                            ...productData,
                            weightType: "ABSOLUTE",
                          })
                        }
                      >
                        ABSOLUTE (eg. packaged or instant food)
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        onSelect={() =>
                          setProductData({
                            ...productData,
                            weightType: "RELATIVE",
                          })
                        }
                      >
                        RELATIVE (eg. fresh or raw food)
                      </DropdownMenu.Item>
                    </DropdownMenu.Section>
                  </DropdownMenu.Content>
                </DropdownMenu>
                <label htmlFor="barcode">
                  <input
                    type="text"
                    id="barcode"
                    name="barcode"
                    placeholder=" "
                    minLength={4}
                    maxLength={15}
                    pattern="\d*"
                    inputMode="numeric"
                    value={productData.barcode}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        barcode: e.target.value.replace(/\D/g, ""),
                      })
                    }
                  />
                  <span>Barcode (Optional)</span>
                </label>
              </div>
            </form>
            {error && (
              <p className={`${form.error} ${styles.error}`}>{error}</p>
            )}
            <div className={styles.buttonContainer}>
              <button
                className={`${button.secondary} ${styles.cancel}`}
                onClick={() => {
                  if (
                    confirm(
                      "Are you sure you want to cancel? all data will be lost"
                    )
                  ) {
                    router.back();
                  }
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${button.primary} ${styles.submit}`}
                onClick={(e) => handleSubmit(e)}
              >
                {`Create Product ->`}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
