// Import node-fetch if running in Node.js.
// const fetch = require('node-fetch'); // Uncomment if using Node.js without ES modules

// --- Configuration ---
const AMADEUS_CLIENT_ID = "N9U5TkmkQOvdKAsnLx4RKIr78k8RFai1";
const AMADEUS_CLIENT_SECRET = "foGmri1wRowJh64c";
const AMADEUS_BASE_URL = "https://test.api.amadeus.com/v1";
const AMADEUS_HOTEL_SEARCH_URL = "https://test.api.amadeus.com/v3";

// --- Helper function to get an access token ---
async function getAmadeusAccessToken() {
  try {
    const response = await fetch(`${AMADEUS_BASE_URL}/security/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: AMADEUS_CLIENT_ID,
        client_secret: AMADEUS_CLIENT_SECRET,
      }).toString(),
    });

    if (!response.ok) {
      let errorText = await response.text();
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.error_description) {
          errorText = errorJson.error_description;
        }
      } catch (e) {}
      throw new Error(
        `Failed to get access token: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error getting Amadeus access token:", error);
    throw error;
  }
}

// --- Replace Amadeus hotel content with random Unsplash images ---
async function getHotelContent(hotelIds) {
  if (!hotelIds || hotelIds.length === 0) return {};

  const hotelContentMap = {};
  for (const hotelId of hotelIds) {
    const images = Array.from({ length: 5 }, () =>
      `https://source.unsplash.com/600x400/?hotel,room&sig=${Math.floor(
        Math.random() * 10000
      )}`
    );

    const description =
      "Enjoy a luxurious stay with elegant interiors and top-notch amenities.";

    hotelContentMap[hotelId] = { images, description };
  }

  return hotelContentMap;
}

// --- Helper function to get hotel offers (lowest price) ---
async function getHotelOffers(hotelIds, checkInDate, checkOutDate, accessToken) {
  if (!hotelIds || hotelIds.length === 0) return {};

  const hotelOffersMap = {};

  for (const hotelId of hotelIds) {
    try {
      const response = await fetch(
        `${AMADEUS_HOTEL_SEARCH_URL}/shopping/hotel-offers?hotelIds=${hotelId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (!response.ok) {
        const errorJson = await response.json();
        const title = errorJson.errors?.[0]?.title || "Unknown error";
        const code = errorJson.errors?.[0]?.code || "N/A";
        console.warn(
          `Warning for hotel ID ${hotelId}: ${response.status} - ${title} (Code: ${code}). Fallback price used.`
        );
        hotelOffersMap[hotelId] = {
          total: (100 + Math.floor(Math.random() * 200)).toString(),
          currency: "USD",
        };
        continue;
      }

      const data = await response.json();
      if (
        data.data?.length > 0 &&
        data.data[0].offers?.length > 0
      ) {
        const lowestOffer = data.data[0].offers.reduce((min, offer) =>
          parseFloat(offer.price.total) < parseFloat(min.price.total)
            ? offer
            : min
        );
        hotelOffersMap[hotelId] = {
          total: lowestOffer.price.total,
          currency: lowestOffer.price.currency,
        };
      } else {
        console.warn(`No offers found for hotel ID ${hotelId}. Using fallback price.`);
        hotelOffersMap[hotelId] = {
          total: (100 + Math.floor(Math.random() * 200)).toString(),
          currency: "USD",
        };
      }
    } catch (error) {
      console.error(
        `Error fetching offers for hotel ID ${hotelId}:`,
        error.message
      );
      hotelOffersMap[hotelId] = {
        total: (100 + Math.floor(Math.random() * 200)).toString(),
        currency: "USD",
      };
    }
  }

  return hotelOffersMap;
}

// --- Main function to get simplified hotel info ---
async function getSimplifiedHotelInfo(numHotels = 10, cityCode = "NYC") {
  try {
    const accessToken = await getAmadeusAccessToken();
    console.log("Access Token obtained.");

    const today = new Date();
    const checkInDate = new Date(today);
    checkInDate.setDate(today.getDate() + 30);
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkInDate.getDate() + 2);

    const formattedCheckInDate = checkInDate.toISOString().split("T")[0];
    const formattedCheckOutDate = checkOutDate.toISOString().split("T")[0];

    console.log(`Fetching hotels for city: ${cityCode}`);
    const hotelListResponse = await fetch(
      `${AMADEUS_BASE_URL}/reference-data/locations/hotels/by-city?cityCode=${cityCode}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!hotelListResponse.ok) {
      const errorText = await hotelListResponse.text();
      throw new Error(
        `Failed to fetch hotel list: ${hotelListResponse.status} - ${errorText}`
      );
    }

    const hotelListData = await hotelListResponse.json();
    const hotels = hotelListData.data || [];

    if (hotels.length === 0) {
      console.warn("No hotels found.");
      return [];
    }

    const selectedHotels = hotels.slice(0, numHotels);
    const selectedHotelIds = selectedHotels.map((hotel) => hotel.hotelId);

    const hotelContentMap = await getHotelContent(selectedHotelIds);
    const hotelOffersMap = await getHotelOffers(
      selectedHotelIds,
      formattedCheckInDate,
      formattedCheckOutDate,
      accessToken
    );

    return selectedHotels.map((hotel) => {
      const content = hotelContentMap[hotel.hotelId] || {};
      const offers = hotelOffersMap[hotel.hotelId];

      return {
        id: hotel.hotelId,
        name: hotel.name,
        location: {
          city: hotel.address?.cityName,
          country: hotel.address?.countryCode,
        },
        images: content.images || [],
        description: content.description || "No description available.",
        lowestPrice: offers ? `${offers.total} ${offers.currency}` : "N/A",
      };
    });
  } catch (error) {
    console.error("Error retrieving hotel info:", error);
    return [];
  }
}

// --- Execute the function ---
(async () => {
  // Try 'NYC' for New York, 'LON' for London, 'PAR' for Paris etc.
  const hotelsInfo = await getSimplifiedHotelInfo(10, "NYC");

  if (hotelsInfo.length > 0) {
    console.log("\n--- Retrieved Hotel Information ---");
    console.log(JSON.stringify(hotelsInfo, null, 2)); // Logs the array of hotel objects
  } else {
    console.log("Failed to retrieve any hotel information.");
  }
})();
