import Link from "next/link";

import { useRouter } from "next/router";

import coffeeStoresData from "../../data/coffee-stores.json";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  console.log("params", params);
  return {
    props: {
      coffeeStore: coffeeStoresData.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id;
      }),
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
    fallback: false,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();
  const { id } = router.query;

  console.log("router", router);
  console.log("props", props);

  return (
    <div>
      Coffee Store Page {id}
      <Link href="/">
        <a>Back to home</a>
      </Link>
      <Link href="/coffee-store/">
        <a>Back to home</a>
      </Link>
      <p>{props.coffeeStore.address}</p>
      <p>{props.coffeeStore.name}</p>
    </div>
  );
};

export default CoffeeStore;
