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
import { AuthRedirect } from 'components/AuthRedirect/index.js';

const Admin = () => {
  const { address } = useGetAccountInfo();
  const { contractDetails } = useGlobalContext();
  const [loading, setLoading] = useState<boolean>(true);


  useGlobalData();

  if (loading) {
    return (
      <AuthRedirect requireAuth={true}>
      <div
        style={{ fontSize: '30px' }}
        className='d-flex align-items-center justify-content-center text-white flex-fill'
      >
        <FontAwesomeIcon
          icon={faSpinner}
          size='2x'
          spin={true}
          className='mr-3'
        />
        Loading...
      </div>
      </AuthRedirect>
    );
  }

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
