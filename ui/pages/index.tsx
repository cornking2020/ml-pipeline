import type { NextPage } from 'next';
import React from 'react';
import { DefaultLayout } from '../components/DefaultLayout';
import HomeTopControlBar from '../components/home/HomeTopControlBar';
import { PanelOpen } from '../store/Enums';

const Home: NextPage = () => {
  return (
    <DefaultLayout title={PanelOpen.HOME}>
      <HomeTopControlBar />
    </DefaultLayout>
  );
};

export default Home;