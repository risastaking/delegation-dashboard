import React from 'react';

import { Formik } from 'formik';

import { network } from 'config';
import { useGlobalContext } from 'context';

import modifiable from 'helpers/modifiable';

import Action from 'pages/Dashboard/components/Action';

import { undelegateValidator } from 'pages/Dashboard/components/Stake//helpers/delegationValidators';
import useStakeData from 'pages/Dashboard/components/Stake/hooks';

import styles from './styles.module.scss';

const Undelegate: React.FC = () => {
  const { userActiveStake } = useGlobalContext();
  const { onUndelegate } = useStakeData();

  return (
    <div className={styles.wrapper}>
      <Action
        title='Undelegate Now'
        description={`Select the amount of ${network.egldLabel} you want to undelegate.`}
        trigger={<div className={styles.trigger}>Undelegate</div>}
        render={
          <div className={styles.undelegate}>
            <Formik
              validationSchema={undelegateValidator(userActiveStake.data || '')}
              onSubmit={onUndelegate}
              initialValues={{
                amount: '0'
              }}
            >
              {({
                errors,
                values,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue
              }) => {
                const onMax = (event: any): void => {
                  event.preventDefault();
                  setFieldValue('amount', userActiveStake.data);
                };

                return (
                  <form onSubmit={handleSubmit}>
                    <div className={styles.field}>
                      <label htmlFor='amount'>{network.egldLabel} Amount</label>
                      <div className={styles.group}>
                        <input
                          type='number'
                          name='amount'
                          step='any'
                          required={true}
                          autoComplete='off'
                          min={0}
                          className={modifiable(
                            'input',
                            [errors.amount && touched.amount && 'invalid'],
                            styles
                          )}
                          value={values.amount}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />

                        <a href='/#' onClick={onMax} className={styles.max}>
                          Max
                        </a>
                      </div>

                      <span className={styles.description}>
                        <span>Balance:</span> {userActiveStake.data}{' '}
                        {network.egldLabel}
                      </span>

                      {errors.amount && touched.amount && (
                        <span className={styles.error}>{errors.amount}</span>
                      )}
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        }
      />
    </div>
  );
};

export default Undelegate;