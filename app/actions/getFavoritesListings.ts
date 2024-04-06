import client from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getFavoritesListing = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return [];

    const favorites = await client?.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favouriteIds || [])],
        },
      },
    });

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createAt: favorite.createAt.toISOString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default getFavoritesListing;
