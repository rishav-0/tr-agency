import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, { useState } from "react";
import Card from "../../Components/Card";
import PlaceTable from "../../Components/PlaceTable";


const ManagePlace = () => {

    const countrlist = ["India", "UAE", "USA", "UK"];
    const statelist = ['Assam','Meghalaya','UP','MP']

  const [placeName, setPlaceName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [stateName, setStateName] = useState("");
  const [formData, setFormData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData((prev) => [
      ...prev,
      {
        placeName,
        countryName,
        placeId,
        stateName,
      },
    ]);

    // Reset form
    setPlaceName("");
   setPlaceId('');
    setCountryName("");
    setStateName("");
  };

  console.log(formData);

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
          onChange={(e) => setPlaceName(e.target.value)}
        />
        <Input
          variant="static"
          label="Place Code"
          placeholder="Pin code"
          value={placeId}
          onChange={(e) => setPlaceId(e.target.value)}
        />
        <Select
          variant="static"
          label="Select Country"
          onChange={(val) => setCountryName(val)}
        >
          {countrlist.map((i) => (
            <Option key={i} value={i}>
              {i}
            </Option>
          ))}
        </Select>
        <Select
          variant="static"
          label="Select State"
          onChange={(val) => setStateName(val)}
        >
          {statelist.map((i) => (
            <Option key={i} value={i}>
              {i}
            </Option>
          ))}
        </Select>

        <div className="flex items-end">
          <Button
            size="sm"
            type="submit"
            className="min-w-[142px] w-full text-white"
          >
            Create Place
          </Button>
        </div>
      </form>

      <hr />
      <p className="text-xl font-semibold my-4">Place List</p>

      <PlaceTable data={formData} />
    </div>
  );
};

export default ManagePlace;
