const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);
const table = base("coffee-store");
console.log({ table });

const createCoffeeStore = async (req, res) => {
  console.log({ req });

  if (req.method === "POST") {
    //find a record
    try {
      const findCoffeeStoreRecords = await table
        .select({
          filterByFormula: `id="3"`,
        })
        .firstPage();

      console.log({ findCoffeeStoreRecords });

      if (findCoffeeStoreRecords.length !== 0) {
        const records = findCoffeeStoreRecords.map((record) => {
          return {
            ...record.fields,
          };
        });
        res.status(200).json(records);
      } else {
        // create a record
        const createRecords = await table.create([
          {
            fields: {
              id: "3",
              name: "coffe3",
              address: "coffee st3",
              neighbourhood: "coffee neighbour3",
              vote: 103,
              imgUrl: "coffee3.com",
            },
          },
        ]);
        const records = createRecords.map((record) => {
          return {
            ...record.fields,
          };
        });
        res.json({ records });
      }
    } catch (err) {
      res.status(500).send({ message: "Error finding store", err });
    }
  }
};
//airtable
export default createCoffeeStore;
