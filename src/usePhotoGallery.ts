import { useState, useEffect } from 'react';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  useEffect(() => {
    const storedPhotos = JSON.parse(localStorage.getItem('photos') || '[]');
    setPhotos(storedPhotos);
  }, []);

  const addNewPhoto = (photo: UserPhoto) => {
    const newPhotos = [photo, ...photos];
    setPhotos(newPhotos);
    localStorage.setItem('photos', JSON.stringify(newPhotos));
  };

  const deletePhoto = (photo: UserPhoto) => {
    const newPhotos = photos.filter((p) => p.filepath !== photo.filepath);
    setPhotos(newPhotos);
    localStorage.setItem('photos', JSON.stringify(newPhotos));
  };

  const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
    const base64Data = await base64FromPath(photo.webPath);
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });
 
    return {
      filepath: fileName,
      webviewPath: photo.webPath,
    };
  };

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 300,
    });

    const fileName = new Date().getTime() + '.jpeg';
    const savedFileImage = await savePicture(photo, fileName);
    addNewPhoto(savedFileImage);
  };

  return {
    photos,
    takePhoto,
    deletePhoto,
  };
};

async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
};
