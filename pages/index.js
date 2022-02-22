import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Home.module.css";

import Banner from "../components/banner";
import Card from "../components/card";

import coffeeStoresData from "../data/coffee-stores.json";

export async function getStaticProps(context) {
  return {
    props: {
      coffeeStores: coffeeStoresData,
    }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  console.log(props);
  const handleOnBannerBtnClick = () => {
    console.log("hi banner button");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            width={700}
            height={400}
            alt="grab coffee"
          />
        </div>

        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Coffee Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    name={coffeeStore.name}
                    imgUrl={coffeeStore.imgUrl}
                    href={`/coffee-store/${coffeeStore.id}`}
                    key={coffeeStore.id}
                  />
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
