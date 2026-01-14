"use client";

import Icon from "../Icon/Icon";
import styles from "./PanelMenu.module.css";
import button from "../Styles/Button.module.css";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hook/useDebounce";
import { searchProduct } from "@/lib/api/products";

type Value = {
  id: number;
  key: string;
  default: string;
  items: {
    id: number;
    value: string;
    key: string;
    onClick: () => void;
  }[];
};

export default function PanelMenu({
  value,
  storeId,
}: {
  value: Value[];
  storeId: number;
}) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState({
    page: searchParams.get("page") || "1",
    limit: 10,
  });
  const debouncedSearch = useDebounce(search, 800);
  const debouncedPage = useDebounce(page, 800);

  const meta = {
    totalPages: 10,
  };

  const handlePageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    if (page.page === "") params.delete("page");
    else params.set("page", page.page);
    router.push(`?${params.toString()}`);
    setPage(page);
  };

  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = async (step: number) => {
    if (isLoading) return;

    const params = new URLSearchParams(window.location.search);
    const currentPage = Number(params.get("page")) || 1;
    const newPage = currentPage + step;

    if (newPage < 1 || (meta?.totalPages && newPage > meta.totalPages)) return;

    setIsLoading(true);

    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
    // kamu men-set setIsLoading(false) setelah data berhasil didapat.
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    if (search === "") params.delete("search");
    else params.set("search", search);
    router.push(`?${params.toString()}`);
    setSearch(search);
  };

  const handleSearchDebounce = () => {
    if (search === "") {
      const params = new URLSearchParams(window.location.search);
      params.delete("search");
      router.push(`?${params.toString()}`);
      setSearch(search);
    } else {
      const params = new URLSearchParams(window.location.search);
      params.set("search", search);
      router.push(`?${params.toString()}`);
      setSearch(search);
    }
  };

  useEffect(() => {
    handleSearchDebounce();
  }, [debouncedSearch]);

  return (
    <menu className={styles.panelMenu}>
      <div className={styles.pagination}>
        <button
          className={`${styles.button} ${
            (searchParams.get("page") === "1" ||
              searchParams.get("page") === null) &&
            button.disabled
          }`}
          onClick={() => {
            handlePageChange(-1);
          }}
        >
          <Icon name="chevronLeft" width={24} />
        </button>
        <DropdownMenu>
          <DropdownMenu.Trigger>
            <button className={`${styles.buttonForm}`}>
              Page {searchParams.get("page") || 1}/{meta.totalPages}
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            position="middle-horizontal"
            closeOnClick={false}
          >
            <DropdownMenu.Section>
              <DropdownMenu.Item width="max-content">
                <form onSubmit={(e) => handlePageSubmit(e)}>
                  <label htmlFor="page">
                    <span>Page </span>
                    {/* <input
                      id="page"
                      type="number"
                      min={1}
                      max={page.limit}
                      value={page.page}
                      onChange={(e) => {
                        setPage({ ...page, page: e.target.value });
                      }}
                    />
                    <span>/{page.limit}</span> */}
                  </label>
                </form>
              </DropdownMenu.Item>
            </DropdownMenu.Section>
          </DropdownMenu.Content>
        </DropdownMenu>
        <button
          className={`${styles.button} ${
            searchParams.get("page") === meta.totalPages.toString()
              ? button.disabled
              : ""
          }`}
          onClick={() => {
            handlePageChange(1);
          }}
        >
          <Icon name="chevronRight" width={24} />
        </button>
      </div>
      <form
        className={styles.search}
        onSubmit={(e) => handleSearchSubmit(e)}
        onReset={(e) => setSearch("")}
      >
        <label htmlFor="search">
          <input
            id="search"
            type="search"
            value={search}
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        {search && (
          <button
            type="reset"
            className={styles.searchReset}
            style={{ display: "none" }}
          >
            <Icon name="cross" width={24} />
          </button>
        )}
        <button type="submit" className={styles.searchSubmit}>
          <Icon name="search" width={24} />
        </button>
      </form>
      {value.map((item) => (
        <DropdownMenu key={item.id}>
          <DropdownMenu.Trigger>
            <button className={`${styles.button}`}>
              {item.items.find((i) => i.key === searchParams.get(item.key))
                ?.value || item.default}
              <Icon name="chevronDown" width={24} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Section>
              {item.items.map((item) => (
                <DropdownMenu.Item key={item.id} onClick={item.onClick}>
                  {item.value}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Section>
          </DropdownMenu.Content>
        </DropdownMenu>
      ))}
    </menu>
  );
}
