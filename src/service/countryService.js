import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const fetchCountryData = async () => {
  const querySnapshot = await getDocs(collection(db, "country"));
  const data = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return data;
};
