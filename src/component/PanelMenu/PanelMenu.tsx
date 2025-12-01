"use client";
import styles from "./PanelMenu.module.css";
import Icon from "../Icon/Icon";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useLocalStorage from "@/hook/useLocalStorage";

type MenuProp = {
  storage: string;
  title: string;
  subtitle: string;
  sort: {
    id: number;
    name: string;
    value: string;
  }[];
  filter: {
    id: number;
    name: string;
    value: string;
  }[];
  defaultView?: "list" | "plot";
};

export default function PanelMenu({ data }: { data: MenuProp }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchKey = searchParams.get("search");
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState(searchKey || "");
  const [sortBy, setSortBy] = useLocalStorage(`${data.storage}-sort-by`);
  const [filter, setFilter] = useLocalStorage(`${data.storage}-filter`);
  const [view, setView] = useLocalStorage(
    `${data.storage}-view`,
    data.defaultView || "list"
  );

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search
      ? router.push(`?search=${encodeURIComponent(search)}`)
      : router.push("?");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={styles.parent}>
      <menu className={styles.main}>
        <div className={styles.menu}>
          <h2 className={styles.title}>{data.title}</h2>
          <p className={styles.subtitle}>{data.subtitle}</p>
        </div>
        <div className={styles.menu}>
          <form
            className={styles.search}
            onSubmit={(e) => handleSearchSubmit(e)}
            title="Search"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button type="submit">
              <Icon name="menu" width={16} />
            </button>
          </form>
          <select
            className={styles.dropdown}
            title="Sort By"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {data.sort.map((item: any) => (
              <option key={item.id} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
          <select
            className={styles.dropdown}
            title="Filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {data.filter.map((item: any) => (
              <option key={item.id} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
          <form className={styles.view}>
            <input
              type="radio"
              name="view"
              id="viewList"
              checked={view === "list"}
              onChange={() => setView("list")}
            />
            <label htmlFor="viewList" title="List View">
              <Icon name="viewList" width={20} />
            </label>
            <input
              type="radio"
              name="view"
              id="viewPlot"
              checked={view === "plot"}
              onChange={() => setView("plot")}
            />
            <label htmlFor="viewPlot" title="Plot View">
              <Icon name="viewPlot" width={20} />
            </label>
          </form>
        </div>
      </menu>
    </div>
  );
}
