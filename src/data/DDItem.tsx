import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { useFetchedData } from '../hooks/service';
import {
  GridItem,
  GridItemHeader,
  GridItemContent,
} from '../components/GridItem';
import DDTable from './DDTable';
import DDChart from './DDChart';
import { ErrorText } from '../components/ErrorText';

type DDPayload = { [key: string]: any };
type DDPassProps = { [key: string]: any };

export interface DDComponentProps {
  payload: DDPayload;
  title: string;
  props?: DDPassProps;
}

export interface DDItemProps {
  url: string;
  fullSize?: boolean;
  title: string;
  dataComponentProps?: DDPassProps;
  Component: (props: DDComponentProps) => JSX.Element;
  SkeletonComponent: () => JSX.Element;
  HeaderSkeletonComponent?: () => JSX.Element;
}

interface DDErrorProps {
  error: Error;
}

function DDError({ error }: DDErrorProps) {
  // eslint-disable-next-line no-console
  console.log(error);
  return <ErrorText height={320} />;
}

export default function DDItem({
  url,
  title,
  Component,
  SkeletonComponent,
  HeaderSkeletonComponent = () => (
    <Skeleton variant="rect" height={43} width={120} animation="wave" />
  ),
  fullSize = false,
  dataComponentProps = {},
}: DDItemProps) {
  const [payload, pending, error] = useFetchedData<DDPayload>({ url });

  return (
    <GridItem fullSize={fullSize}>
      {pending || error || !payload ? (
        <>
          <GridItemHeader title={title}>
            {pending && !error ? <HeaderSkeletonComponent /> : null}
          </GridItemHeader>
          <GridItemContent>
            {error && <DDError error={error} />}
            {pending && !error && <SkeletonComponent />}
          </GridItemContent>
        </>
      ) : (
        <Component
          payload={payload as DDPayload}
          title={title}
          props={dataComponentProps}
        />
      )}
    </GridItem>
  );
}

export { DDTable, DDChart };
