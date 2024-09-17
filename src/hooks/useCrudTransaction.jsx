import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

const useCrudTransactions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "transaction");
    onSnapshot(colRef, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        output.push({ ...doc.data(), id: doc.id });
      });
      setData(output);
    });
  }, []);

  return { data };
};

export default useCrudTransactions;
