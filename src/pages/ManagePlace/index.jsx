import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Card from "../../Components/Card";
import { fetchCountryData } from "../../service/countryService";
import { fetchStateData } from "../../service/stateService";
import { fetchPlaceData } from "../../service/placeService";
import { db } from "../../firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

const ManagePlace = () => {
  const [stateList, setStateList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [formData, setFormData] = useState([]);
  const [placeName, setPlace] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      country: country,
      state: state,
      place: placeName,
      placeId: placeId,
    };

    if (editId) {
      await updateDoc(doc(db, "place", editId), dataToSend);
      setEditId(null);
    } else {
      await addDoc(collection(db, "place"), dataToSend);
    }

    // Reset form
    setCountry("");
    setState("");
    setPlace("");
    setPlaceId("");
    fetchPlace();
  };

  const fetchCountry = async () => {
    const res = await fetchCountryData();
    setCountryList(res);
  };

  const fetchState = async () => {
    const res = await fetchStateData();
    setStateList(res);
  };

  const fetchPlace = async () => {
    const res = await fetchPlaceData();
    setFormData(res);
  };

  useEffect(() => {
    fetchCountry();
    fetchState();
    fetchPlace();
  }, []);

  return (
    <div>
      <p className="text-xl font-semibold mb-8">Manage Place</p>
      <form
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        onSubmit={handleSubmit}
      >
        <Input
          variant="static"
          label="Place Name"
          placeholder="Enter place name"
          value={placeName}
          onChange={(e) => setPlace(e.target.value)}
        />

        <Input
          variant="static"
          label="Zip Code"
          placeholder="Zip code"
          value={placeId}
          onChange={(e) => setPlaceId(e.target.value)}
        />

        <Select
          variant="static"
          label="Select Country"
          value={country}
          onChange={(val) => {
            setCountry(val);
            setState(""); // Reset state on country change
          }}
        >
          {countryList.map((i) => (
            <Option key={i.id} value={i.country}>
              {i.country}
            </Option>
          ))}
        </Select>

        <Select
          variant="static"
          label="Select State"
          value={state}
          onChange={(val) => setState(val)}
          disabled={!country}
        >
          {stateList
            .filter((s) => s.country === country)
            .map((i) => (
              <Option key={i.id} value={i.state}>
                {i.state}
              </Option>
            ))}
        </Select>

        <div className="flex items-end">
          <Button
            size="sm"
            type="submit"
            className="min-w-[142px] w-full text-white"
          >
            {editId ? "Update Place" : "Create Place"}
          </Button>
        </div>
      </form>

      <hr />
      <p className="text-xl font-semibold my-4">Place List</p>

      <div className="grid grid-cols-4 gap-8 my-4">
        {formData?.map((i) => (
          <Card key={i.placeId} flag={i?.image} name={i?.place} />
        ))}
      </div>
    </div>
  );
};

export default ManagePlace;
