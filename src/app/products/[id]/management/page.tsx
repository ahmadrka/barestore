"use client";

import styles from "../../create/styles.module.css";
import form from "@/component/Styles/Form.module.css";
import button from "@/component/Styles/Button.module.css";
import { DropdownMenu } from "@/component/DropdownMenu/DropdownMenu";
import PanelNavlist from "@/component/PanelNavlist/PanelNavlist";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { deleteProduct } from "@/lib/api/products";
import usePreferences from "@/hook/usePreferences";
import { useQueryClient } from "@tanstack/react-query";

export default function Status() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { preferences, setPreference, isLoaded } = usePreferences();
  const storeId = preferences.storeSelection;
  const queryClient = useQueryClient();
  const items = [
    { label: "Product Edit", href: `/products/${id}/edit` },
    { label: "Product Images", href: `/products/${id}/images` },
    { label: "Product Variants", href: `/products/${id}/variants` },
    { label: "Product Reviews", href: `/products/${id}/reviews` },
    { label: "Product Management", href: `/products/${id}/management` },
    { label: "Back to Products", href: "/products" },
  ];

  const deleteProductHandler = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product? This action cannot be undone."
    );

    if (!isConfirmed) return;

    try {
      const response = await deleteProduct(storeId, id);
      if (response) {
        toast.success("Product deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["products", storeId] });
        router.push("/products");
      } else {
        toast.error("Error while deleting product");
      }
    } catch (error) {
      toast.error("Error while deleting product");
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className={styles.parent}>
      <PanelNavlist items={items} />
      <main className={styles.main}>
        <div className={styles.creation}>
          <div className={styles.creationMain}>
            <div className={styles.title}>
              <h1>Product Management</h1>
              <p>Please fill in the form below to edit a product.</p>
            </div>
            <form className={form.form} onSubmit={(e) => e.preventDefault()}>
              <h2>Danger Zone</h2>
              <div>
                <button
                  type="submit"
                  className={`${button.primary} ${button.error}`}
                  onClick={() => {
                    deleteProductHandler(id);
                  }}
                >
                  Delete Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
