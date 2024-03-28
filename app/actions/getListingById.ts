import client from "../libs/prismadb";

type IParams = {
  listingId?: string;
};

export async function getListingById(params: IParams) {
  try {
    const { listingId } = params;

    const listing = await client?.listing.findUnique({
      where: { id: listingId },
      include: {
        user: true,
      },
    });

    if (!listing) return null;

    return {
      ...listing,
      createAt: listing.createAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
