import Image from "next/image";
import Link from "next/link";
import Icon from "@/component/Icon/Icon";
import styles from "./landing.module.css";

export default function Home() {
  return (
    <div className={styles.landing}>
      <header className={styles.navbar}>
        <div className={styles.logoContainer}>
          <Icon name="logo" width={32} height={32} />
          <span>BareStore</span>
        </div>
        <nav className={styles.navLinks}>
          <Link href="#features" className={styles.navLink}>
            Features
          </Link>
          <Link href="#solutions" className={styles.navLink}>
            Solutions
          </Link>
          <Link href="#pricing" className={styles.navLink}>
            Pricing
          </Link>
          <Link href="/auth/login" className={styles.secondaryButton}>
            Sign In
          </Link>
          <Link href="/auth/signup" className={styles.ctaButton}>
            Get Started
          </Link>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>Alpha Version</span>
            <h1 className={styles.heroTitle}>
              Streamline Your Sales, Scale Your Business.
            </h1>
            <p className={styles.heroSubtitle}>
              Streamline your operations, manage stock across locations, and
              provide a seamless checkout experience with BareHouse's
              cloud-based POS system.
            </p>
            <div className={styles.heroActions}>
              <Link href="/auth/register" className={styles.ctaButton}>
                Start For Free
              </Link>
              <Link href="#demo" className={styles.secondaryButton}>
                Contact Us
              </Link>
            </div>
          </div>
          <div className={styles.heroImageContainer}>
            <Image
              src="/images/landing-hero.png"
              alt="BareHouse POS Interface"
              width={1248}
              height={832}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
              priority
            />
          </div>
        </section>

        <section id="features" className={styles.features}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Everything you need to scale
            </h2>
            <p className={styles.sectionSubtitle}>
              Powerful features designed to help your retail business thrive in
              the modern era.
            </p>
          </div>

          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Icon name="store" width={24} height={24} />
              </div>
              <h3 className={styles.featureTitle}>Lightning Fast POS</h3>
              <p className={styles.featureDescription}>
                Process transactions in seconds with our optimized checkout
                interface. Works online and offline.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Icon name="cardboard" width={24} height={24} />
              </div>
              <h3 className={styles.featureTitle}>Smart Inventory</h3>
              <p className={styles.featureDescription}>
                Automated stock tracking, low-stock alerts, and multi-warehouse
                management made simple.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Icon name="piechart" width={24} height={24} />
              </div>
              <h3 className={styles.featureTitle}>Growth Analytics</h3>
              <p className={styles.featureDescription}>
                Deep insights into your sales performance, customer behavior,
                and product trends.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Icon name="person" width={24} height={24} />
              </div>
              <h3 className={styles.featureTitle}>Staff Management</h3>
              <p className={styles.featureDescription}>
                Track shift hours, sales performance, and permissions for all
                your team members across branches.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.logoContainer}>
          <Icon name="logo" width={24} height={24} />
          <span style={{ fontSize: "1.2rem" }}>BareHouse</span>
        </div>
        <p className={styles.copyright}>
          © 2026 BareHouse Tech. All rights reserved.
        </p>
        <div
          className={styles.navLinks}
          style={{ display: "flex", gap: "20px" }}
        >
          <Link href="/privacy" className={styles.navLink}>
            Privacy
          </Link>
          <Link href="/terms" className={styles.navLink}>
            Terms
          </Link>
        </div>
      </footer>
    </div>
  );
}
