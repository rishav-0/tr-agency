import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const fetchDestinationData = async () => {
  const querySnapshot = await getDocs(collection(db, "destination"));
  const data = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return data;
};
