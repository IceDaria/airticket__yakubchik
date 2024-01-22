import { useEffect, useState } from "react";

// Хук для отрисовки СайдБара в компоненте контетнта в мобильной версии
export const useWindowResize = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 960);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 960);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return [isMobile];
  };

// Хук для отрисовки Сайдбара в десктопе
export const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth > 960);
  
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth > 960);
      };
  
      handleResize(); // Вызываем обработчик сразу при монтировании

      window.addEventListener('resize', handleResize); // Добавляем слушатель события изменения размера

    // Удаляем слушатель при размонтировании компонента
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return windowWidth;
  };