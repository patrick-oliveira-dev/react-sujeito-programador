import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import logo from "../../../public/images/logo.svg";
import Link from "next/link";
import { ActiveLink } from "../ActiveLink";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <ActiveLink legacyBehavior href="/" activeClassName={styles.active}>
          <a>
            <Image src={logo} alt="Sujeito programador logo" />
          </a>
        </ActiveLink>

        <nav className={styles.nav}>
          <ActiveLink legacyBehavior href="/" activeClassName={styles.active}>
            <a>Home</a>
          </ActiveLink>

          <ActiveLink
            legacyBehavior
            href="/posts"
            activeClassName={styles.active}
          >
            <a>Conteudos</a>
          </ActiveLink>

          <ActiveLink
            legacyBehavior
            href="/about"
            activeClassName={styles.active}
          >
            <a>Quem somos?</a>
          </ActiveLink>
        </nav>

        <a
          className={styles.readyButton}
          type="button"
          href="https://sujeitoprogramador.com"
        >
          Começar
        </a>
      </div>
    </header>
  );
}
