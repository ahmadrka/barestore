"use client";

import { useContext, useEffect, useState } from "react";
import { ToggleContext } from "@/context/ToggleProvider/ToggleProvider";
import { getUser } from "@/lib/api/users";
import styles from "./PanelNavbar.module.css";
import Image from "next/image";
import Link from "next/link";
import Icon from "../Icon/Icon";
import { UserProfile } from "@/type/user";
import { DropdownMenu } from "@/component/DropdownMenu/DropdownMenu";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { handleLogout } from "@/lib/api/auth";

export default function PanelNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const context = useContext(ToggleContext)!;
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const storeRoutes = [
    "/dashboard",
    "/products",
    "/staff",
    "/statistic",
    "/transactions",
  ];
  const homeRoutes = ["/home"];

  const handleLogoutButton = async () => {
    await handleLogout();
    router.push("/auth/login");
  };

  const fetchData = async () => {
    try {
      const data = await getUser();
      if (data) setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Home Routes
  if (homeRoutes.some((path) => pathname.startsWith(path)))
    return (
      <nav
        className={
          context.panelNavbar
            ? `${styles.parent}`
            : `${styles.parent} ${styles.parentActive}`
        }
      >
        <ul className={styles.list}>
          <li className={styles.logo}>
            <button className={styles.icon} onClick={context.togglePanelNavbar}>
              <Icon name="logo" width={32} />
            </button>
            <span>BareHouse</span>
          </li>
        </ul>
        <ul className={styles.list}>
          <li>
            <Link href={"/home"}>
              <button
                className={
                  pathname.includes("home")
                    ? `${styles.iconActive}`
                    : `${styles.icon}`
                }
              >
                <Icon
                  name={pathname.includes("home") ? "homeActive" : "home"}
                  width={32}
                />
              </button>
              <span>Home</span>
            </Link>
          </li>
        </ul>
        <ul className={styles.list}>
          <li>
            <DropdownMenu>
              <DropdownMenu.Trigger className={styles.profile}>
                <button className={`${styles.icon}`}>
                  <div className={styles.profilePic}>
                    <Image
                      className={styles.image}
                      src={
                        userData?.avatar ?? "/images/default/user-avatar.png"
                      }
                      alt="Avatar"
                      width={32}
                      height={32}
                    />
                  </div>
                </button>
                <span>{userData?.name ? userData.name : "Log In"}</span>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                position="top"
                className={styles.dropdownMenuContent}
              >
                <DropdownMenu.Section>
                  <DropdownMenu.Item>Profile</DropdownMenu.Item>
                  <DropdownMenu.Item>Setting</DropdownMenu.Item>
                  <DropdownMenu.Item onClick={handleLogoutButton}>
                    Logout
                  </DropdownMenu.Item>
                </DropdownMenu.Section>
              </DropdownMenu.Content>
            </DropdownMenu>
          </li>
        </ul>
      </nav>
    );

  // Store Routes
  if (storeRoutes.some((path) => pathname.startsWith(path)))
    return (
      <nav
        className={
          context.panelNavbar
            ? `${styles.parent}`
            : `${styles.parent} ${styles.parentActive}`
        }
      >
        <ul className={styles.list}>
          <li className={styles.logo}>
            <button className={styles.icon} onClick={context.togglePanelNavbar}>
              <Icon name="logo" width={32} />
            </button>
            <span>BareHouse</span>
          </li>
          <li>
            <Link href={"/home"}>
              <button
                className={
                  pathname.includes("home")
                    ? `${styles.iconActive}`
                    : `${styles.icon}`
                }
              >
                <Icon name="chevronLeft" width={32} />
              </button>
              <span>Back to Home</span>
            </Link>
          </li>
        </ul>
        <ul className={styles.list}>
          <li>
            <Link href={"/dashboard"}>
              <button
                className={
                  pathname.includes("dashboard")
                    ? `${styles.iconActive}`
                    : `${styles.icon}`
                }
              >
                <Icon
                  name={
                    pathname.includes("dashboard")
                      ? "dashboardActive"
                      : "dashboard"
                  }
                  width={32}
                />
              </button>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href={"/products"}>
              <button
                className={
                  pathname.includes("products")
                    ? `${styles.iconActive}`
                    : `${styles.icon}`
                }
              >
                <Icon
                  name={
                    pathname.includes("products")
                      ? "clipboardActive"
                      : "clipboard"
                  }
                  width={32}
                />
              </button>
              <span>Product</span>
            </Link>
          </li>
          <li>
            <Link href={"/staff"}>
              <button
                className={
                  pathname.includes("staff")
                    ? `${styles.iconActive}`
                    : `${styles.icon}`
                }
              >
                <Icon
                  name={pathname.includes("staff") ? "personActive" : "person"}
                  width={32}
                />
              </button>
              <span>Staff</span>
            </Link>
          </li>
          <li>
            <Link href={"/statistic"}>
              <button
                className={
                  pathname.includes("statistic")
                    ? `${styles.iconActive}`
                    : `${styles.icon}`
                }
              >
                <Icon
                  name={
                    pathname.includes("statistic")
                      ? "piechartActive"
                      : "piechart"
                  }
                  width={32}
                />
              </button>
              <span>Statistic</span>
            </Link>
          </li>
          <li>
            <Link href={"/transactions"}>
              <button
                className={
                  pathname.includes("transactions")
                    ? `${styles.iconActive}`
                    : `${styles.icon}`
                }
              >
                <Icon
                  name={
                    pathname.includes("transactions") ? "truckActive" : "truck"
                  }
                  width={32}
                />
              </button>
              <span>Dashboard</span>
            </Link>
          </li>
        </ul>
        <ul className={styles.list}>
          <li>
            <DropdownMenu>
              <DropdownMenu.Trigger className={styles.profile}>
                <button className={`${styles.icon}`}>
                  <div className={styles.profilePic}>
                    <Image
                      className={styles.image}
                      src={
                        userData?.avatar ?? "/images/default/user-avatar.png"
                      }
                      alt="Avatar"
                      width={32}
                      height={32}
                    />
                  </div>
                </button>
                <span>{userData?.name ? userData.name : "Log In"}</span>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                position="top"
                className={styles.dropdownMenuContent}
              >
                <DropdownMenu.Section>
                  <DropdownMenu.Item>Profile</DropdownMenu.Item>
                  <DropdownMenu.Item>Setting</DropdownMenu.Item>
                  <DropdownMenu.Item onClick={handleLogoutButton}>
                    Logout
                  </DropdownMenu.Item>
                </DropdownMenu.Section>
              </DropdownMenu.Content>
            </DropdownMenu>
          </li>
        </ul>
      </nav>
    );
}
