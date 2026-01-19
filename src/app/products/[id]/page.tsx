"use client";

import MainHeader from "@/component/MainHeader/MainHeader";
import PanelNavbar from "@/component/PanelNavbar/PanelNavbar";
import styles from "../styles.module.css";
import button from "@/component/Styles/Button.module.css";
import { InfoMenu } from "@/component/InfoMenu/InfoMenu";
import { Suspense, use, useEffect, useState } from "react";
import { getProducts } from "@/lib/api/products";
import { getUser } from "@/lib/api/users";
import { UserProfile } from "@/type/user";
import { Product } from "@/type/product";
import usePreferences from "@/hook/usePreferences";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import Image from "next/image";
import Icon from "@/component/Icon/Icon";
import { getStoreInfo } from "@/lib/api/stores";
import { StoreInfo } from "@/type/store";
import Link from "next/link";

export default function ProductsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const paramsData = use(params);
  const id = paramsData.id;
  const [storeInfo, setStoreInfo] = useState<StoreInfo>();
  const [product, setProduct] = useState<Product>();
  const { preferences, setPreference, isLoaded } = usePreferences();

  const storeSelection = preferences.storeSelection;

  const updateStoreInfo = async () => {
    if (!storeSelection) return;
    const data = await getStoreInfo(storeSelection);
    if (data) setStoreInfo(data);
  };

  const fetchData = async () => {
    try {
      if (id) {
        const productData = await getProducts(storeSelection, id.toString());
        setProduct(productData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (isLoaded && !storeSelection) {
      router.replace("/home?redirect=/products");
    }

    if (storeSelection) updateStoreInfo();
  }, [isLoaded, storeSelection, router]);

  useEffect(() => {
    if (isLoaded && storeSelection) {
      fetchData();
    }
  }, [isLoaded, storeSelection]);

  if (!isLoaded || (isLoaded && !storeSelection)) return <Loading />;

  return (
    <InfoMenu>
      <InfoMenu.Thumbnail
        src={product?.images[0]?.url || "/images/banner/product-banner.png"}
        width={1600}
        height={900}
        aspectRatio={{ width: 1, height: 1 }}
      />
      <InfoMenu.Main className={styles.infoMenu}>
        <InfoMenu.Component className={styles.infoComponent}>
          <h1>{product?.title}</h1>
          <h2>{product?.description}</h2>
          <p>{product?.price}</p>
        </InfoMenu.Component>
        <InfoMenu.Footer>
          <Link href={`/products/${id}/edit`} className={button.primary}>
            Edit Product
          </Link>
          <Link href="/products/create" className={button.secondary}>
            Create New Product
          </Link>
        </InfoMenu.Footer>
      </InfoMenu.Main>
    </InfoMenu>
  );
}
