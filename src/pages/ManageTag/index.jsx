import { Button, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Card from "../../Components/Card";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { fetchTagData } from "../../service/tagService";

const ManageTag = () => {
  const [tag, setTag] = useState("");
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      tag: tag,
      image: image,
    };

    if (editId) {
      await updateDoc(doc(db, "tag", editId), dataToSend);
      setEditId(null);
    } else {
      await addDoc(collection(db, "tag"), dataToSend);
    }

    setTag("");
    setImage("");
    fetchData();
  };

  const fetchData = async () => {
    const res = await fetchTagData();
    setFormData(res);
  };

  const handleEdit = (data) => {
    setEditId(data.id); // document ID for update
    setTag(data.tag);
    setImage(data.image);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <p className="text-xl font-semibold mb-8">Manage Tag</p>
      <form
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8"
        onSubmit={handleSubmit}
      >
        <Input
          variant="static"
          label="Tag"
          placeholder="Tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <Input
          variant="static"
          label="Image"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Button
          size="sm"
          type="submit"
          className="min-w-[142px] w-full text-white"
        >
          {editId ? "Save Edits" : "Create Tag"}
        </Button>
      </form>

      <hr />
      <p className="text-xl font-semibold my-4">Tag list</p>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 my-4">
        {formData?.map((i) => (
          <Card
            key={i.id}
            flag={i?.image}
            name={i?.tag}
            onEdit={() => handleEdit(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageTag;
