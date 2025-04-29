import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const fetchTagData = async () => {
  const querySnapshot = await getDocs(collection(db, "tag"));
  const data = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return data;
};
