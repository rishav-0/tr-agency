import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, { useState } from "react";
import Card from "../../Components/Card";
import Table from "../../Components/Table";

const ManageState = () => {
  const countrlist = ["India", "UAE", "USA", "UK"];

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [statCode, setStateCode] = useState('')
  const [formData, setFormData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData((prev) => [
      ...prev,
      {
        country: country,
        state: state,
        statCode:statCode
      },
    ]);
    setCountry("");
    setState("");
  };

  console.log(formData, "data");

  return (
    <div>
      <p className="text-xl font-semibold mb-8">Manage State</p>
      <form className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Select
          variant="static"
          label="Select Version"
          onChange={(val) => setCountry(val)}
        >
          {countrlist.map((i) => (
            <Option key={i} value={i}>
              {i}
            </Option>
          ))}
        </Select>

        <Input
          variant="static"
          label="State"
          placeholder="State"
          onChange={(e) => setState(e.target.value)}
        />
        <Input
          variant="static"
          label="State Code"
          placeholder="State code"
          onChange={(e) => setStateCode(e.target.value)}
        />
        <Button
          size="sm"
          onClick={handleSubmit}
          className="min-w-[142px]  w-full text-white"
        >
          Create State
        </Button>
      </form>
      <hr />
      <p className="text-xl font-semibold my-4">State list</p>

      <Table data={formData} />
    </div>
  );
};

export default ManageState;
