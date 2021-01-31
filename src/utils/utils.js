/* eslint-disable import/prefer-default-export */
export const stringNormalize = (string) => {
  return string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export const stringRemoveTildeAndCarrot = (string) => {
  return string.replace("^", "").replace("~", "");
};
