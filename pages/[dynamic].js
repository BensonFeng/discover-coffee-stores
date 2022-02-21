import Head from "next/head";
import { useRouter } from "next/router";

const DynamicRoute = () => {
  const router = useRouter();
  const { dynamic } = router.query;
  return (
    <div>
      <Head>
        <title>{dynamic}</title>
      </Head>
      Hi there I am dynamicRoute
    </div>
  );
};

export default DynamicRoute;
