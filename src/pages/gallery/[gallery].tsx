// ここはGallery単体のPageを表示している
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../libs/client";
import SEO from "../../components/layouts/SEO";
import type { Gallery } from "../../types/gallery";
import styles from "../../styles/Stylist/Detail.module.scss";
import HamburgerMenu from "../../components/layouts/HamburgerMenu";

type Props = {
  gallery: Gallery;
};

export default function Gallery({ gallery }: Props) {
  const galleryIds: number[] = [gallery.gallery_id];
  return (
    <>
      <SEO
        title={gallery.title + " | " + gallery.subTitle}
        description={gallery.description}
        keyword={gallery.keyword}
        image={gallery.eye_catch.url}
        url={`/gallery/${gallery.id}`}
      />
      <HamburgerMenu />
      <div className={styles.detailArea}>
        <Link href={"/gallery"} passHref>
          <a>
            <h2 className={styles.detailMainTitle}>Gallery</h2>
          </a>
        </Link>
        <div className={styles.detailFlex}>
          <div className={styles.detailImage}>
            <Image
              className=""
              src={gallery.eye_catch.url}
              objectFit="contain"
              alt={gallery.title + "の画像です"}
              width={1000}
              height={720}
            />
          </div>
          <div className={styles.detailRight}>
            <div>
              <Link href={gallery.id} passHref>
                <a>
                  <div className={styles.detailSubTitle}>{gallery.title}</div>
                </a>
              </Link>
              {/* ここでstylistIdを認識して、各自のSNSメニューを表示する */}
              {/* <div>
                {stylistIds.map((id) => {
                  return (
                    <div key={id}>
                      {( () => {
                        if (!id == null) {
                          return <></>;
                        } else if (id == 1) {
                          return <KatayamaSNS />;
                        } else if (id == 2) {
                          return <MikaSNS />;
                        } else if (id == 3) {
                          return <NozomiSNS />;
                        } else if (id == 4) {
                          return <NatsukiSNS />;
                        } else if (id == 5) {
                          return <DaiSNS />;
                        } else if (id == 6) {
                          return <JohnSNS />;
                        } else if (id == 7) {
                          return <FujiiSNS />;
                        } else if (id == 8) {
                          return <IkemotoSNS />;
                        } else if (id == 9) {
                          return <MaiSNS />;
                        } else if (id == 10) {
                          return <YukaSNS />;
                        } else if (id == 11) {
                          return <MahoSNS />;
                        } else if (id == 12) {
                          return <NamiSNS />;
                        }
                      }) () };
                    </div>
                  );
                })}
              </div> */}
              <div className={styles.tag}>
                {gallery.tag && (
                  <div className={styles.detailTag}>
                    <div className="">#{gallery.tag}</div>
                  </div>
                )}
              </div>
              <div>
                {/* Prevent HTML tags from being output */}
                <div
                  className={styles.detailProfile}
                  dangerouslySetInnerHTML={{
                    __html: `${gallery.profile}`,
                  }}
                />
              </div>
              {/* ボタン
              <div className={styles.next}>
                <Link href={gallery.id} passHref>
                  <a className={styles.nextInner}>
                    <span className={styles.nextInnerIn}>詳しく見る</span>
                  </a>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
        <div className={styles.detailBody}>
          {/* Prevent HTML tags from being output */}
          <div
            dangerouslySetInnerHTML={{
              __html: `${gallery.body}`,
            }}
          />
        </div>
        <h2 className={styles.detailMainTitle}>Work Image</h2>
        <div className={styles.detailStyle}>
          <div className={styles.detailStyleImage}>
            <Image
              className=""
              src={gallery.img1.url}
              objectFit="contain"
              alt={gallery.img1 + "のスタイルです。"}
              width={800}
              height={800}
            />
          </div>
          <div className={styles.detailStyleImage}>
            <Image
              className=""
              src={gallery.img2.url}
              objectFit="contain"
              alt={gallery.title + "のスタイルです。"}
              width={800}
              height={800}
            />
          </div>
          <div className={styles.detailStyleImage}>
            <Image
              className=""
              src={gallery.img3.url}
              objectFit="contain"
              alt={gallery.title + "のスタイルです。"}
              width={800}
              height={800}
            />
          </div>
        </div>
        <p className={styles.menuDetail}>
          ※所要時間につきましては、当日の予約状況により変動する可能性もございます。
        </p>
        <p className={styles.menuDetail}>
          ※上記メニュー意外にもキャンペーン価格やセットメニューがございます。詳しい内容はスタイリストまでご連絡ください。
        </p>
        <div className={styles.next}>
          <Link href={gallery.id} passHref>
            <a className={styles.nextInner}>
              <span className={styles.nextInnerIn}>View More</span>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const gallery = ctx.params?.gallery;
  const idExceptArray = gallery instanceof Array ? gallery[0] : gallery;
  const data = await client.get({
    endpoint: "gallerys",
    contentId: idExceptArray,
  });

  return {
    props: {
      gallery: data,
    },
  };
};