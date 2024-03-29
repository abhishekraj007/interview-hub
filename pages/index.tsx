import { ConfigProvider, Layout } from "antd";
import Dashboard from "../src/screens/Dashboard";
import { observer } from "mobx-react-lite";
import Head from "next/head";

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>Dashboard</title>

        {/* Meta tags */}
      </Head>
      <ConfigProvider>
        <Dashboard />
      </ConfigProvider>
    </Layout>
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
