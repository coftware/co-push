import { Alert } from 'react-native';
import RNFS from 'react-native-fs';

/**
 * Güncellemeyi indirip yükleyen fonksiyon
 */
const downloadUpdate = async (url) => {
  try {
    const downloadDest = `${RNFS.DocumentDirectoryPath}/index.bundle`;
    const { promise } = RNFS.downloadFile({
      fromUrl: url,
      toFile: downloadDest,
    });

    await promise;

    Alert.alert('Güncelleme Başarılı', 'Uygulamayı yeniden başlatınız.');
  } catch (error) {
    console.error('Güncelleme indirilemedi:', error);
  }
};

/**
 * Güncelleme olup olmadığını kontrol eden fonksiyon
 */
const checkForUpdate = async (UPDATE_SERVER_URL) => {
  try {
    const response = await fetch(`${UPDATE_SERVER_URL}/latest`);
    if (!response.ok) throw new Error('Sunucuya bağlanılamadı');

    const data = await response.json();

    if (data.updateAvailable) {
      Alert.alert(
        'Güncelleme Mevcut',
        'Yeni bir güncelleme var. Güncellemek ister misiniz?',
        [
          { text: 'Hayır', style: 'cancel' },
          {
            text: 'Evet',
            onPress: () => {
              downloadUpdate(data.url);
            },
          },
        ]
      );
    }
  } catch (error) {
    console.error('Güncelleme kontrolü başarısız:', error);
  }
};

// Hem ES Modules hem de CommonJS desteği ekliyoruz
export default { checkForUpdate };
