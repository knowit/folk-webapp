
import React from 'react';
import { useFetchedData } from '../hooks/service';
import type { DDPayload } from '../data/types';

export function PerProjectView() {

  const [payload, pending, error] = useFetchedData<DDPayload>({ url: '/api/data/perProjectTable' });


  return (
    <>
    {pending || error || !payload ? (
    <>
      <div>Oops, noe gikk galt!</div>
    </>
  ) : (
    <>
      <div>
        <h1>Wohoo, dataene kom frem!</h1>
        <div>Det er {payload.length} elementer i resultatene</div>
      </div>
    </>
  )}
  </>)
}
