import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Box, useTheme } from '@mui/material';
import { useGetSalesQuery } from 'state/api';

const BreakdownChart = ({ isDashboard = false }) => {
    const { data, isLoading } = useGetSalesQuery();
    const theme = useTheme();

    if (!data || isLoading) return 'Loading...';

    const colors = [
        theme.palette.secondary[500],
        theme.palette.secondary[300],
        theme.palette.secondary[300],
        theme.palette.secondary[500],
    ];
    const formattedData = Object.entries(data.salesByCategory).map(([category, sales], i) => ({
        id: category,
        lebel: category,
        value: sales,
        color: colors[i],
    }));

    const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
        let total = 0;
        dataWithArc.forEach((datum) => {
            total += datum.value;
        });

        return (
            <text
                x={centerX}
                y={centerY}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    fontSize: isDashboard ? '0.7rem' : '1rem',
                    fontWeight: 600,
                    color: `${theme.palette.secondary[400]}`,
                    zIndex: 999,
                }}
            >
                {`Total: ${total}`}
            </text>
        );
    };

    return (
        <Box
            height={isDashboard ? '400px' : ' 100%'}
            width={undefined}
            minHeight={isDashboard ? '325px' : undefined}
            minWidth={isDashboard ? '325px' : undefined}
            position="relative"
        >
            <ResponsivePie
                data={formattedData}
                theme={{
                    axis: {
                        domain: {
                            line: {
                                stroke: theme.palette.secondary[200],
                            },
                        },
                        legend: {
                            text: {
                                fill: theme.palette.secondary[200],
                            },
                        },
                        ticks: {
                            line: {
                                stroke: theme.palette.secondary[200],
                                strokeWidth: 1,
                            },
                            text: {
                                fill: theme.palette.secondary[200],
                            },
                        },
                    },
                    legends: {
                        text: {
                            fill: theme.palette.secondary[200],
                        },
                    },
                    tooltip: {
                        container: {
                            color: theme.palette.primary.main,
                        },
                    },
                }}
                colors={{ datum: 'data.color' }}
                margin={
                    isDashboard
                        ? { top: 40, right: 80, bottom: 100, left: 50 }
                        : { top: 40, right: 80, bottom: 80, left: 80 }
                }
                sortByValue={true}
                innerRadius={0.45}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [['darker', 0.2]],
                }}
                enableArcLabels={!isDashboard}
                arcLinkLabelsTextColor={theme.palette.secondary[200]}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: 'color',
                    modifiers: [['darker', 2]],
                }}
                layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: isDashboard ? 20 : 0,
                        translateY: isDashboard ? 50 : 56,
                        itemsSpacing: 0,
                        itemWidth: 85,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: theme.palette.primary[500],
                                },
                            },
                        ],
                    },
                ]}
            />
        </Box>
    );
};

export default BreakdownChart;
