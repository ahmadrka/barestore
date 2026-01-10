"use client";

import { createContext, useContext, useState, useRef, ReactNode } from "react";
import styles from "./ContextMenu.module.css";

type ContextMenuContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
  setPosition: (pos: { x: number; y: number }) => void;
  position: { x: number; y: number };
};

const ContextMenuContext = createContext<ContextMenuContextType | null>(null);

function ContextMenuRoot({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <ContextMenuContext.Provider
      value={{ open, setOpen, position, setPosition }}
    >
      {children}
    </ContextMenuContext.Provider>
  );
}

const useMenu = () => {
  const ctx = useContext(ContextMenuContext);
  if (!ctx)
    throw new Error("ContextMenu component must be inside <ContextMenu>");
  return ctx;
};

function Trigger({ children }: { children: ReactNode }) {
  const { setOpen, open, setPosition } = useMenu();

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    setPosition({
      x: rect.right,
      y: rect.bottom,
    });

    setOpen(!open);
  };

  return (
    <button onClick={onClick} style={{ display: "inline-block" }}>
      {children}
    </button>
  );
}

function Content({ children }: { children: ReactNode }) {
  const { open, position } = useMenu();

  if (!open) return null;

  return (
    <menu
      style={{
        zIndex: 1000,
        position: "fixed",
        top: position.y,
        left: position.x,
        background: "white",
        border: "1px solid #ccc",
        padding: 8,
      }}
    >
      {children}
    </menu>
  );
}

function Item({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export const ContextMenu = Object.assign(ContextMenuRoot, {
  Trigger,
  Content,
  Item,
});
