export const stringToUrlFriendly = (string) => {
  const formattedString = string.replace(/[\s:;!?,.]/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

  return formattedString;
};
