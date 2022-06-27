import { ConfigProvider } from "antd";
import type { NextPage } from "next";
import { apiGetQuestions } from "../src/apis";
import Dashboard from "../src/screens/Dashboard";
import { getSide } from "../src/utils";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { StoreContext } from "../src/stores";

const Home = (props) => {
  const store = useContext(StoreContext);

  console.log("called from Home => ", store, getSide());

  return (
    <ConfigProvider>
      <Dashboard />
    </ConfigProvider>
  );
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   // const res = await fetch('https://.../posts')
//   // const posts = await res.json()

//   console.log("called from side props => ", getSide());

//   const data = await apiGetQuestions();

//   // console.log(data);

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       data,
//     },
//   };
// }

export default observer(Home);
