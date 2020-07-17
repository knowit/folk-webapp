import React from 'react'
import {
    Grid,
} from '@material-ui/core'
import { 
    ConsultantCell, 
    ProjectStatusCell,
    CustomerStatusCell
} from '../components/DataTableCells'
import DDItem, { DDTable, DDChart } from '../components/DDItem'
import { Skeleton } from '@material-ui/lab'


export default function Employee() {
    const TableSkeleton = () => <Skeleton variant='rect' height={530} animation="wave" />
    const ChartSkeleton = () => <Skeleton variant='rect' height={280} animation="wave" />

    return (
        <Grid container spacing={2}>

            <DDItem 
                url={'/api/data/inbound'}
                title={'På vei inn'}
                Component={DDChart}
                SkeletonComponent={ChartSkeleton}
                dataComponentProps={{
                    yLabels: ['y1', 'y2']
                }}
            />

            <DDItem 
                url={'/api/data/outbound'}
                title={'På vei ut'}
                Component={DDChart}
                SkeletonComponent={ChartSkeleton}
                dataComponentProps={{
                    yLabels: ['y1', 'y2']
                }}
            />

            <DDItem 
                url={'/api/data/experience'}
                title={'Erfaringsnivå'}
                Component={DDChart}
                SkeletonComponent={ChartSkeleton}
                dataComponentProps={{
                    yLabels: ['a', 'a', 'c']
                }}
            />

            <DDItem 
                url={'/api/data/resourceType'}
                title={'Ressurstype'}
                Component={DDChart}
                SkeletonComponent={ChartSkeleton}
            />
        
            <DDItem 
                url={'/api/data/projectStatus'}
                title={'Prosjektstatus'}
                fullSize={true}
                Component={DDTable}
                dataComponentProps={{
                    columns:[
                        { title: 'Konsulent', expandable: true, renderCell: ConsultantCell },
                        { title: 'Tittel' },
                        { title: 'Prosjektstatus', renderCell: ProjectStatusCell },
                        { title: 'Kunde', renderCell: CustomerStatusCell }
                    ]
                }}
                SkeletonComponent={TableSkeleton}
            />
        </Grid>

    )
}
