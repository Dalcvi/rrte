export const extractImageInfo = (
  file: File,
): Promise<{ originalWidth: number; originalHeight: number; src: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    const image = new Image();

    reader.onload = (e) => {
      if (!e.target || !e.target.result) {
        reject(new Error('Failed to load the image file.'));
        return;
      }
      const result = e.target.result;

      if (typeof result === 'string') {
        image.src = result;
      } else {
        const blob = new Blob([result], { type: file.type });
        image.src = URL.createObjectURL(blob);
      }

      image.onload = () => {
        const originalWidth = image.naturalWidth;
        const originalHeight = image.naturalHeight;
        resolve({ originalWidth, originalHeight, src: image.src });
      };

      image.onerror = () => {
        reject(new Error('Failed to load the image.'));
      };
    };

    reader.onerror = () => {
      reject(new Error('Failed to read the file.'));
    };
  });
};
