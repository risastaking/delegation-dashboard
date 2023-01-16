import React, { FC, ReactNode, MouseEvent } from 'react';
import { faLock, faGift } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '/src/assets/Logo';
import { network } from '/src/config';
import { useGlobalContext } from '/src/context';
import modifiable from '/src/helpers/modifiable';

import Delegate from './components/Delegate';
import Undelegate from './components/Undelegate';

import useStakeData from './hooks';

import styles from './styles.module.scss';

interface ActionType {
  label: string;
  render?: ReactNode;
  transaction?: (value: MouseEvent) => Promise<void>;
}

interface PanelType {
  subicon: ReactNode;
  color: string;
  title: string;
  value: string;
  disabled: boolean;
  actions: Array<ActionType>;
}

const Stake: FC = () => {
  const { userActiveRisaStake, userClaimableRisaRewards } = useGlobalContext();
  const { onRestake, onClaimRewards } = useStakeData();
  const { isLoading, isEmpty, isError } = {
    isEmpty: userActiveRisaStake.data === '0',
    isLoading: userActiveRisaStake.status === 'loading',
    isError: userActiveRisaStake.status === 'error'
  };

  const panels: Array<PanelType> = [
    {
      subicon: <FontAwesomeIcon icon={faLock} />,
      color: '#2044F5',
      title: 'Active Stake',
      value: userActiveRisaStake.data || '0',
      disabled: false,
      actions: [
        {
          render: <Undelegate />,
          label: 'Unstake'
        },
        {
          render: <Delegate />,
          label: 'Stake'
        }
      ]
    },
    {
      subicon: <FontAwesomeIcon icon={faGift} />,
      color: '#27C180',
      title: 'Claimable Rewards',
      value: `+ ${userClaimableRisaRewards.data || '0'}`,
      disabled: !userClaimableRisaRewards.data || userClaimableRisaRewards.data === '0',
      actions: [
        {
          transaction: onClaimRewards,
          label: 'Claim Now'
        },
        {
          transaction: onRestake,
          label: 'Restake'
        }
      ]
    }
  ];

  return (
    <div
      className={`${modifiable(
        'stake',
        [(isLoading || isError || isEmpty) && 'empty'],
        styles
      )} stake`}
    >
      {isLoading || isError || isEmpty ? (
        <div className={styles.wrapper}>
          <strong className={styles.heading}>
            Stake RISA
          </strong>

          <div className={styles.logo}>
            <Logo />

            <div style={{ background: '#2044F5' }} className={styles.subicon}>
              <FontAwesomeIcon icon={faLock} />
            </div>
          </div>

          <div className={styles.message}>
            {isLoading
              ? 'Retrieving staking data...'
              : isError
                ? 'There was an error trying to retrieve staking data.'
                : `Currently you don't have any RISA staked.`}
          </div>

          <Delegate />
        </div>
      ) : (
        panels.map((panel, index) => (
          <div key={panel.title} className={styles.panel}>
            <div
              className={modifiable('icon', [index > 0 && 'inversed'], styles)}
            >
              <Logo />

              {index > 0 &&
                Array.from({ length: 4 }).map((item, iteratee) => (
                  <strong
                    key={`plus-${iteratee}`}
                    className={modifiable('plus', [iteratee + 1], styles)}
                  >
                    +
                  </strong>
                ))}

              <div
                style={{ background: panel.color }}
                className={styles.subicon}
              >
                {panel.subicon}
              </div>
            </div>

            <div className={styles.title}>{panel.title}</div>

            <strong className={styles.value}>
              {panel.value} RISA
            </strong>

            <div className={styles.actions}>
              {panel.actions.map((action, iteratee) =>
                action.render ? (
                  <div key={action.label}>{action.render}</div>
                ) : (
                  <button
                    key={action.label}
                    type='button'
                    style={{ background: iteratee ? panel.color : '#303234' }}
                    className={modifiable(
                      'action',
                      [panel.disabled && 'disabled'],
                      styles
                    )}
                    onClick={action.transaction}
                  >
                    {action.label}
                  </button>
                )
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Stake;