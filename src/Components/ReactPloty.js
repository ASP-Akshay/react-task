
import { BarChart } from "../Styled/Chart";

const RectPlot = ({ xAxis, yAxis }) => {
  return (
    <BarChart
      data={[
        {
          x: xAxis,
          y: yAxis,
          type: "bar",
        },
      ]}
      layout={{
        title: {
          text: "User's Age Visualization",
          font: {
            size: 14,
          }
        },
        titlefont: 'Arial, sans-serif',
        autosize: true,
        xaxis: {
          title: "Name",
          titlefont: {
            size: 14,
            color: "#7f7f7f"
          },
        },
        yaxis: {
          title: "Age",
          titlefont: {
            size: 14,
            color: "#7f7f7f",
          },
        },
      }}
      useResizeHandler
    />
  );
};

export default RectPlot;
