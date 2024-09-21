import Resizer from "react-image-file-resizer";

export const dataURLtoFile = (dataurl: string, filename: string) => {
  var arr = dataurl.split(","),
    /// @ts-expect-error
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export const resizeFile = (file: File): Promise<File> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      360,
      360,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri as File);
      },
      "file"
    );
  });
