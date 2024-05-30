"use client";

import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';

/*

        
        <LineChart
            xAxis={[{ data: tempValues.map(temp => Date.parse(temp.timestamp)) }]}
            series={[
                {
                    scaleType: 'point',
                    data: tempValues.map(temp => temp.temperature)
                },
            ]}
            width={500}
            height={300}
        />


*/

export default function DeviceStats({ tempValues }: any) {
    return (


<LineChart
      width={500}
      height={300}
      series={[{ data: tempValues.map(temp => temp.temperature), label: 'uv', area: true, showMark: false }]}
      xAxis={[{ scaleType: 'point', data: tempValues.map(temp => Date.parse(temp.timestamp)) }]}
      sx={{
        [`& .${lineElementClasses.root}`]: {
          display: 'none',
        },
      }}
    />
    );
}