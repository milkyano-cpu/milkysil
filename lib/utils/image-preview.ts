import EXIF from 'exif-js';

export function getEXIFOrientation(file: File): Promise<number> {
  return new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    EXIF.getData(file as any, function (this: any) {
      const orientation = EXIF.getTag(this, 'Orientation');
      resolve(orientation || 1);
    });
  });
}

export async function getImagePreviewWithEXIF(file: File): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      resolve(URL.createObjectURL(file));
      return;
    }

    img.onload = async () => {
      try {
        const orientation = await getEXIFOrientation(file);

        if (orientation === 6 || orientation === 8) {
          canvas.width = img.height;
          canvas.height = img.width;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }

        switch (orientation) {
          case 2:
            ctx.scale(-1, 1);
            ctx.drawImage(img, -canvas.width, 0);
            break;
          case 3:
            ctx.rotate(Math.PI);
            ctx.drawImage(img, -canvas.width, -canvas.height);
            break;
          case 4:
            ctx.scale(1, -1);
            ctx.drawImage(img, 0, -canvas.height);
            break;
          case 5:
            ctx.rotate(90 * Math.PI / 180);
            ctx.scale(-1, 1);
            ctx.drawImage(img, -canvas.height, 0);
            break;
          case 6:
            ctx.rotate(90 * Math.PI / 180);
            ctx.drawImage(img, 0, -canvas.height);
            break;
          case 7:
            ctx.rotate(270 * Math.PI / 180);
            ctx.scale(-1, 1);
            ctx.drawImage(img, -canvas.width, 0);
            break;
          case 8:
            ctx.rotate(270 * Math.PI / 180);
            ctx.drawImage(img, -canvas.width, 0);
            break;
          default:
            ctx.drawImage(img, 0, 0);
        }

        const dataURL = canvas.toDataURL('image/jpeg', 0.8);
        resolve(dataURL);
      } catch {
        resolve(URL.createObjectURL(file));
      }
    };

    img.onerror = () => {
      resolve(URL.createObjectURL(file));
    };

    img.src = URL.createObjectURL(file);
  });
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}
