import React from 'react';
import { render, screen } from '@testing-library/react';
import EmployeeInfo from './EmployeeInfo'; // component to test
import { useFetchedData } from '../hooks/service';

jest.mock('../hooks/service');

const fakeUser = {
  competence: {
    Sy: {
      competence: 3,
      motivation: 1,
    },
    Strikke: {
      competence: 4,
      motivation: 4,
    },
    Sykle: {
      competence: 2,
      motivation: 2,
    },
    Skate: {
      competence: 0,
      motivation: 5,
    },
  },
  tags: {
    languages: ['Norsk', 'Engelsk', 'Japansk'],
    skills: ['Systemutvikling', 'Drift', 'Test'],
    roles: ['Teknisk rådgiver', 'Frontendutvikler'],
  },
  workExperience: [
    {
      employer: 'knowit',
      month_from: 5,
      year_from: 2017,
      month_to: -1,
      year_to: -1,
    },
    {
      employer: 'no it',
      month_from: 10,
      year_from: 2010,
      month_to: -1,
      year_to: -1,
    },
  ],
};
const mockCallbackFunction = () => {};
(useFetchedData as jest.Mock).mockReturnValue([fakeUser, false, null]);
//(DDChart as jest.Mock).mockReturnValue(<div>hei</div>);

describe('EmployeeInfo', () => {
  it('should call mockFetch', () => {
    render(
      <EmployeeInfo
        data={{
          competenceUrl: 'falskUrl.com',
          user_id: '123',
          email_id: '123',
        }}
        id={'1'}
        rowStates={{ '1': { expandedData: null, height: 70 } }}
        dispatch={mockCallbackFunction}
      />
    );
    expect(useFetchedData).toHaveBeenCalled;
  });
  it.each(fakeUser.tags.languages)(
    'should render all languages',
    (language) => {
      render(
        <EmployeeInfo
          data={{
            competenceUrl: 'falskUrl.com',
            user_id: '123',
            email_id: '123',
          }}
          id={'1'}
          rowStates={{ '1': { expandedData: null, height: 70 } }}
          dispatch={mockCallbackFunction}
        />
      );
      expect(screen.getByText(language, { exact: false })).toBeInTheDocument;
    }
  );
  it.each(fakeUser.tags.skills)('should render all skills', (skill) => {
    render(
      <EmployeeInfo
        data={{
          competenceUrl: 'falskUrl.com',
          user_id: '123',
          email_id: '123',
        }}
        id={'1'}
        rowStates={{ '1': { expandedData: null, height: 70 } }}
        dispatch={mockCallbackFunction}
      />
    );
    expect(screen.getByText(skill, { exact: false })).toBeInTheDocument;
  });
  it.each(fakeUser.tags.roles)('should render all roles', (role) => {
    render(
      <EmployeeInfo
        data={{
          competenceUrl: 'falskUrl.com',
          user_id: '123',
          email_id: '123',
        }}
        id={'1'}
        rowStates={{ '1': { expandedData: null, height: 70 } }}
        dispatch={mockCallbackFunction}
      />
    );
    expect(screen.getByText(role, { exact: false })).toBeInTheDocument;
  });
  it('should render correct active years', () => {
    render(
      <EmployeeInfo
        data={{
          competenceUrl: 'falskUrl.com',
          user_id: '123',
          email_id: '123',
        }}
        id={'1'}
        rowStates={{ '1': { expandedData: null, height: 70 } }}
        dispatch={mockCallbackFunction}
      />
    );
    const ActiveYears = String(new Date().getFullYear() - 2010) + ' år.';
    expect(screen.getByText(ActiveYears)).toBeInTheDocument;
  });
  it('Should render correct start date in knowit', () => {
    render(
      <EmployeeInfo
        data={{
          competenceUrl: 'falskUrl.com',
          user_id: '123',
          email_id: '123',
        }}
        id={'1'}
        rowStates={{ '1': { expandedData: null, height: 70 } }}
        dispatch={mockCallbackFunction}
      />
    );
    expect(screen.getByText('05/2017.')).toBeInTheDocument;
  });
});
