import React from 'react'; 
import { render, screen, waitFor } from '@testing-library/react'; 
import EmployeeInfo from './EmployeeInfo'; // component to test
import { useFetchedData } from '../hooks/service';
//import {useFetchedData} from '../hooks/service';

type Experience = {
    employer: string;
    month_from: number;
    year_from: number;
};

type CompetenceMap = {
    [key: string]: { competance: number; motivation: number };
};

interface EmployeeInfoData {
    competanse: CompetenceMap;
    tags: {
        languages: string[];
        skills: string[];
        roles: string[];
    };
    workExperience: Experience[];
}



//type FetchedCall<T> = [T | null, boolean, Error | null];

interface FetchData {
    url: string;
    method?: string;
}

const fakeData = {competanceUrl: "/api/data/employeeCompetanse?email=aleksander.dahl%40knowit.no" }

jest.mock('../LoginProvider', () => ({
    useFetchedData: (props: FetchData) => {
        const fakeUser:EmployeeInfoData = {
            competanse: {
                "Sy":{
                    competance: 3,
                    motivation: 1 
                },
                "Strikke":{
                    competance: 4,
                    motivation: 4, 
                },
                "Sykle":{
                    competance: 2,
                    motivation: 2, 
                },
                "Skate":{
                    competance: 0,
                    motivation: 5,
                },
            },
            tags:{
                languages: ["Norsk", "Engelsk"],
                skills: ["Sy", "strikke", "sykle"],
                roles: ['Utvikler', 'Frontendutvikler'],
            },
            workExperience:[
                {
                    employer: 'knowit',
                    month_from: 5,
                    year_from: 2017,
                },{
                    employer: 'no it',
                    month_from: 10,
                    year_from: 2010,
                },
            ]
        
        }
        console.log("Inne i funksjonen hvertfall")
        if(props.url != "HEI"){
        console.log("url ulik hei")
        return([fakeUser, false, null]);
    }else {
        return([null, false, null]);
    }
    }
}));

/* 
export function useFetchedData<T>(props: FetchData):FetchedCall<EmployeeInfoData>{
    console.log("Inne i funksjonen hvertfall")
    if(props.url != "HEI"){
        console.log("url ulik hei")
        return([fakeUser, false, null]);
    }else {
        return([null, false, null]);
    }
}
 */

describe('Fetch', () =>{
    it("should call mockFetch", async () => {
        console.log(useFetchedData({url:fakeData.competanceUrl}))
        render(<EmployeeInfo data= {fakeData} />); 
        //await Promise.resolve;
        //await waitFor(()=>expect(screen.getByText(/Hovedkompetanse/i)).toBeInTheDocument);
        await waitFor(()=>expect(screen.getByText(/Aksel/i)).toBeInTheDocument);
    });
})