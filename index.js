import RNFS from 'react-native-fs';

const downloadUpdate = async (url) => {
  try {
    const downloadDest = `${RNFS.DocumentDirectoryPath}/index.bundle`;
    const { promise } = RNFS.downloadFile({
      fromUrl: url,
      toFile: downloadDest,
    });

    await promise;
  } catch (error) {
    console.error('Update download failed:', error);
  }
};

const checkForUpdate = async (API_KEY, CURRENT_VERSION) => {
  try {
    const response = await fetch(`https://api.co-push.com/api/control?key=${API_KEY}&version=${CURRENT_VERSION}`);

    if (!response.ok) throw new Error('Failed to connect to the server');

    const data = await response.json();

    if (data.updateAvailable) {
        downloadUpdate(data.url);
    }
  } catch (error) {
    console.error('Update check failed:', error);
  }
};

export default { checkForUpdate };
