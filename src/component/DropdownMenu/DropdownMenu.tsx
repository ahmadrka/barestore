"use client";

import {
  ReactNode,
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  useId,
} from "react";
import styles from "./DropdownMenu.module.css";

type PositionProp =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "middle-horizontal"
  | "middle-vertical";

// 1. Buat Context untuk sinkronisasi State
const DropdownContext = createContext<{
  open: boolean;
  toggle: () => void;
  contentId: string;
} | null>(null);

// 2. Komponen Utama (Root)
const DropdownMenuRoot = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const contentId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [open]);

  return (
    <DropdownContext.Provider value={{ open, toggle, contentId }}>
      <div className={styles.parent} ref={containerRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

// 3. Komponen Trigger
const Trigger = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);

  const context = useContext(DropdownContext);
  if (!context) throw new Error("Trigger harus di dalam DropdownMenu");

  const { open, toggle, contentId } = context;

  return (
    <div
      ref={triggerRef}
      className={`${styles.trigger} ${className}`}
      onClick={toggle}
      aria-haspopup="true"
      aria-expanded={open}
      aria-controls={contentId}
    >
      {children}
    </div>
  );
};

const Content = ({
  children,
  position: manualPosition,
  closeOnClick = true,
  className,
}: {
  children: ReactNode;
  position?: PositionProp;
  closeOnClick?: boolean;
  className?: string;
}) => {
  const context = useContext(DropdownContext);
  const [position, setPosition] = useState({ top: true, left: true });
  const contentRef = useRef<HTMLMenuElement>(null);

  useEffect(() => {
    if (context?.open && contentRef.current) {
      const parent = contentRef.current.parentElement;
      if (!parent) return;

      const parentRect = parent.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const menuWidth = 200;
      const menuHeight = 250;

      setPosition({
        top: parentRect.bottom + menuHeight <= viewportHeight,
        left: parentRect.left + menuWidth <= viewportWidth,
      });
    }
  }, [context?.open, manualPosition]);

  if (!context) return null;

  // Logika Transform Origin Manual / Otomatis
  const getOrigin = () => {
    if (manualPosition) {
      // Jika user mengisi prop position
      switch (manualPosition) {
        case "top":
          return styles.posTop;
        case "bottom":
          return styles.posBottom;
        case "left":
          return styles.posLeft;
        case "right":
          return styles.posRight;
        case "middle-horizontal":
          return styles.posMiddleH;
        case "middle-vertical":
          return styles.posMiddleV;
        default:
          return "";
      }
    }
    // Jika tidak ada prop, gunakan hasil auto-calculation
    return `${!position.top ? styles.posTop : ""} ${
      !position.left ? styles.posRight : ""
    }`;
  };

  return (
    <menu
      ref={contentRef}
      className={`${styles.content} ${getOrigin()} ${
        context.open ? styles.contentOpen : ""
      } ${className}`}
      style={{ transformOrigin: getOrigin() }} // ORIGIN DINAMIS
      onClick={() => {
        if (closeOnClick) context.toggle();
      }}
      role="menu"
    >
      {children}
    </menu>
  );
};

const Section = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const contentRef = useRef<HTMLUListElement>(null);

  return (
    <ul
      ref={contentRef}
      className={`${styles.section} ${className}`}
      role="none"
    >
      {children}
    </ul>
  );
};

const Item = ({
  children,
  onClick,
  onSelect,
  value,
  width,
  height,
}: {
  children: ReactNode;
  onClick?: () => void;
  onSelect?: () => void;
  value?: string | number;
  width?: string;
  height?: string;
}) => {
  const contentRef = useRef<HTMLLIElement>(null);

  return (
    <li ref={contentRef}>
      <button
        className={styles.item}
        onClick={() => {
          onClick?.();
          onSelect?.();
        }}
        value={value}
        style={{ width, height }}
      >
        {children}
      </button>
    </li>
  );
};

const SubContext = createContext<{ open: boolean } | null>(null);

export const SubMenu = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <SubContext.Provider value={{ open }}>
      <li
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        style={{ position: "relative" }}
      >
        {children}
      </li>
    </SubContext.Provider>
  );
};

export const SubMenuTrigger = ({ children }: { children: ReactNode }) => {
  return (
    <li className={`${styles.subTrigger} ${styles.item}`}>
      {children} <span>▶</span>
    </li>
  );
};

export const SubMenuContent = ({ children }: { children: ReactNode }) => {
  const sub = useContext(SubContext);
  if (!sub?.open) return null;

  return <ul className={styles.subMenuContent}>{children}</ul>;
};

// 5. Penggabungan & Ekspor (Agar TypeScript Senang)
type DropdownComponent = typeof DropdownMenuRoot & {
  Trigger: typeof Trigger;
  Content: typeof Content;
  Section: typeof Section;
  Item: typeof Item;
  SubMenu: typeof SubMenu;
  SubMenuTrigger: typeof SubMenuTrigger;
  SubMenuContent: typeof SubMenuContent;
};

export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  Trigger,
  Content,
  Section,
  Item,
  SubMenu,
  SubMenuTrigger,
  SubMenuContent,
}) as DropdownComponent;
