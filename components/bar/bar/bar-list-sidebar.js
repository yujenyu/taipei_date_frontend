import React, { useEffect, useState } from 'react';

export default function BarListSidebar({ onAreaSelected, onTypeSelected }) {
  const [areas, setAreas] = useState([]); // 存儲從API獲取的地區數據
  const [types, setTypes] = useState([]); // 存儲從API獲取的類型數據

  // 依照 sql 出現下拉式選單項目
  useEffect(() => {
    // 使用 Promise.all 來並行加載地區和類型數據
    Promise.all([
      fetch('http://localhost:3001/bar/bar-area'),
      fetch('http://localhost:3001/bar/bar-type'),
    ])
      .then(([areaResponse, typeResponse]) => {
        if (!areaResponse.ok) throw new Error('Failed to load areas');
        if (!typeResponse.ok) throw new Error('Failed to load types');
        return Promise.all([areaResponse.json(), typeResponse.json()]);
      })
      .then(([areaData, typeData]) => {
        setAreas(areaData);
        setTypes(typeData);
      })
      .catch((error) => console.error('Error loading data:', error));
  }, []);

  const handleAreaChange = (event) => {
    onAreaSelected(event.target.value);
  };

  const handleTypeChange = (event) => {
    onTypeSelected(event.target.value);
  };

  return (
    <div className="lg:basis-2/12 flex flex-col gap-4">
      <select
        className="select select-bordered select-sm w-[139px] rounded-xl border-white bg-transparent hover:border-[#A0FF1F] text-white"
        onChange={(e) => onAreaSelected(e.target.value)}
        defaultValue=""
      >
        <option disabled value="">
          酒吧區域
        </option>
        {areas.map((area) => (
          <option key={area.bar_area_id} value={area.bar_area_id}>
            {area.bar_area_name}
          </option>
        ))}
      </select>
      <select
        className="select select-bordered select-sm w-[139px] rounded-xl border-white bg-transparent hover:border-[#A0FF1F] text-white"
        onChange={(e) => onTypeSelected(e.target.value)}
        defaultValue=""
      >
        <option disabled value="">
          酒吧種類
        </option>
        {types.map((type) => (
          <option key={type.bar_type_id} value={type.bar_type_id}>
            {type.bar_type_name}
          </option>
        ))}
      </select>
    </div>
  );
}
