import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useAxiosPrivate } from "hooks/use-axios-private";
import { Container } from "components/ui";
import { MediaGallery } from "components/media/media-gallery";

const getListDataUrl = (listId: number) => `/lists/${listId}`;

export const ListPage = () => {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();

  const [listEntires, setListEntries] = useState([]);

  useEffect(() => {
    const fetchListData = async () => {
      try {
        if (!id) throw new Error();

        const response = await axiosPrivate.get(getListDataUrl(parseInt(id)));

        const list = response?.data

        setListEntries(list?.entries ?? []);
      } catch (error) {
        toast.error(error as string);
      }
    };

    fetchListData();
  }, [axiosPrivate, id]);

  return (
    <Container className="flex flex-col max-w-screen-xl gap-4 px-4">
      <MediaGallery media={listEntires} />
    </Container>
  );
};
