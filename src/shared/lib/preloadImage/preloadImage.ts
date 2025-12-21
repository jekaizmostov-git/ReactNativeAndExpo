import { Asset } from "expo-asset";
import { useState, useEffect} from 'react';

// export const usePreloadImages = (imageModules: any[]) => {
//   const [isReady, setIsReady] = useState(false);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const preload = async () => {
//       try {
//         // Конвертируем require в Asset
//         const assets = imageModules.map(module => Asset.fromModule(module));
        
//         // Предзагружаем с прогрессом
//         assets.forEach((asset, index) => {
//           asset.downloadAsync().then(() => {
//             const newProgress = ((index + 1) / assets.length) * 100;
//             setProgress(newProgress);
//           });
//         });

//         // Ждем загрузки всех
//         await Promise.all(assets.map(asset => asset.downloadAsync()));
        
//         setIsReady(true);
//         console.log(`✅ Загружено ${assets.length} изображений`);
//       } catch (error) {
//         console.error('Ошибка предзагрузки:', error);
//       }
//     };

//     preload();
//   }, [imageModules]);

//   return { isReady, progress };
// };


export const preloadImage = async (imageModules: any[]) => {
  await Asset.loadAsync(imageModules);
  console.log('✅ Все ассеты предзагружены и оптимизированы');
}