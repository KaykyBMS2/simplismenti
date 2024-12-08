import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout from "./components/Layout";
import CookieModal from "./components/CookieModal";
import ComingSoon from "./components/ComingSoon";

const Home: NextPage = () => {
  return (
    <Layout>
      <CookieModal />
      <ComingSoon />
    </Layout>
  );
};

export default Home;