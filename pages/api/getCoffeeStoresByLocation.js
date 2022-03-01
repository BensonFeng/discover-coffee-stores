import { fetchCoffeeStores } from "../../lib/coffee-stores";

const getCoffeeStoresbyLocation = async (req, res) => {
  try {
    const { latLong, limit } = req.query;
    const response = await fetchCoffeeStores(latLong, limit);
    res.status(200);
    res.json(response);
  } catch (err) {
    res.status(500);
    res.json({ message: "failed to load data", err });
  }
};

export default getCoffeeStoresbyLocation;
