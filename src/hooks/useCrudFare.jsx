import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

const useCrudFare = () => {
  const [data, setData] = useState({});
  const docRef = doc(db, "fare", "fareData");

  useEffect(() => {
    onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setData(docSnapshot.data());
      } else {
        setData(null);
      }
    });
  }, []);

  const updateFare = (forms) => {
    setDoc(docRef, forms);
  };

  return { data, updateFare };
};

export default useCrudFare;
