import client from "../libs/prismadb";

type IParams = {
  listingId?: string;
  userId?: string;
  authorId?: string;
};

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.authorId = { userId: authorId };
    }

    const reservations = await client?.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const convertedDateReservation = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createAt: reservation.listing.createAt.toISOString(),
      },
    }));

    return convertedDateReservation;
  } catch (error: any) {
    throw new Error(error);
  }
}