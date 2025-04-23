import React from 'react'

const PlaceTable = ({data}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-4">
      {formData.map((item) => (
        <Card
          key={item.id}
          country={item.countryName}
          name={item.placeName}
          extraInfo={`State: ${item.stateName}`}
        />
      ))}
    </div>
  );
}

export default PlaceTable