import { useState, useEffect, useRef } from 'react';
import { usePostContext } from '@/context/post-context';
import styles from './modal.module.css';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export default function EditEventModal({ event, modalId }) {
  const {
    selectedFile,
    previewUrl,
    setPreviewUrl,
    resetAndCloseModal,
    handleFilePicker,
    handleEventUpdate,
    handleFileChange,
    fileInputRef,
    handleDateFocus,
    handleBlur,
    handleTimeFocus,
    minDate,
    setMinDate,
    minEndDate,
    setMinEndDate,
  } = usePostContext();

  const editEventModalRef = useRef(null);

  const [localEventDetails, setLocalEventDetails] = useState({
    title: event?.title || '',
    description: event?.description || '',
    location: event?.location || '',
    startDate: event?.start_date || '',
    startTime: event?.start_time || '',
    endDate: event?.end_date || '',
    endTime: event?.end_time || '',
  });

  const handleEventContentChange = (e) => {
    const { name, value } = e.target;
    setLocalEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    // 更新最早结束日期
    if (name === 'startDate') {
      setMinEndDate(value);
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);
    setMinEndDate(minDate);
  }, []);

  // 監聽 event 的變化來更新狀態
  useEffect(() => {
    if (event) {
      // 將後端送來呈現在卡片的資料再轉換成前端可讀取的資料
      const formattedStartDate = dayjs(
        event.start_date,
        'YYYY年 MM月DD日'
      ).isValid()
        ? dayjs(event.start_date, 'YYYY年 MM月DD日').format('YYYY-MM-DD')
        : '';
      const formattedEndDate = dayjs(
        event.end_date,
        'YYYY年 MM月DD日'
      ).isValid()
        ? dayjs(event.end_date, 'YYYY年 MM月DD日').format('YYYY-MM-DD')
        : '';

      // console.log(localEventDetails);

      setLocalEventDetails((prev) => ({
        ...prev,
        title: event.title || '',
        description: event.description || '',
        location: event.location || '',
        startDate: formattedStartDate,
        startTime: event.start_time || '',
        endDate: formattedEndDate,
        endTime: event.end_time || '',
      }));
    }
  }, [event]);

  // 當選擇檔案時，建立預覽圖的網址。使用的是狀態連鎖更動的樣式 A狀態 -> B狀態
  useEffect(() => {
    // 當沒有選中檔案時
    if (!selectedFile) {
      setPreviewUrl('');
      return;
    }

    // 當有選中檔案時
    // 透過URL.createObjectURL()得到預覽圖片的網址
    const objectUrl = URL.createObjectURL(selectedFile);
    //console.log(objectUrl)
    // 設定預覽圖片的網址
    setPreviewUrl(objectUrl);

    // 當元件從真實DOM被移出時
    return () => {
      // 註銷剛建立的ObjectURL(快取)
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);
  // ^^^^^^^^^^^^^^ 這裡代表只有在selectedFile有變動(之後)才會執行

  return (
    <>
      <dialog
        id={modalId}
        ref={editEventModalRef}
        className="modal modal-bottom sm:modal-middle max-w-full"
      >
        <div
          className="modal-box flex flex-col"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
        >
          <p
            className={`${styles['createModalListItemText']} font-bold text-lg mb-5 text-h5 flex justify-center`}
          >
            編輯活動
          </p>

          <div className="flex flex-col items-center">
            {selectedFile ? (
              <img
                src={previewUrl}
                alt={event.photo_name || 'No Image Available'}
                className="w-full max-h-full object-cover mb-4 cursor-pointer"
                onClick={handleFilePicker}
              />
            ) : (
              <img
                src={event.img || '/unavailable-image.jpg'}
                alt={event.photo_name || 'No Image Available'}
                className="w-full max-h-full object-cover mb-4 cursor-pointer"
                onClick={handleFilePicker}
              />
            )}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <p
              className={`${styles['createModalListItemText']} font-bold  mb-5 text-[12px] flex justify-center`}
            >
              點擊照片編輯
            </p>

            <div className="flex flex-col inputFrom w-full gap-2">
              <label className="input input-bordered flex items-center rounded-full">
                <input
                  type="text"
                  className="grow"
                  name="title"
                  placeholder="活動名稱"
                  value={localEventDetails.title}
                  onChange={handleEventContentChange}
                />
              </label>
              <label className="input input-bordered flex items-center rounded-full">
                <input
                  type="text"
                  className="grow"
                  name="description"
                  placeholder="活動描述"
                  value={localEventDetails.description}
                  onChange={handleEventContentChange}
                />
              </label>
              <label className="input input-bordered flex items-center rounded-full">
                <input
                  type="text"
                  className="grow"
                  name="location"
                  placeholder="活動地點"
                  value={localEventDetails.location}
                  onChange={handleEventContentChange}
                />
              </label>
              <div className="flex w-full justify-between">
                <label className="input input-bordered flex items-center rounded-full w-1/2">
                  <input
                    type="date"
                    name="startDate"
                    min={minDate}
                    placeholder="開始日期"
                    value={localEventDetails.startDate}
                    className="grow"
                    onChange={handleEventContentChange}
                  />
                </label>
                <label className="input input-bordered flex items-center rounded-full w-1/2">
                  <input
                    type="time"
                    name="startTime"
                    placeholder="開始時間"
                    value={localEventDetails.startTime}
                    onFocus={handleTimeFocus}
                    onBlur={handleBlur}
                    className="grow"
                    onChange={handleEventContentChange}
                  />
                </label>
              </div>

              <div className="flex w-full justify-between">
                <label className="input input-bordered flex items-center rounded-full w-1/2">
                  <input
                    type="date"
                    name="endDate"
                    min={minEndDate}
                    placeholder="結束日期"
                    value={localEventDetails.endDate}
                    onFocus={handleDateFocus}
                    onBlur={handleBlur}
                    className="grow"
                    onChange={handleEventContentChange}
                  />
                </label>
                <label className="input input-bordered flex items-center rounded-full w-1/2">
                  <input
                    type="time"
                    name="endTime"
                    placeholder="結束時間"
                    value={localEventDetails.endTime}
                    onFocus={handleTimeFocus}
                    onBlur={handleBlur}
                    className="grow"
                    onChange={handleEventContentChange}
                  />
                </label>
              </div>
            </div>

            <button
              className={`${styles['createModalListItemText']} btn bg-dark border-primary rounded-full text-primary hover:shadow-xl3 my-3`}
              onClick={() =>
                handleEventUpdate(event, localEventDetails, editEventModalRef)
              }
            >
              完成
            </button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button onClick={resetAndCloseModal}>close</button>
        </form>
      </dialog>
    </>
  );
}
