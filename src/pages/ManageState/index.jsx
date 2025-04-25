import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import Card from "../../Components/Card";
import { fetchCountryData } from "../../service/countryService";
import { fetchStateData } from "../../service/stateService";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const ManageState = () => {
  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [formData, setFormData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [countryCode, setCountryCode] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
  const dataToSend = {
    country: country?.country,
    state,
    stateCode,
    countryCode: country?.countryCode,
  };
    console.log(dataToSend,'state');

    if (editId) {
      await updateDoc(doc(db, "state", editId), dataToSend);
      setEditId(null);
    } else {
      await addDoc(collection(db, "state"), dataToSend);
    }

    // Reset
    setCountry("");
    setState("");
    setStateCode("");
    fetchState();
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setCountry(item.country);
    setState(item.state);
    setStateCode(item.stateCode);
  };

  const fetchCountry = async () => {
    const res = await fetchCountryData();
    setCountryList(res);
  };

  const fetchState = async () => {
    const res = await fetchStateData();
    setFormData(res);
  };

  useEffect(() => {
    fetchCountry();
    fetchState();
  }, []);

  return (
    <div>
      <p className="text-xl font-semibold mb-8">Manage State</p>
      <form
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        onSubmit={handleSubmit}
      >
        <Select
          variant="static"
          label="Select Country"
          value={country?.country || ""}
          onChange={(val) => {
            const selected = countryList.find((item) => item.country === val);
            setCountry(selected);
          }}
        >
          {countryList.map((i) => (
            <Option key={i.id || i.countryCode} value={i.country}>
              {i.country}
            </Option>
          ))}
        </Select> 

        <Input
          variant="static"
          label="State"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <Input
          variant="static"
          label="State Code"
          placeholder="State code"
          value={stateCode}
          onChange={(e) => setStateCode(e.target.value)}
        />
        <Button
          size="sm"
          type="submit"
          className="min-w-[142px] w-full text-white"
        >
          {editId ? "Save Edits" : "Create State"}
        </Button>
      </form>

      <hr />
      <p className="text-xl font-semibold my-4">State list</p>
      <div className="grid grid-cols-4 gap-8 my-4">
        {formData?.map((i) => (
          <Card
            key={i.id}
            flag={i?.image}
            name={`${i?.state} (${i?.stateCode})`}
            onEdit={() => handleEdit(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageState;
