
import React from 'react';
import { useFetchedData } from '../hooks/service';
import type { DDPayload } from '../data/types';
import { Skeleton } from '@material-ui/lab';
import { DDChart } from '../data/DDItem';



export const ChartSkeleton = () => (
  <Skeleton variant="rect" height={320} width={400} animation="wave" />
);

export function PerProjectView() {

  const [payload, pending, error] = useFetchedData<DDPayload>({ url: '/api/data/perProjectTable' });


  return (
    <>
    {error ? (
    <>
      <div>Oops, noe gikk galt!</div>
    </>
  ) : (
    <>
      <div>
        {pending || !payload ? (
            <ChartSkeleton />
          ) : (
            <>
            <DDChart
            payload={{
              setNames: Object.keys(payload),
              sets: payload
            }}
            title="Antall ansatte og timer per kunde"
            props={{
              chartVariants: [
                  {
                    type: 'Bar',
                    props: {
                      dataKey: 'customer',
                      yLabels: ['value'],
                    },
                  },
              ]
            }}
                  />
            </>
          )}
      </div>
    </>
  )}
  </>)
}
