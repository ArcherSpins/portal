// eslint-disable-next-line import/prefer-default-export
export const unbindUserId = (arr1, arr2) => {
  const unbind = [];
  if (arr1 !== arr2) {
    arr1.forEach((a) => {
      if (!arr2.includes(a)) {
        unbind.push(a);
      }
    });
  }
  return unbind;
};

export const bindUserId = (arr1, arr2) => {
  const bind = [];
  if (arr1 !== arr2) {
    arr2.forEach((a) => {
      if (!arr1.includes(a)) {
        bind.push(a);
      }
    });
  }
  return bind;
};
