import "react-image-crop/dist/ReactCrop.css";
import { ChangeEvent, SyntheticEvent, useRef, useState } from "react";

import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
  type Crop,
} from "react-image-crop";
import { toast } from "react-toastify";

import { Button } from "components/ui";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const setCanvasPreview = (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: Crop
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No 2d context");
  }

  const pixelRatio = window.devicePixelRatio;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";
  ctx.save();

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  ctx.translate(-cropX, -cropY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
};

export const ImageCropper = ({
  updateAvatar,
  handleClose,
}: {
  updateAvatar: (dataUrl: string) => void;
  handleClose: () => void;
}) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [imageSrc, setImageSrc] = useState<string>("");
  const [crop, setCrop] = useState<Crop>();

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        const img = e.currentTarget as HTMLImageElement;
        const { naturalWidth, naturalHeight } = img;

        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          toast.error(
            `Image must be at least ${MIN_DIMENSION} x ${MIN_DIMENSION} pixels.`
          );
          setImageSrc("");
          return;
        }
      });

      setImageSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: cropWidthInPercent,
        },
        ASPECT_RATIO,
        width,
        height
      ),
      width,
      height
    );

    setCrop(crop);
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        type="file"
        accept="image/*"
        onChange={handleSelectFile}
        className="text-sm font-bold file:duration-150 file:ease-linear file:transition-all file:uppercase file:text-white file:py-2 file:px-4 file:shadow file:outline-none file:rounded file:bg-pink-500 file:active:bg-pink-600 file:hover:shadow-md file:focus:outline-none"
      />
      {imageSrc && (
        <div className="flex flex-col items-center ">
          <ReactCrop
            crop={crop}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
          >
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Upload"
              style={{ maxHeight: "70vh" }}
              onLoad={handleImageLoad}
            />
          </ReactCrop>

          <div className="flex justify-end w-full">
            <Button
              onClick={() => {
                if (!imageRef.current || !previewCanvasRef.current || !crop) {
                  toast.error(
                    "There's been a problem with cropping your image, please try again!"
                  );
                  return;
                }

                setCanvasPreview(
                  imageRef.current,
                  previewCanvasRef.current,

                  convertToPixelCrop(
                    crop,
                    imageRef.current.width,
                    imageRef.current.height
                  )
                );

                const dataUrl = previewCanvasRef.current.toDataURL();
                updateAvatar(dataUrl);
                handleClose();
              }}
            >
              Add image
            </Button>
          </div>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          style={{
            display: "none",
          }}
        />
      )}
    </div>
  );
};
