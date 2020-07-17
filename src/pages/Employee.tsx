import React from 'react'
import {
    Grid,
} from '@material-ui/core'
import Line from '../components/dd/Line'
import Bar from '../components/dd/Bar'
import PercentArea from '../components/dd/PercentArea'
import Pie from '../components/dd/Pie'
import DataTable from '../components/dd/DataTable'
import { 
    ConsultantCell, 
    ProjectStatusCell,
    CustomerStatusCell
} from '../components/DataTableCells';
import { 
    GridItem,
    GridItemHeader,
    GridItemContent
} from '../components/GridItem';
import DropdownPicker from '../components/DropdownPicker';
import SearchInput from '../components/SearchInput';


export default function Employee() {
    return (
        <Grid container spacing={2}>

            <GridItem>
                <GridItemHeader title={"På vei inn"}>
                    <DropdownPicker 
                        values={[
                            'Uke 10',
                            'Uke 11',
                            'Uke 12',
                            'Uke 13',
                        ]}/>
                </GridItemHeader>
                <GridItemContent>
                    <Line 
                        yLabels={['y1', 'y2']}
                        data={[
                            { x: 'A', y1: 4000, y2: 2400, },
                            { x: 'B', y1: 3000, y2: 1398, },
                            { x: 'C', y1: 2000, y2: 9800, },
                            { x: 'D', y1: 2780, y2: 3908, },
                            { x: 'E', y1: 1890, y2: 4800, },
                            { x: 'F', y1: 2390, y2: 3800, },
                            { x: 'G', y1: 3490, y2: 4300, }
                        ]}/>
                </GridItemContent>
            </GridItem>

            <GridItem>
                <GridItemHeader title={"På vei ut"}>
                    <DropdownPicker 
                        values={[
                            'Uke 10',
                            'Uke 11',
                            'Uke 12',
                            'Uke 13',
                        ]}/>
                </GridItemHeader>
                <GridItemContent>
                    <Bar 
                        yLabels={['y1', 'y2']}
                        data={[
                            { x: 'A', y1: 4000, y2: 2400, },
                            { x: 'B', y1: 3000, y2: 1398, },
                            { x: 'C', y1: 2000, y2: 9800, },
                            { x: 'D', y1: 2780, y2: 3908, },
                            { x: 'E', y1: 1890, y2: 4800, },
                            { x: 'F', y1: 2390, y2: 3800, },
                            { x: 'G', y1: 3490, y2: 4300, }
                        ]}/>
                </GridItemContent>
            </GridItem>

            <GridItem>
                <GridItemHeader title={"Erfaringsnivå"}>
                    <DropdownPicker 
                        values={[
                            'Gjennomsnitt',
                            'Median',
                            'Maksimum',
                            'Minimum'
                        ]}/>
                </GridItemHeader>
                <GridItemContent>
                    <PercentArea 
                        yLabels={['a', 'a', 'c']}
                        data={[
                            { x: '2015.01', a: 4000, b: 2400, c: 2400, },
                            { x: '2015.02', a: 3000, b: 1398, c: 2210 },
                            { x: '2015.03', a: 2000, b: 9800, c: 2290 },
                            { x: '2015.04', a: 2780, b: 3908, c: 2000 },
                            { x: '2015.05', a: 1890, b: 4800, c: 2181 },
                            { x: '2015.06', a: 2390, b: 3800, c: 2500 },
                            { x: '2015.07', a: 3490, b: 4300, c: 2100 },
                        ]}/>
                </GridItemContent>
            </GridItem>

            <GridItem>
                <GridItemHeader title={"Ressurstype"}>
                    <DropdownPicker 
                        values={[
                            'Mobilutvikler',
                            'Systemutvikler',
                            'Webutvikler',
                            'Designer',
                            'Prosjektleder'
                        ]}/>
                </GridItemHeader>
                <GridItemContent>
                    <Pie 
                        data={[
                            { group: 'Group A', value: 400 },
                            { group: 'Group B', value: 300 },
                            { group: 'Group C', value: 300 },
                            { group: 'Group D', value: 200 }
                        ]}/>
                </GridItemContent>
            </GridItem>

            <GridItem fullSize >
                <GridItemHeader title={"Prosjektstatus"}>
                    <SearchInput />
                </GridItemHeader>
                <GridItemContent>
                    <DataTable 
                        columns={[
                            { title: 'Konsulent', expandable: true, renderCell: ConsultantCell },
                            { title: 'Tittel' },
                            { title: 'Prosjektstatus', renderCell: ProjectStatusCell },
                            { title: 'Kunde', renderCell: CustomerStatusCell }
                        ]}
                        rows={[
                            { rowData: ['Trude Vennesla', 'Utvikler', 100, {value: 'Ruter', status: 'red'}] },
                            { rowData: ['Tore Bjørn Amundsen', 'Utvikler', 100, {value: 'Entur', status: 'red'}] },
                            { rowData: ['Trond Ragde', 'Senior Interaksjonsdesigner', 75, {value: 'Nasjonalbiblioteket', status: 'red'}] },
                            { rowData: ['Terje Vigeland', 'UX designer', 0, {value: null, status: 'green'}] },
                            { rowData: ['Tine Hansen', 'Senior utvikler', 50, {value: 'Oslo Kommune Bymiljøetaten',status: 'red'}] },
                            { rowData: ['Trine Greiger Ovesens Dottir', 'Android utvikler', 0, {value: null,status: 'green'}] }
                        ]}/>
                </GridItemContent>
            </GridItem>
        </Grid>

    )
}
