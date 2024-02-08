import Head from "next/head";
import styles from "../styles/home.module.scss";
import Image from "next/image";
import techsImage from "../../public/images/techs.svg";
import { GetStaticProps } from "next";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../services/prismic";

type Content = {
  title: string;
  titleContent: string;
  linkAction: string;
  mobile: string;
  mobileContent: string;
  mobileBanner: string;
  titleWeb: string;
  webContent: string;
  webBanner: string;
};

interface ContentProps {
  content: Content;
}

export default function Home({ content }: ContentProps) {
  return (
    <>
      <Head>
        <title>Apaixonado por tecnologia - Sujeito Programador</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>{content.title}</h1>
            <p>
              {content.titleContent}
            </p>
            <a href={content.linkAction}>
              <button>Começar Agora!</button>
            </a>
          </section>
          <img
            src="/images/banner-conteudos.png"
            alt="Conteúdos Sujeito Programador"
          />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionContent}>
          <section>
            <h2>{content.mobile}</h2>
            <p>
              {content.mobileContent}
            </p>
          </section>
          <img
            src={content.mobileBanner}
            alt="Conteudo desenvolvimento de apps"
          />
        </div>

        <hr className={styles.divisor} />

        <div className={styles.sectionContent}>
          <img
            src={content.webBanner}
            alt="Conteudo desenvolvimento de aplicações web"
          />
          <section>
            <h2>{content.titleWeb}</h2>
            <p>
              {content.webContent}
            </p>
          </section>
        </div>

        <div className={styles.nextLevelContent}>
          <Image src={techsImage} alt="Tecnologias" />
          <h2>
            Mais de <span className={styles.alunos}>15 mil</span> já levaram sua
            carreira ao próximo nível
          </h2>
          <p>E você vai perder a chance de evoluir de uma vez por todas?</p>
          <a href={content.linkAction}>
            <button>Acessar Turma!</button>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.Predicates.at("document.type", "home"),
  ]);

  const {
    title,
    sub_title,
    link_action,
    mobile,
    mobile_content,
    mobile_banner,
    title_web,
    web_content,
    web_banner,
  } = response.results[0].data;

  const content = {
    title: RichText.asText(title),
    titleContent: RichText.asText(sub_title),
    linkAction: link_action.url,
    mobile: RichText.asText(mobile),
    mobileContent: RichText.asText(mobile_content),
    mobileBanner: mobile_banner.url,
    titleWeb: RichText.asText(title_web),
    webContent: RichText.asText(web_content),
    webBanner: web_banner.url,
  };
  return {
    props: {
      content,
    },
    revalidate: 60 * 2,
  };
};
