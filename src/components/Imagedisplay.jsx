import { useState, useEffect } from 'react';

const ImageDisplay = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  const images = ['/code2.jpeg', '/sketch2.jpeg', '/game.png'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Grid positions for the 3x3 puzzle
  const gridItems = [
    // Column 1
    { col: 1, row: 1, height: 'h-40', bgPos: '0% 0%' },
    { col: 1, row: 2, height: 'h-52', bgPos: '0% 50%' },
    { col: 1, row: 3, height: 'h-40', bgPos: '0% 100%' },
    // Column 2
    { col: 2, row: 1, height: 'h-44', bgPos: '50% 0%' },
    { col: 2, row: 2, height: 'h-64', bgPos: '50% 50%' },
    { col: 2, row: 3, height: 'h-44', bgPos: '50% 100%' },
    // Column 3
    { col: 3, row: 1, height: 'h-40', bgPos: '100% 0%' },
    { col: 3, row: 2, height: 'h-52', bgPos: '100% 50%' },
    { col: 3, row: 3, height: 'h-40', bgPos: '100% 100%' },
  ];

  // Group items by column
  const columns = [
    gridItems.filter(item => item.col === 1),
    gridItems.filter(item => item.col === 2),
    gridItems.filter(item => item.col === 3),
  ];

  return (
    <div className="flex flex-row w-1/2 max-w-[35rem] gap-2 relative top-[140px] ml-[140px] lg:top-0 lg:ml-0 lg:mt-10 lg:justify-center lg:w-4/5 md:w-[95%] md:max-w-full md:mt-5">
      {columns.map((column, colIndex) => (
        <div
          key={colIndex}
          className={`flex flex-col gap-2 w-full ${
            colIndex === 0 || colIndex === 2 ? 'mt-8 sm:mt-4' : ''
          }`}
        >
          {column.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className={`${item.height} w-full rounded-lg bg-no-repeat transition-all duration-100 ease-in-out hover:scale-[1.01] hover:grayscale hover:contrast-100 hover:brightness-100`}
              style={{
                backgroundImage: `url(${images[currentImage]})`,
                backgroundSize: '300% 300%',
                backgroundPosition: item.bgPos,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ImageDisplay;