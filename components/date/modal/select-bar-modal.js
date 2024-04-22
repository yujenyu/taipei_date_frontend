import { useDate } from '@/context/date-context';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import {
  DATE_GET_BAR_TYPE,
  DATE_EDIT_BAR_TYPE,
} from '@/components/config/api-path';

export default function SelectBarModal() {
  const { toggleBar, setToggleBar } = useDate();
  const { auth, getAuthHeader } = useAuth();

  const [type, setType] = useState([]);
  const [selectedBar, setSelectedBar] = useState(null); // 用來記錄用戶的選項

  const getType = async () => {
    const url = `${DATE_GET_BAR_TYPE}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (Array.isArray(data.data)) {
        setType(data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getType();
  }, []);

  const handleTypeChange = (event, bar) => {
    setSelectedBar(bar); // 更新用戶選項，但不更新 toggleBar
  };

  const handleSubmit = async () => {
    try {
      if (selectedBar) {
        // 如果用戶有選擇選項，則更新toggleBar
        setToggleBar({
          id: selectedBar.bar_type_id,
          name: selectedBar.bar_type_name,
        });

        const sid = auth.id;
        const urlEdit = `${DATE_EDIT_BAR_TYPE}/${sid}`;
        console.log(urlEdit);

        const response = await fetch(urlEdit, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
          },
          body: JSON.stringify({
            bar_type_name: selectedBar.bar_type_name,
          }),
        });
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div>
      <label
        htmlFor="my_modal_6"
        className="min-h-[35px] h-[35px] w-[150px] py-1 my-2 flex items-center justify-center text-black font-bold border-2 rounded-full btn-primary bg-primary border-primary hover:shadow-xl3 cursor-pointer "
      >
        選擇酒吧
      </label>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box flex flex-col h-[450px] w-[350px] gap-4 p-10">
          <p>選擇一種喜歡的酒吧類型</p>
          {type.map((bar) => (
            <div className="form-control" key={bar.bar_type_id}>
              <label
                className="label cursor-pointer"
                htmlFor={`bar_type_${bar.bar_type_id}`}
              >
                <span className="label-text">{bar.bar_type_name}</span>
                <input
                  type="radio"
                  id={`bar_type_${bar.bar_type_id}`}
                  name="bar_type"
                  className="radio checked:bg-neongreen"
                  value={bar.bar_type_id}
                  onChange={(e) => handleTypeChange(e, bar)}
                />
              </label>
            </div>
          ))}
          <label
            className="btn min-h-[30px] h-[30px] w-[250px] border-2 border-primary rounded-full text-primary mt-5"
            htmlFor="my_modal_6"
            onClick={handleSubmit}
          >
            確認
          </label>
        </div>
      </div>
    </div>
  );
}
