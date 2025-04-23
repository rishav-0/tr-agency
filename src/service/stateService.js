import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const fetchStateData = async () => {
  const querySnapshot = await getDocs(collection(db, "state"));
  const data = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return data;
};
