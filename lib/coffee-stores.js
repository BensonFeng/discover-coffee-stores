const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${6}`;
};
export const fetchCoffeeStores = async () => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${process.env.FOURSQUARE_CLIENT_SECRET}`,
    },
  };
  const response = await fetch(
    getUrlForCoffeeStores("40.730610%2C-73.935242", "coffee store", 6),
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
  return transformedData;
};
