import { ReactNode } from "react";

export interface TabPanelProps {
    children?: React.ReactNode;
    index?: number | string;
    value: string | number;
}

export interface TabComponentProps {
    label: string;
    value?: string | number;
    icon?: string | HTMLElement;
    isCustomTab?: boolean;
    isCustomTabPanel?: boolean;
}

export interface TabsComponentProps {
    data: TabComponentProps[];
    setCustomTab?: (tabData: any, tabLabel: string, tabIndex: number | string) => ReactNode;
    setCustomTabPanel?: (tabData: any, tabLabel: string, tabPanelIndex: number | string) => ReactNode;
    activeTabIndex?: number | string;
    onTabClick?: (e: any, tabIndex: string | number) => any;
    isPanel?: boolean;
}

export type TabsProps = React.PropsWithChildren & TabsComponentProps;
