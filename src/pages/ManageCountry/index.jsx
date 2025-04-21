import { Button, Input } from '@material-tailwind/react';
import React, { useState } from 'react'
import Card from '../../Components/Card';

const ManageCountry = () => {

  const [country,setCountry] = useState('')
  const [countryCode,setCountryCode] = useState('')
  const [image,setImage] = useState('')
  const [formData,setFormData] = useState([])

  const handleSubmit = (e)=>{
    e.preventDefault()
   setFormData((prev) => [
     ...prev,
     {
       country: country,
       countryCode:countryCode,
       image: image,
     },
   ]);
   setCountry('')
   setImage('')
  }
  

  return (
    <div>
      <p className="text-xl font-semibold mb-8">Manage Country</p>
      <form className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Input
          variant="static"
          label="Country"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <Input
          variant="static"
          label="Country code (ISO alpha-3 code)"
          placeholder="ISO alpha-3 code"
          value={country}
          onChange={(e) => setCountryCode(e.target.value)}
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
          onClick={handleSubmit}
          className="min-w-[142px]  w-full text-white"
        >
          Create State
        </Button>
      </form>
      <hr />
      <p className="text-xl font-semibold my-4">Country list</p>
      <div className="grid grid-cols-4 gap-8 my-4">
        {formData?.map((i) => (
          <Card key={i.country} flag={i?.image} name={i?.country} />
        ))}
      </div>
    </div>
  );
}

export default ManageCountry