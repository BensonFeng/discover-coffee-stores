import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Home.module.css";

import Banner from "../components/banner";
import Card from "../components/card";

// import coffeeStoresData from "../data/coffee-stores.json";

export async function getStaticProps(context) {
  console.log("hi getStaticProps");

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "fsq3RFCL2nkI8CPbIFnkawXrcudgK8LzbARgCZ3k/W+5v6g=",
    },
  };
  const response = await fetch(
    "https://api.foursquare.com/v3/places/nearby?ll=40.730610%2C-73.935242&query=coffee%20store&limit=6",
    options
  );
  const data = await response.json();
  const transformedData =
    data?.results?.map((venue) => {
      return {
        id: venue.fsq_id,
        ...venue,
      };
    }) || [];

  return {
    props: {
      coffeeStores: transformedData,
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
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
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
