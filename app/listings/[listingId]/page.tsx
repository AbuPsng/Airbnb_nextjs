type IParams = {
  listingId?: string;
};

import ClientOnly from "@/app/_components/ClientOnly";
import EmptyState from "@/app/_components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getListingById } from "@/app/actions/getListingById";
import ListingClient from "./ListingClient";

const page = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState title={""} subtitle="" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default page;
