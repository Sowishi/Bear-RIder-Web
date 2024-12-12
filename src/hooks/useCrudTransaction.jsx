import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
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

  const getOwnTransaction = (id, setTransaction) => {
    const colRef = collection(db, "transaction");

    // Construct query to fetch transactions where `rider.id` matches the provided id
    const q = query(colRef, where("rider.id", "==", id));

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const transactions = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, // Include document ID for reference
      }));
      setTransaction(transactions);
    });

    // Return unsubscribe function to allow cleanup
    return unsubscribe;
  };

  return { data, deleteTransaction, getOwnTransaction };
};

export default useCrudTransactions;
