"use client";

import styles from "./styles.module.css";
import button from "@/component/Styles/Button.module.css";
import { InfoMenu } from "@/component/InfoMenu/InfoMenu";
import { useEffect, useState } from "react";
import usePreferences from "@/hook/usePreferences";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { getStoreInfo } from "@/lib/api/stores";
import { StoreInfo } from "@/type/store";
import Link from "next/link";

export default function ProductsIndexPage() {
  const router = useRouter();
  const [storeInfo, setStoreInfo] = useState<StoreInfo>();
  const { preferences, isLoaded } = usePreferences();
  const storeSelection = preferences.storeSelection;

  const updateStoreInfo = async () => {
    if (!storeSelection) return;
    const data = await getStoreInfo(storeSelection);
    if (data) setStoreInfo(data);
  };

  useEffect(() => {
    if (isLoaded && !storeSelection) {
      router.replace("/home?redirect=/products");
    }
    if (storeSelection) updateStoreInfo();
  }, [isLoaded, storeSelection, router]);

  if (!isLoaded || (isLoaded && !storeSelection)) return <Loading />;

  return (
    <InfoMenu>
      <InfoMenu.Thumbnail
        src="/images/banner/products-banner.png"
        width={1600}
        height={900}
        aspectRatio={{ width: 1, height: 1 }}
      />
      <InfoMenu.Main className={styles.infoMenu}>
        <InfoMenu.Component className={styles.infoComponent}>
          <h1>{storeInfo?.productsCount || 0} Products</h1>
        </InfoMenu.Component>
        <InfoMenu.Footer>
          <Link href="/products/create" className={button.primary}>
            Create New Product
          </Link>
        </InfoMenu.Footer>
      </InfoMenu.Main>
    </InfoMenu>
  );
}
