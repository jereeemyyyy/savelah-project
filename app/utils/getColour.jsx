const predefinedColors = {
    Food: '#FF0000', // red
    Transportation: '#FFFF00', // yellow
    House: '#0000FF' // blue
  };
  
  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  };
  
  const getColour = (word) => {
    if (predefinedColors[word]) {
      return predefinedColors[word];
    }
    return stringToColor(word);
  };
  
  export default getColour;
  