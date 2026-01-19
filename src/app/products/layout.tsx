"use client";

import { getProducts } from "@/lib/api/products";
import { getUser } from "@/lib/api/users";
import { Product } from "@/type/product";
import { UserProfile } from "@/type/user";
import ProductPage from "./[id]/page";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import usePreferences from "@/hook/usePreferences";
import styles from "./styles.module.css";
import items from "@/component/Styles/ItemList.module.css";
import Image from "next/image";
import PanelMenu from "@/component/PanelMenu/PanelMenu";
import { useQuery } from "@tanstack/react-query";
import useLocalStorage from "@/hook/useLocalStorage";
import { Token } from "@/type/token";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const id = params.id as string;
  const excludePaths = ["/create", "/images", "/edit", "/management"];
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product[]>([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const { preferences, setPreference, isLoaded } = usePreferences();
  const [isAdmin, setIsAdmin, isAdminLoaded] = useLocalStorage<Token | null>(
    "isAdmin",
    null
  );

  const panelMenu = [
    {
      id: 1,
      default: "Last Updated",
      key: "sort",
      items: [
        {
          id: 1,
          key: "lastUpdated",
          value: "Last Updated",
          onClick: () => updateQuery("sort", "lastUpdated"),
        },
        {
          id: 2,
          key: "newest",
          value: "Newest",
          onClick: () => updateQuery("sort", "newest"),
        },
        {
          id: 3,
          key: "oldest",
          value: "Oldest",
          onClick: () => updateQuery("sort", "oldest"),
        },
        {
          id: 4,
          key: "a-z",
          value: "A - Z",
          onClick: () => updateQuery("sort", "a-z"),
        },
        {
          id: 5,
          key: "z-a",
          value: "Z - A",
          onClick: () => updateQuery("sort", "z-a"),
        },
      ],
    },
    {
      id: 2,
      default: "All Products",
      key: "filter",
      items: [
        {
          id: 1,
          key: "allProducts",
          value: "All Products",
          onClick: () => updateQuery("filter", "allProducts"),
        },
        {
          id: 2,
          key: "outOfStock",
          value: "Out of Stock",
          onClick: () => updateQuery("filter", "outOfStock"),
        },
        {
          id: 3,
          key: "preOrder",
          value: "Pre Order",
          onClick: () => updateQuery("filter", "preOrder"),
        },
      ],
    },
  ];

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    router.push(`?${params.toString()}`);
  };

  const storeSelection = preferences.storeSelection;

  // Handle Product Click
  const handleProductClick = (e: React.MouseEvent, productData: Product) => {
    if (e.ctrlKey) {
      setSelectedProduct((prev) => {
        const isExist = prev.some((p) => p.sku === productData.sku);
        if (isExist) {
          return prev.filter((p) => p.sku !== productData.sku);
        }
        return [...prev, productData];
      });
      return;
    }

    const targetId = productData.sku || "";
    if (id === targetId) {
      router.push(`/products`);
    } else {
      router.push(`/products/${targetId}`);
    }
  };

  // Is All Selected
  const isAllSelected =
    products.length > 0 && selectedProduct.length === products.length;

  // Handle "Select All" Checkbox
  const handleSelectAllChange = () => {
    if (isAllSelected) {
      setSelectedProduct([]);
    } else {
      setSelectedProduct(products);
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", storeSelection],
    queryFn: () => getProducts(storeSelection),
    enabled: !!storeSelection,
  });

  const handleSearch = () => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("search")) console.log("ABCD");
  };

  useEffect(() => {
    handleSearch();
  }, [params]);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  // CTRL + A : Select All
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow default Ctrl+A behavior in inputs and textareas
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.ctrlKey && e.key === "a") {
        e.preventDefault();

        if (selectedProduct.length === products.length) {
          // setSelectedProduct([]);
        } else {
          setSelectedProduct(products);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [products, selectedProduct]);

  useEffect(() => {
    if (isLoaded && isAdminLoaded && !storeSelection && !isAdmin) {
      router.replace("/home?redirect=/products");
    }
  }, [isLoaded, isAdminLoaded, storeSelection, isAdmin, router]);

  if (!excludePaths.some((path) => pathname.includes(path)))
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <main className={styles.products}>
          <div className={styles.productsMain}>
            <PanelMenu value={panelMenu} storeId={storeSelection} />
            <div className={`${items.itemList} ${styles.itemList}`}>
              {products.map((productData) => (
                <button
                  key={productData.productId}
                  onClick={(e) => handleProductClick(e, productData)}
                  className={`${items.item} ${
                    selectedProduct.some((p) => p.sku === productData.sku)
                      ? items.activeItem
                      : ""
                  } ${id === productData.sku ? items.selectedItem : ""}`}
                >
                  <Image
                    src={
                      productData.images[0]?.url ||
                      "/images/default/product-thumbnail.png"
                    }
                    alt={productData.title || "Store"}
                    width={100}
                    height={100}
                    unoptimized
                  />
                  <span className={items.title}>
                    <h2>{productData.title}</h2>
                    <h3>{productData.description}</h3>
                  </span>
                  {/* <div
                    className={`${items.status} ${
                      product.status !== "AVAILABLE"
                        ? items.inactive
                        : isOpen
                        ? items.open
                        : items.closed
                    }`}
                  >
                    <Icon
                      name={
                        product.status !== "AVAILABLE"
                          ? "clockExclamation"
                          : isOpen
                          ? "clockCheck"
                          : "clockMinus"
                      }
                      width={20}
                    />
                    {product.status !== "AVAILABLE"
                      ? "Inactive"
                      : isOpen
                      ? "Open"
                      : "Closed"}
                  </div> */}
                </button>
              ))}
            </div>
          </div>
          {children}
        </main>
      </div>
    );

  return children;
}
