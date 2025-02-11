import { Alert } from 'react-native';
import RNFS from 'react-native-fs';
import RNRestart from 'react-native-restart';

export default class Updater {
  constructor(updateServerUrl) {
    this.UPDATE_SERVER_URL = updateServerUrl;
  }

  async downloadUpdate(url) {
    try {
      const downloadDest = `${RNFS.DocumentDirectoryPath}/index.bundle`;
      const { promise } = RNFS.downloadFile({
        fromUrl: url,
        toFile: downloadDest,
      });

      await promise;

      Alert.alert('Güncelleme Başarılı', 'Uygulamayı yeniden başlatınız.');
      RNRestart.restart();
    } catch (error) {
      console.error('Güncelleme indirilemedi:', error);
    }
  }

  async checkForUpdate() {
    try {
      const response = await fetch(`${this.UPDATE_SERVER_URL}/latest`);
      const data = await response.json();

      if (data.updateAvailable) {
        Alert.alert(
          'Güncelleme Mevcut',
          'Yeni bir güncelleme var. Güncellemek ister misiniz?',
          [
            { text: 'Hayır', style: 'cancel' },
            {
              text: 'Evet',
              onPress: async () => {
                await this.downloadUpdate(data.url);
              },
            },
          ],
        );
      }
    } catch (error) {
      console.error('Güncelleme kontrolü başarısız:', error);
    }
  }
}
