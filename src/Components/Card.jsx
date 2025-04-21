import React from 'react'

const Card = ({flag,name,conutry}) => {
  return (
    <div className="border p-4 rounded-xl flex items-center gap-4">
      {flag && <img className="w-8 max-w-8" src={flag} alt="" />}
      <div className="">
        {conutry && <p className="text-sm font-semibold">{conutry}</p>}
        <p className="text-sm font-semibold">{name}</p>
      </div>
    </div>
  );
}

export default Card