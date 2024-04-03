import { Listing, Reservation, User } from "@prisma/client";

export type SafeListings = Omit<Listing, "createAt"> & {
  createAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing" | "createAt"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListings;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
