export default ({ state, source, destination }) => {
  const { index: sourceCardIndex, droppableId: sourceId } = source;
  const {
    index: destinationCardIndex,
    droppableId: destinationId,
  } = destination;
  const sourceColumnIndex = Number(sourceId.replace('column-', ''));
  const destinationColumnIndex = Number(destinationId.replace('column-', ''));

  return state.map((item, currentColumnIndex) => {
    const it = item;
    if (destinationColumnIndex === currentColumnIndex) {
      const [sourceCard] = state[sourceColumnIndex].cards.splice(
        sourceCardIndex,
        1,
      );
      const destinationCards = Array.from(state[destinationColumnIndex].cards);
      destinationCards.splice(destinationCardIndex, 0, sourceCard);
      it.cards = destinationCards;
    }

    return item;
  });
};
