export const generateCode: () => string = () => {
  let code = "";
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 9; i > 0; i -= 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};
