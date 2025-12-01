import PanelNavbar from "@/component/PanelNavbar/PanelNavbar";
import PanelMenu from "@/component/PanelMenu/PanelMenu";
import RenderItem from "@/component/RenderItem/RenderItem";
import styles from "./styles.module.css";

export default function products() {
  const panelMenuProps = {
    storage: "products",
    title: "Product Management",
    subtitle: "1234 Items",
    sort: [
      { id: 1, name: "Last Updated", value: "last-updated" },
      { id: 2, name: "Newest", value: "newest" },
      { id: 3, name: "Oldest", value: "oldest" },
      { id: 4, name: "A-Z", value: "a-z" },
      { id: 5, name: "Z-A", value: "z-a" },
    ],
    filter: [
      { id: 1, name: "All", value: "all" },
      { id: 2, name: "Ready", value: "ready" },
      { id: 3, name: "Out Of Stock", value: "out-of-stock" },
    ],
    defaultView: "list" as const,
  };

  return (
    <div className={styles.parent}>
      <PanelNavbar status="products" />
      <main className={styles.main}>
        <PanelMenu data={panelMenuProps} />
        <RenderItem />
      </main>
    </div>
  );
}
