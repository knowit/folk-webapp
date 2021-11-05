import React from 'react';
import CharacterLimitBox from '../../../components/CharacterLimitBox';

import ConsultantCell from './cells/ConsultantCell';
import CvCell from './cells/CvCell';
import ProjectStatusCell from './cells/ProjectStatusCell';
import CustomerStatusCell from './cells/CustomerStatusCell';
import CheckBoxHeaderCell from './cells/CheckBoxHeaderCell';
import CenteredHeaderCell from './cells/CenteredHeaderCell'

const EducationCell = ({ data }: { data: string | null }) => (
  <CharacterLimitBox text={data || '-'} />
);

export {
  ConsultantCell,
  EducationCell,
  CvCell,
  ProjectStatusCell,
  CustomerStatusCell,
  CheckBoxHeaderCell,
  CenteredHeaderCell,
};
