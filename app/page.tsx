import ClientOnly from "./_components/ClientOnly";
import Container from "./_components/Container";
import EmptyState from "./_components/EmptyState";
import ListingCard from "./_components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";

type HomeProps = {
  searchParams: IListingsParams;
};

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div
          className="
            pt-24
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
          {listings.map((list: any) => {
            return (
              <ListingCard
                currentUser={currentUser}
                key={list.id}
                data={list}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
