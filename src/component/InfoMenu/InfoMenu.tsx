import { ReactNode } from "react";
import styles from "./InfoMenu.module.css";
import Image from "next/image";

interface InfoMenuProps {
  src: string;
  width: number;
  height: number;
  aspectRatio?: { width: number; height: number };
}

export function InfoMenuRoot({ children }: { children: ReactNode }) {
  return <div className={styles.parent}>{children}</div>;
}

const Thumbnail = ({ src, width, height, aspectRatio }: InfoMenuProps) => {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt="InfoMenu"
      className={styles.thumbnail}
      style={{ aspectRatio: `${aspectRatio?.width}/${aspectRatio?.height}` }}
    />
  );
};

const Main = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <div className={`${styles.main} ${className}`}>{children}</div>;
};

const Component = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section className={`${styles.component} ${className}`}>{children}</section>
  );
};

const Footer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <footer className={`${styles.footer} ${className}`}>{children}</footer>
  );
};

export const InfoMenu = Object.assign(InfoMenuRoot, {
  Thumbnail,
  Main,
  Component,
  Footer,
});
