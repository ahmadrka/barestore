"use client";

import styles from "./PanelNavlist.module.css";
import Icon from "../Icon/Icon";
import { usePathname } from "next/navigation";

export default function PanelNavlist({
  items,
}: {
  items: { label: string; href: string; icon?: string }[];
}) {
  const path = usePathname();

  return (
    <nav className={styles.navlist}>
      <ul>
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={path === item.href ? styles.active : ""}
            >
              <Icon name={item.icon || ""} width={24} height={24} />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
