import React, { Fragment, useEffect } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import {TabsProps, TabPanelProps, TabComponentProps} from './TabsProps';

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
  
function TabsComponent(props: TabsProps) {
    const [value, setValue] = React.useState(props.activeTabIndex || 0);
    const [isPanel, setPanel] = React.useState<boolean | undefined>(true);

    useEffect(() => {
        setValue(props.activeTabIndex || 0);
    }, [props.activeTabIndex]);

    useEffect(() => {
        setPanel( 'isPanel' in props ? props.isPanel : true);
    }, [props, props.isPanel]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
        <Fragment>
            <Tabs className="Tabs" value={value} onChange={handleChange} aria-label="basic tabs example">
                {
                    props.data.map((tab: TabComponentProps, ind: number) => (
                        <Tab key={tab.label + tab.value + ind} value={tab.value || ind} label={tab.label} {...a11yProps(2)} onClick={(e) => props.onTabClick!(e, tab.value || 0)} />
                    ))
                }
            </Tabs>
            {
                isPanel && props.data.map((tab: TabComponentProps, ind: number) => (
                    <Fragment key={tab.label + ind}>
                        {
                            tab.isCustomTab ? (
                                props.setCustomTabPanel && props.setCustomTabPanel(tab, tab.label, tab.value || ind)
                            ) : (
                                <TabPanel  value={value} index={tab.value || ind} >Tabs {ind + 1}</TabPanel>
                            )
                        }
                    </Fragment>
                ))
            }
            {/* <p className="my-1">iS Panel : {isPanel + ''}</p>
            <span>{value}</span> */}
        </Fragment>
    )
}

export default TabsComponent;
