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
  const inspectionRef = doc(db, "inspection", "inspectionData");

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

  const updateInspection = (data) => {
    setDoc(inspectionRef, { value: data });
  };

  const getInspection = (setInspection) => {
    onSnapshot(inspectionRef, (docSnapshot) => {
      if (docSnapshot.exists() && setInspection) {
        setInspection(docSnapshot.data());
      }
    });
  };

  return { data, updateFare, updateInspection, getInspection };
};

export default useCrudFare;
