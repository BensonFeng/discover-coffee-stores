import { table, getMinifiedRecords } from "../../lib/airtable";

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const findCoffeeStoreRecords = await table
        .select({
          filterByFormula: `id="${id}"`,
        })
        .firstPage();
      if (findCoffeeStoreRecords.length !== 0) {
        const records = getMinifiedRecords(findCoffeeStoreRecords);
        res.json(records); //data airtable
      } else {
        res.status(200).json({ message: `id could not be found` });
      }
    } else {
      res.status(400);
      res.json({ message: "Id is missing" });
    }
  } catch (err) {
    res.status(500);
    res.json({ error: "failed to load data", err });
  }
};
export default getCoffeeStoreById;
