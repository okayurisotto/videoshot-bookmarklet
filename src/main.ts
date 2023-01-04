import Dayjs from "dayjs";

(async () => {
  const $media = [...document.querySelectorAll("video")]
    .filter(($video) => {
      const rect = $video.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        return false;
      }
      if (rect.top > window.innerHeight && rect.bottom > window.innerHeight) {
        return false;
      }
      if (rect.left > window.innerWidth && rect.right > window.innerWidth) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const aSize = a.width * a.height;
      const bSize = b.width * b.height;

      if (aSize > bSize) return -1;
      if (aSize < bSize) return +1;
      return 0;
    })
    .at(0);

  if (!$media) return;

  const $canvas = document.createElement("canvas");
  $canvas.width = $media.videoWidth;
  $canvas.height = $media.videoHeight;
  const canvasContext = $canvas.getContext("2d");

  if (!canvasContext) return;

  canvasContext.drawImage($media, 0, 0, $canvas.width, $canvas.height);
  const blob = await new Promise<Parameters<BlobCallback>[number]>((r) => {
    return $canvas.toBlob(r);
  });

  if (!blob) return;

  const url = URL.createObjectURL(blob);

  const $link = document.createElement("a");
  $link.download =
    Dayjs().format("YYYY-MM-DD_HH-mm-ss") +
    "_" +
    location.host.replaceAll(".", "-");
  $link.href = url;
  $link.click();
})();
