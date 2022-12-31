export const generateCode: () => string = () => {
  const code = Array(6).fill('x').join('').replace(/x/g, () => {
       return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
       });
  return code;
};

