import { TrendingDisplay } from "components/trending-display/trending-display";
import { Container, Box } from "components/ui";

export const BrowsePage = () => {
  return (
    <Container className="flex flex-col max-w-screen-xl gap-4 px-4">
      <Box label="Search">Search for your favourite movies...</Box>
      <TrendingDisplay />
    </Container>
  );
};
