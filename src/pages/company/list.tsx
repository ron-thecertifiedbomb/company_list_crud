import React from 'react';
import List from '@/components/List';
import styles from "../../styles/myglobalstyles.module.css";

const Productslist: React.FC = () => {

  return (
    <main className={styles.main}>
      <List />
    </main>
  );
};

export default Productslist;