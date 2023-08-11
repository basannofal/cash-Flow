import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from '@/styles/form.module.css'; // Make sure to import your CSS styles

const SkeletonForm = () => {
  return (
    <div className="bottom-data">
      <div className="orders">
        <div className="header">
          <Skeleton width={20} height={20} />
          <Skeleton width={100} height={20} />
        </div>
        <section className={styles.container}>
          <form action="#" className={styles.form}>
            <div className={styles.input_box}>
              <Skeleton height={20} />
              <Skeleton width={200} />
            </div>

            <div className={styles.column}>
              <div className={styles.input_box}>
                <Skeleton height={20} />
                <Skeleton width={200} />
              </div>
              <div className={styles.input_box}>
                <Skeleton height={20} />
                <Skeleton width={200} />
              </div>
              <div className={styles.input_box}>
                <Skeleton height={20} />
                <Skeleton width={200} />
              </div>
            </div>

            <div className={`${styles.input_box} ${styles.address}`}>
              <Skeleton height={20} />
              <Skeleton width={300} />
            </div>
            <div className={`${styles.input_box} ${styles.address}`}>
              <Skeleton height={20} />
              <Skeleton width={300} />
            </div>

            <div className={styles.column}>
              <div className={styles.input_box}>
                <Skeleton height={20} />
                <Skeleton width={200} />
              </div>
              <div className={styles.input_box}>
                <Skeleton height={20} />
                <Skeleton width={200} />
              </div>
            </div>

            <Skeleton width={150} height={20} />

            <button className='disable-btn' disabled>
              <Skeleton width={100} height={30} />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SkeletonForm;
