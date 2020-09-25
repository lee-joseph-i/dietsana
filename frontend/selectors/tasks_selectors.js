export const taskSelector = (state, sectionId) => {
  return Object.values(state.entities.tasks).filter(
    (task) => task.sectionId === Number(sectionId)
  );
};
