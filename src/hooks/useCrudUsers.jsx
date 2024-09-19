import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

const useCrudUsers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "users");
    const q = query(colRef, orderBy("createdAt"));
    onSnapshot(q, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        output.push({ ...doc.data(), id: doc.id });
      });
      setData(output.reverse());
    });
  }, []);

  const acceptRider = (id) => {
    const docRef = doc(db, "users", id);
    updateDoc(docRef, { riderStatus: "Verified" });
    console.log("dlkj");
  };

  const deleteUser = (id) => {
    const docRef = doc(db, "users", id);
    deleteDoc(docRef);
    console.log("dlkj");
  };

  return { data, acceptRider, deleteUser };
};

export default useCrudUsers;
