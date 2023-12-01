import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import MENU_ITEMS from '../src/components/menu-items';
import "./App.css";
import CustomDatePicker from "./components/CustomDatepicker";
import Menu from "./components/Menu";
import { MenuContextProvider } from "./components/MenuProvider";
import SankeyChartTest from "./components/SankeyChart";
import useFetch from "./hooks/UseFetch";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
const ITEMS = MENU_ITEMS;

function App() {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("attackPower");
  const { fetchData, isLoading, isError } = useFetch("/ArmoredCorePartsPublic.json");

  // const {data, isLoading, isError} = useFetch('url', {params: ''})
  // Creare component select custom per provare Context api, esempio menu' a tendina con sub directories (recursive)
  // wrappare select + figli select in componente unico
  // datepicker custom (test)
  // Testare useCallback & useMemo per ottimizzazione (pensa a casi d'uso random)
  // Check hooks in generale

  const handleSelectChange = (event) => {
    const nextSelectedOption = event.target.value;
    setSelectedOption(nextSelectedOption);
    // Update graph based on the selected option
    let updatedData = [];
    if (nextSelectedOption !== "weaponType") {
      updatedData = data.map((weapon) => ({
        name: weapon.partName,
        [nextSelectedOption]: weapon[nextSelectedOption],
      }));
    } else {
      const counts = {};
      const weaponTypes = data.map((weapon) => weapon.weaponType);
      weaponTypes.forEach((type) => {
        if (counts[type]) {
          counts[type]++;
        } else {
          counts[type] = 1;
        }
      });
      // Cycle keys (types) and create the new data format from that
      updatedData = Object.keys(counts).map(type => ({
        name: type,
        value: counts[type],
      }));
    }
    setGraphData(updatedData);
  };

  useEffect(() => {
    if (fetchData) {
      const weapons = fetchData.WEAPONS;
      if (weapons) {
        const nextState = [...weapons];
        setData(nextState);
        const initialGraphData = nextState.map((weapon) => ({
          name: weapon.partName,
          [selectedOption]: weapon[selectedOption],
        }));
        setGraphData(initialGraphData);  
      }
    }
  }, [fetchData]);

  function handleOnDateChange(event) {
    console.log(event);
  }


  return (
    <>
      <div>
        <MenuContextProvider>
          <Menu items={ITEMS}></Menu>
        </MenuContextProvider>
      </div>
      <hr className="my-8 border-blue-500"/>
      <div>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex justify-center content-center">
          <select
            onChange={handleSelectChange}
            className="mt-2 block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="attackPower">Attack Power</option>
            <option value="impact">Impact</option>
            <option value="weaponType">Weapon Type</option>
          </select>
        </div>
        <hr className="my-8 border-blue-500"/>
        <div className="chart-container">
        {isLoading && <h1>LOADING....</h1>}
        {isError && <h1 style={{ color: 'red'}}>ERROR</h1>}

        <div className="mx-5">
          <CustomDatePicker onDateChange={handleOnDateChange}/>
        </div>
        
          {graphData && (
            <ResponsiveContainer width={"100%"} height={500}>
              {selectedOption !== "weaponType" ? (
                <BarChart data={graphData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <XAxis dataKey="name" angle={-90} textAnchor="end" height={200} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid strokeDasharray={"3 3"} />
                  <Bar dataKey={selectedOption} fill="#0088fe" />
                </BarChart>
              ) : (
                <PieChart>
                  <Legend />
                  <Tooltip />
                  <Pie data={graphData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label={true}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              )}
            </ResponsiveContainer>
          )}
        </div>
        <hr className="my-8 border-blue-500"/>
        <h1 className="text-xl text-slate-700 text-center">Sankey Chart Tentative</h1>
        <div className="flex justify-center content-center">
          <SankeyChartTest />
        </div>
      </div>
    </>
  );
}

export default App;
