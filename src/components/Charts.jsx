import {
  Card,
  Title,
  Text,
  LineChart,
  TabList,
  Tab,
  TabGroup,
  TabPanel,
  TabPanels,
} from "@tremor/react";
import { useSelector } from "react-redux";

const data = {
  relative: [
    {
      Date: "01.01.2021",
      "Customer Churn": 9.73,
    },
    {
      Date: "02.01.2021",
      "Customer Churn": 10.74,
    },
    // ...
    {
      Date: "13.03.2021",
      "Customer Churn": 8.82,
    },
  ],
  absolute: [
    {
      Date: "01.01.2021",
      "Customer Churn": 90,
    },
    // ...
    {
      Date: "13.03.2021",
      "Customer Churn": 88,
    },
  ],
};



const valueFormatterAbsolute = (number) =>
  Intl.NumberFormat("us").format(number).toString();

export default function Charts() {
  const {sales,purchases} = useSelector(state=>state.stock)

  const salesData = sales.map(item=> ({
    date : item.createds,
    sale: Number(item.price_total),
  }))
  const purchasesData = purchases.map(item => ({
    date: item.createds,
    purchase: Number(item.price_total),
  }));

  return (
    <Card className="mt-4 w-10/12 mx-auto">
      <TabGroup>
        <div className="block sm:flex sm:justify-between">
          <div>
            <Title>Sales and Purchases</Title>
            {/* <Text>Lost customers per day</Text> */}
          </div>
          <div className="mt-4 sm:mt-0">
            <TabList variant="solid">
              <Tab>Sales</Tab>
              <Tab>Purchases</Tab>
            </TabList>
          </div>
        </div>
        <TabPanels>
          <TabPanel>
            <LineChart
              className="mt-8 h-80"
              data={salesData}
              index="date"
              categories={["sale"]}
              colors={["blue"]}
              showLegend={false}
              valueFormatter={valueFormatterAbsolute}
              yAxisWidth={40}
            />
          </TabPanel>
          <TabPanel>
            <LineChart
              className="mt-8 h-80"
              data={purchasesData}
              index="date"
              categories={["purchase"]}
              colors={["red"]}
              showLegend={false}
              valueFormatter={valueFormatterAbsolute}
              yAxisWidth={40}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
  );
}