import React from "react";
import { SafeListings, SafeUser } from "../types";
import Container from "../_components/Container";
import Heading from "../_components/Heading";
import ListingCard from "../_components/listings/ListingCard";

type FavoritesClientProps = {
  listings: SafeListings[];
  currentUser?: SafeUser | null;
};

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you have favorited" />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {listings.map((listing: any) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
