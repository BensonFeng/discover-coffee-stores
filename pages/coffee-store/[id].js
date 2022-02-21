import Link from "next/link";

import { useRouter } from "next/router";

const CoffeeStore = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return (
    <div>
      Coffee Store Page {id}
      <Link href="/">
        <a>Back to home</a>
      </Link>
      <Link href="/coffee-store/">
        <a>Back to home</a>
      </Link>
    </div>
  );
};

export default CoffeeStore;
