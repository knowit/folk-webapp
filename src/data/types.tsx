export type DDPayload = { [key: string]: any };
export type DDPassProps = { [key: string]: any };

export interface DDComponentProps {
  payload: DDPayload;
  title: string;
  description?: string;
  props: DDPassProps;
}

export interface DDItemProps {
  url: string;
  fullSize?: boolean;
  title: string;
  description?: string;
  dataComponentProps?: DDPassProps;
  Component: (props: DDComponentProps) => JSX.Element;
  SkeletonComponent: () => JSX.Element;
  HeaderSkeletonComponent?: () => JSX.Element;
}
