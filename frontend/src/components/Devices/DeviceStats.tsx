"use client";

import { LineChart } from '@mui/x-charts/LineChart';

export default function DeviceStats({ temperatureValues }: any) {
    const temperature = {
        xData: temperatureValues.map(d => new Date(d.timestamp).toUTCString()),
        yData: temperatureValues.map(d => d.temperature),
    };

    return (
        <LineChart
            width={500}
            height={300}
            series={[{ data: temperature.yData, label: 'temperature', area: true, showMark: false }]}
            xAxis={[{ scaleType: 'point', data: temperature.xData }]}
        />
    );
}