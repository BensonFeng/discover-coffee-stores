import { createApi } from "unsplash-js";

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 40,
  });
  const unsplashResults = photos.response?.results || [];
  return unsplashResults.map((result) => result.urls["small"]);
};
export const fetchCoffeeStores = async (
  latLong = "43.65267326999575,-79.39545615725015",
  limit = 6
) => {
  const photos = await getListOfCoffeeStorePhotos();
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${process.env.NEXT_PUBLIC_FOURSQUARE_CLIENT_SECRET}`,
    },
  };
  const response = await fetch(
    getUrlForCoffeeStores(latLong, "coffee store", limit),
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
