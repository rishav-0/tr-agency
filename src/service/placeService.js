import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const fetchPlaceData = async () => {
  const querySnapshot = await getDocs(collection(db, "place"));
  const data = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return data;
};
