import { useState } from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Cards from '/src/components/Cards';
import Heading from '/src/components/Heading';
import Nodes from '/src/components/Nodes';
import Toggles from '/src/components/Toggles';

import { useGlobalContext } from '../../context';
import useGlobalData from '../../hooks/useGlobalData';

import * as styles from './styles.module.scss';

const Admin = () => {
  const { address } = useGetAccountInfo();
  const { contractDetails } = useGlobalContext();
  const [loading, setLoading] = useState<boolean>(true);


  useGlobalData();

  return (
    <div className={styles.admin}>
      <Heading />

      <Cards />

      <Toggles />

      <Nodes />
    </div>
  );
};

export default Admin;
