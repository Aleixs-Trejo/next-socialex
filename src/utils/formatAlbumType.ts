export const formatAlbumType = (albumType: string) => {
  switch (albumType.toLowerCase()) {
    case 'album':
      return 'Álbum';
    case 'single':
      return 'Sencillo';
    case 'ep':
      return 'Sencillo';
    case 'compilation':
      return 'Compilación';
    default:
      return 'Álbum';
  }
};