import { Sankey, Tooltip } from "recharts";

function SankeyChartTest({ ...rest }) {
  const data = {
    nodes: [
      {
        name: "Visit",
      },
      {
        name: "Direct-Favourite",
      },
      {
        name: "Page-Click",
      },
      {
        name: "Detail-Favourite",
      },
      {
        name: "Lost",
      },
    ],
    links: [
      {
        source: 0,
        target: 1,
        value: 3728.3,
      },
      {
        source: 0,
        target: 2,
        value: 354170,
      },
      {
        source: 2,
        target: 3,
        value: 62429,
      },
      {
        source: 2,
        target: 4,
        value: 291741,
      },
    ],
  };

  return (
    <Sankey
      width={960}
      height={500}
      data={data}
      node={{ stroke: "#77c878", strokeWidth: 2 }}
      // node={<CustomNode/>} da provare
      nodePadding={50}
      margin={{ left: 200, right: 200, top: 100, bottom: 100 }}
      link={{ stroke: "#77c878" }}
      {...rest}
    >
      <Tooltip />
    </Sankey>
  );
}

export default SankeyChartTest;
