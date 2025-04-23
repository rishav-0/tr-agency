import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import Card from "../../Components/Card";
import { fetchCountryData } from "../../service/countryService";
import { fetchStateData } from "../../service/stateService";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase"; // make sure this path is correct

const ManageState = () => {
  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [formData, setFormData] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      country: country,
      state: state,
      stateCode: stateCode,
     
    };

    if (editId) {
      await updateDoc(doc(db, "state", editId), dataToSend);
      setEditId(null);
    } else {
      await addDoc(collection(db, "state"), dataToSend);
    }

    setCountry("");
    setState("");
    setStateCode("");
    fetchState();
  };

  const fetchCountry = async () => {
    const res = await fetchCountryData();
    setCountryList(res);
    console.log(res,'country');
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
      <form className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Select
          variant="static"
          label="Select Country"
          value={country}
          onChange={(val) => setCountry(val)}
        >
          {countryList.map((i) => (
            <Option key={i.countryCode} value={i.country}>
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
          onClick={handleSubmit}
          className="min-w-[142px] w-full text-white"
        >
          {editId ? "Update State" : "Create State"}
        </Button>
      </form>

      <hr />
      <p className="text-xl font-semibold my-4">State list</p>
      <div className="grid grid-cols-4 gap-8 my-4">
        {formData?.map((i) => (
          <Card key={i.stateCode} flag={i?.image} name={i?.state} />
        ))}
      </div>
    </div>
  );
};

export default ManageState;
