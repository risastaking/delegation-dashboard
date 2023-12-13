import React, { useEffect, useState } from 'react';

import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import Cards from '/src/components/Cards';
import Heading from '/src/components/Heading';
import Stake from '/src/components/Stake';
import StakeRisa from '/src/components/StakeRisa';
import Withdrawals from '/src/components/Withdrawals';

import useGlobalData from '../../hooks/useGlobalData';

import * as styles from './styles.module.scss';

const Dashboard = () => {
  useGlobalData();

  return (
    <div className={styles.dashboard}>
      <Stake />
      <StakeRisa />
      <Heading />
      <Cards />
      <Withdrawals />
    </div>
  );
};

export default Dashboard;
