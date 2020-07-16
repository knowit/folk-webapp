import React from 'react'
import {
    Grid,
} from '@material-ui/core'
import {
    Line,
    Bar,
    PercentArea,
    Pie
} from '../components/charts'
import DataTable from '../components/DataTable'
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
                    <Line />
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
                    <Bar />
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
                    <PercentArea />
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
                    <Pie />
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
