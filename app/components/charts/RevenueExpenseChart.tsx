import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import ChartHeading from "../charts/ChartHeading";

function RevenueExpenseChart() {
  const expensesData = [
    { name: "Jan", revenue: 4000, expenses: 2400 },
    { name: "Feb", revenue: 3000, expenses: 1398 },
    { name: "Mar", revenue: 5000, expenses: 3800 },
    { name: "Apr", revenue: 2780, expenses: 1908 },
    { name: "May", revenue: 1890, expenses: 1800 },
    { name: "Jun", revenue: 2390, expenses: 2000 },
    { name: "Jul", revenue: 2680, expenses: 1800 },
    { name: "Aug", revenue: 2786, expenses: 1700 },
    { name: "Sep", revenue: 2850, expenses: 1650 },
    { name: "Oct", revenue: 2975, expenses: 1560 },
    { name: "Nov", revenue: 3120, expenses: 1890 },
    { name: "Dec", revenue: 3300, expenses: 1320 },
  ];

  return (
    <>
      <ChartHeading title="Revenue vs Expenses" />
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={expensesData}>
          <XAxis dataKey="name" style={{ fontSize: "15px" }} />
          <YAxis style={{ fontSize: "15px" }} />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#3182CE" />
          <Line type="monotone" dataKey="expenses" stroke="#E53E3E" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default RevenueExpenseChart;
