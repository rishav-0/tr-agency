import React from 'react'

const Card = ({flag,name,conutry,onEdit }) => {
  return (
    <div className="border p-4 min-w-48 rounded-xl flex items-center gap-4">
      {flag && <img className="w-8 max-w-8" src={flag} alt="" />}
      <div className="flex gap-4 items-center  w-full justify-between">
        {conutry && <p className="text-sm font-semibold">{conutry}</p>}
        <p className="text-sm font-semibold">{name}</p>
        <i className="fas fa-pen cursor-pointer" onClick={onEdit}></i>
      </div>
    </div>
  );
}

export default Card