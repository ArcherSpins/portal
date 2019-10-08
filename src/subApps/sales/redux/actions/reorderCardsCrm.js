const CARDS_REORDER = 'REORDER_CARDS_COLUMNS';

const reorderCards = (object) => ({
  type: CARDS_REORDER,
  payload: object,
});

export {
  reorderCards, CARDS_REORDER,
};
