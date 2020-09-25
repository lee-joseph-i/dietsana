import * as SectionApiUtil from '../util/section_api_util';

export const RECEIVE_SECTIONS = 'RECEIVE_SECTIONS';
export const RECEIVE_SECTION = 'RECEIVE_SECTION';
export const REMOVE_SECTION = 'REMOVE_SECTION';

const receiveSections = sections => ({
  type: RECEIVE_SECTIONS,
  sections
});

const receiveSection = section => ({
  type: RECEIVE_SECTION,
  section
});

const removeSection = sectionId => ({
  type: REMOVE_SECTION,
  sectionId
});

export const requestSections = projectId => dispatch => {
  return SectionApiUtil.fetchSections(projectId)
    .then(sections => dispatch(receiveSections(sections))
  );
};

export const requestSection = sectionId => dispatch => {
  return SectionApiUtil.fetchSection(sectionId)
    .then(section => dispatch(receiveSection(section))
  );
};

export const createSection = section => dispatch => {
  return SectionApiUtil.createSection(section)
    .then(section => dispatch(receiveSection(section))
  );
};

export const updateSection = section => dispatch => {
  return SectionApiUtil.updateSection(section)
    .then(section => dispatch(receiveSection(section))
  );
};

export const deleteSection = sectionId => dispatch => {
  return SectionApiUtil.deleteSection(sectionId)
    .then(() => dispatch(removeSection(sectionId))
  );
};