import { Box } from "components/ui";
import { useNavigate } from "react-router-dom";

interface Content {
  id: number;
  title: string;
  posterUrl: string;
}

export enum ContentType {
  Movie='movie',
  Show = 'show',
}

interface LabeledContentDisplayProps {
  label: string;
  content: Content[];
  contentType: ContentType
}

export const LabeledContentDisplay = ({
  label,
  content,
  contentType,
}: LabeledContentDisplayProps) => {
  const navigate = useNavigate();

  return (
    <Box label={label}>
      <div className="flex flex-wrap justify-between gap-2">
        {content.map((element) => (
          <img
            className="object-cover w-[calc(25%-0.5rem)] overflow-hidden rounded"
            src={element.posterUrl}
            alt={element.title}
            key={element.id}
            onClick={() =>
              navigate(
                `${contentType === ContentType.Movie ? "/movies" : "/shows"}/${
                  element.id
                }`
              )
            }
          />
        ))}
      </div>
    </Box>
  );
};
