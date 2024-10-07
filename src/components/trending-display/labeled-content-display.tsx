import { Box } from "components/ui";

interface Content {
  id: number;
  title: string;
  posterUrl: string;
}

interface LabeledContentDisplayProps {
  label: string;
  content: Content[];
}

export const LabeledContentDisplay = ({
  content,
  label,
}: LabeledContentDisplayProps) => {
  return (
    <Box label={label}>
      <div className="flex flex-wrap justify-between gap-2">
        {content.map((element) => (
          <img
            className="object-cover w-[calc(25%-0.5rem)] overflow-hidden rounded"
            src={element.posterUrl}
            alt={element.title}
            key={element.id}
          />
        ))}
      </div>
    </Box>
  );
};
