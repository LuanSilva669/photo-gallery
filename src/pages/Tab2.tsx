import './Tab2.css';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonButton } from '@ionic/react';
import { camera } from 'ionicons/icons';
import { UserPhoto, usePhotoGallery} from '../usePhotoGallery';

const Tab2: React.FC = () => {
  const { photos, takePhoto, deletePhoto } = usePhotoGallery();

  return (
    <IonPage >
      <IonHeader>
        <IonToolbar>
          <IonTitle className="content">Photo Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid >
          <IonRow >
            {photos.map((photo, index) => (
              <IonCol  size="4" key={index}>
                <div>
                  <IonImg src={photo.webviewPath} />
                  <IonButton onClick={() => deletePhoto(photo)}>Deletar</IonButton>
                </div>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={takePhoto}>
            <IonIcon icon={camera} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
