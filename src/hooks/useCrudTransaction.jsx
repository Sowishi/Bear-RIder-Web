import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

const useCrudTransactions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "transaction");
    const q = query(colRef, orderBy("createdAt"));
    onSnapshot(q, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        output.push({ ...doc.data(), id: doc.id });
      });
      setData(output.reverse());
    });
  }, []);

  const deleteTransaction = (id) => {
    const docRef = doc(db, "transaction", id);
    deleteDoc(docRef);
    console.log("dlkj");
  };

  return { data, deleteTransaction };
};

export default useCrudTransactions;
