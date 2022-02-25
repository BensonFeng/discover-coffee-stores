import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
  accessKey: `${process.env.UNSPLASH_ACESS_KEY}`,
  //...other fetch options
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photo = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    page: 1,
  });
  const unsplashResults = photo.response.results;
  return unsplashResults.map((result) => result.urls["small"]);
};
export const fetchCoffeeStores = async () => {
  const photos = await getListOfCoffeeStorePhotos();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${process.env.FOURSQUARE_CLIENT_SECRET}`,
    },
  };
  const response = await fetch(
    getUrlForCoffeeStores("40.7831,-73.9712", "coffee store", 8),
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
  return transformedData.map((venue, idx) => {
    return {
      // ...venue,
      id: venue.id,
      address: venue.location.address,
      name: venue.name,
      neighbourhood:
        venue.location.neighborhood || venue.location.crossStreet || "",
      imgUrl: photos[idx],
    };
  });
};
