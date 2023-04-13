import React from "react";
import List from "@/components/List";
import styles from "../styles/myglobalstyles.module.css";


const AddProduct: React.FC = () => {
  return (
    <main className={styles.main}>
      
      <section className=" w-full flex flex-col justify-center items-center gap-5">
      <h1 className=" font-bold text-2xl">List of Companies</h1>
      <List />


      </section>
      
     
    </main>
  );
};

export default AddProduct;
