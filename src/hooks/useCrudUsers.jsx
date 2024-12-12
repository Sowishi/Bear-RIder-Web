import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import { db } from "../../firebase";

const useCrudUsers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const colRef = collection(db, "users");
    const q = query(colRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const output = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(output.reverse());
      },
      (err) => {
        console.error("Error fetching users:", err);
        setError(err.message);
      }
    );

    return () => unsubscribe(); // Clean up the subscription
  }, []);

  const acceptRider = useCallback(async (id) => {
    try {
      const docRef = doc(db, "users", id);
      await updateDoc(docRef, { riderStatus: "Verified" });
    } catch (err) {
      console.error("Error updating rider status:", err);
      setError(err.message);
    }
  }, []);

  const rejectRider = useCallback(async (id, reason) => {
    try {
      const docRef = doc(db, "users", id);
      await updateDoc(docRef, {
        riderStatus: { status: "Rejected", note: reason },
      });
    } catch (err) {
      console.error("Error updating rider status:", err);
      setError(err.message);
    }
  }, []);

  const deleteUser = useCallback(async (id) => {
    try {
      const docRef = doc(db, "users", id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error("Error deleting user:", err);
      setError(err.message);
    }
  }, []);

  const getUser = useCallback(async (id, setUser) => {
    try {
      const docRef = doc(db, "users", id);
      const userDoc = await getDoc(docRef);
      if (userDoc.exists()) {
        setUser({ ...userDoc.data(), id: userDoc.id });
      } else {
        console.warn("User not found with ID:", id);
        return null;
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setError(err.message);
      return null;
    }
  }, []);

  const updateUser = useCallback(async (id, forms) => {
    try {
      const docRef = doc(db, "users", id);
      await updateDoc(docRef, forms);
    } catch (err) {
      console.error("Error updating user:", err);
      setError(err.message);
    }
  }, []);

  return {
    data,
    loading,
    error,
    acceptRider,
    rejectRider,
    deleteUser,
    getUser,
    updateUser,
  };
};

export default useCrudUsers;
