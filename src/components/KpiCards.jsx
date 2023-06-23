import { Card, Metric, Text, Icon, Flex, Grid } from "@tremor/react";
import { CashIcon, TicketIcon,  CurrencyDollarIcon } from "@heroicons/react/solid";
import {useSelector} from 'react-redux';



export default function KpiCards() {

  const {sales, purchases}=useSelector(state=>state.stock) ;
  const totalSales= sales.reduce((acc,item)=> acc + Number(item.price_total) ,0) ;
  const totalPurchases= purchases.reduce((acc,item)=> acc + Number(item.price_total) ,0);
  const totalProfit= totalSales - totalPurchases ;

  const categories = [
    {
      title: "Sales",
      metric: `€ ${totalSales}`,
      icon: TicketIcon,
      color: "indigo",
    },
    {
      title: "Profit",
      metric: `€ ${totalProfit}`,
      icon: CashIcon,
      color: "fuchsia",
    },
    {
      title: "Purchases",
      metric: `€ ${totalPurchases}`,
      icon: CurrencyDollarIcon,
      color: "amber",
    },
  ];


  return (
    <Grid numItemsSm={1} numItemsMd={2} numItemsLg={3} className="gap-6 w-10/12 mx-auto">
      {categories.map(item => (
        <Card key={item.title} decoration="top" decorationColor={item.color}>
          <Flex justifyContent="start" className="space-x-4">
            <Icon
              icon={item.icon}
              variant="light"
              size="lg"
              color={item.color}
            />
            <div className="flex-1 pl-2">
              <Text className="md:text-lg lg:text-xl" >{item.title}</Text>
              <Metric className=" sm:text-md md:text-md lg:text-xl" >{item.metric}</Metric>
            </div>
          </Flex>
        </Card>
      ))}
    </Grid>
  );
}



//! Diğer versiyon
// import { Avatar, Box, Grid, Paper, Typography } from "@mui/material"
// import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
// import PaymentsIcon from "@mui/icons-material/Payments"
// import { amber, deepPurple, pink } from "@mui/material/colors"
// import { useSelector } from "react-redux"

// const KpiCards = () => {
//   const { sales, purchases } = useSelector((state) => state.stock)

// const totalSales = sales.reduce((acc, val) => acc + Number(val.price_total), 0);

// const totalPurchases = purchases.reduce(
//   (acc, val) => acc + Number(val.price_total),
//   0
// );

//   const totalProfit = totalSales - totalPurchases
//   const data = [
//     {
//       id: 1,
//       title: "sales",
//       value: `$${totalSales}`,
//       icon: <MonetizationOnIcon sx={{ fontSize: "2.3rem" }} />,
//       color: deepPurple[600],
//       bgColor: deepPurple[100],
//     },
//     {
//       id: 2,
//       title: "profit",
//       value: `$${totalProfit}`,
//       icon: <ShoppingCartIcon sx={{ fontSize: "2.3rem" }} />,
//       color: pink[600],
//       bgColor: pink[100],
//     },
//     {
//       id: 3,
//       title: "purchases",
//       value: `$${totalPurchases}`,
//       icon: <PaymentsIcon sx={{ fontSize: "2.3rem" }} />,
//       color: amber[600],
//       bgColor: amber[100],
//     },
//   ]

//   return (
//     <Grid container justifyContent={"center"} spacing={3}>
//       {data.map((item) => (
//         <Grid
//           item
//           key={item.id}
//           xs={12}
//           sm={10}
//           md={6}
//           lg={4}
//           sx={{ minWidth: "250px" }}
//         >
//           <Paper sx={{ p: 2 }} elevation={10}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
//               <Avatar
//                 sx={{
//                   backgroundColor: item.bgColor,
//                   color: item.color,
//                   width: 70,
//                   height: 70,
//                   ml: 4,
//                 }}
//               >
//                 {item.icon}
//               </Avatar>

//               <Box>
//                 <Typography variant="button">{item.title}</Typography>
//                 <Typography variant="h4">{item.value}</Typography>
//               </Box>
//             </Box>
//           </Paper>
//         </Grid>
//       ))}
//     </Grid>
//   )
// }

// export default KpiCards