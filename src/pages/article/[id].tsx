// ここは記事単体のPageを表示している
import { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/legacy/image";
import { client } from "../../libs/client";
import SEO from "../../components/layouts/SEO";
import type { Article } from "../../types/article";
import styles from "../../styles/Stylist/Detail.module.scss";
import Button from "../../components/layouts/Button";

type Props = {
  article: Article;
};

export default function Article({ article }: Props) {
  return (
    <>
      <SEO
        title={article.title + " | " + article.subTitle}
        description={article.description}
        keyword={article.keyword}
        image={article.eye_catch.url}
        url={`/article/${article.id}`}
      />
      <div className={styles.detailArea}>
        <Link href={"/"}>
          <h2 className={styles.detailMainTitle}>Topics</h2>
        </Link>
        <div className={styles.detailMainArea}>
          <div className="">
            <div className={styles.detailSubTitle}>{article.title}</div>
          </div>
          {article.tag && (
            <div className="">
              <div className={styles.detailTag}>#{article.tag}</div>
            </div>
          )}
          <div className={styles.detailStyleImage}>
            <Image
              className=""
              src={article.eye_catch.url}
              objectFit="contain"
              alt={article.title + "の画像です"}
              width={960}
              height={960}
            />
          </div>
          <div className="">
            <div className={styles.detailBody1}>
              {/* Prevent HTML tags from being output */}
              <div
                dangerouslySetInnerHTML={{
                  __html: `${article.body}`,
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.margin3rem}>
          <Link href={"/"} passHref>
            <Button props={"to Top"} />
          </Link>
        </div>
      </div>
    </>
  );
}

// データを取得
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id;
  const idExceptArray = id instanceof Array ? id[0] : id;
  const data = await client.get({
    endpoint: "articles",
    contentId: idExceptArray,
  });

  return {
    props: {
      article: data,
    },
  };
};
