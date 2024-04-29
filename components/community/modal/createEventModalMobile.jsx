import { useEffect } from 'react';
import { usePostContext } from '@/context/post-context';
import { FaPhotoVideo } from 'react-icons/fa';
import styles from './modal.module.css';

export default function CreateEventModalMobile() {
  const {
    selectedFile,
    previewUrl,
    setPreviewUrl,
    setEventDetails,
    fileInputRef,
    handleFileChange,
    resetAndCloseModal,
    handleEventFileUpload,
    handleFilePicker,
    handleDateFocus,
    handleBlur,
    handleTimeFocus,
    minDate,
    setMinDate,
    minEndDate,
    setMinEndDate,
    createEventModalMobileRef,
  } = usePostContext();

  const handleEventContentChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
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
        id="create_event_modal_mobile"
        ref={createEventModalMobileRef}
        className="modal modal-bottom sm:modal-middle "
      >
        <div
          className="modal-box flex flex-col"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
        >
          <p
            className={`${styles['createModalListItemText']} font-bold text-lg mb-5 text-h5 flex justify-center`}
          >
            創建新活動
          </p>

          {!selectedFile && (
            <>
              <div className="flex-grow flex flex-col items-center justify-center">
                <FaPhotoVideo
                  className={`${styles['createModalListItemIcon']} text-6xl mb-4`}
                />

                <button
                  onClick={handleFilePicker}
                  htmlFor="photo-upload"
                  className={`${styles['createModalListItemText']} btn bg-dark border-primary rounded-full text-primary hover:shadow-xl3 cursor-pointer flex justify-center`}
                >
                  從圖庫瀏覽
                </button>
                <input
                  id="photo-upload"
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </>
          )}
          {selectedFile && (
            <>
              <div className="flex flex-col items-center gap-2">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full max-h-full object-cover mb-4"
                />
                <div className="flex flex-col inputFrom w-full gap-2">
                  <label className="input input-bordered flex items-center rounded-full">
                    <input
                      type="text"
                      className="grow"
                      name="title"
                      placeholder="活動名稱"
                      onChange={handleEventContentChange}
                    />
                  </label>
                  <label className="input input-bordered flex items-center rounded-full">
                    <input
                      type="text"
                      className="grow"
                      name="description"
                      placeholder="活動描述"
                      onChange={handleEventContentChange}
                    />
                  </label>
                  <label className="input input-bordered flex items-center rounded-full">
                    <input
                      type="text"
                      className="grow"
                      name="location"
                      placeholder="活動地點"
                      onChange={handleEventContentChange}
                    />
                  </label>
                  <div className="flex w-full justify-between">
                    <label className="input input-bordered flex items-center rounded-full w-1/2">
                      <input
                        type="text"
                        name="startDate"
                        min={minDate}
                        placeholder="開始日期"
                        onFocus={handleDateFocus}
                        onBlur={handleBlur}
                        className="grow"
                        onChange={handleEventContentChange}
                      />
                    </label>
                    <label className="input input-bordered flex items-center rounded-full w-1/2">
                      <input
                        type="text"
                        name="startTime"
                        placeholder="開始時間"
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
                        type="text"
                        name="endDate"
                        min={minEndDate}
                        placeholder="結束日期"
                        onFocus={handleDateFocus}
                        onBlur={handleBlur}
                        className="grow"
                        onChange={handleEventContentChange}
                      />
                    </label>
                    <label className="input input-bordered flex items-center rounded-full w-1/2">
                      <input
                        type="text"
                        name="endTime"
                        placeholder="結束時間"
                        onFocus={handleTimeFocus}
                        onBlur={handleBlur}
                        className="grow"
                        onChange={handleEventContentChange}
                      />
                    </label>
                  </div>
                </div>

                <button
                  className={`${styles['createModalListItemText']} btn bg-dark border-primary rounded-full text-primary hover:shadow-xl3`}
                  onClick={handleEventFileUpload}
                >
                  分享
                </button>
              </div>
            </>
          )}
        </div>

        <form method="dialog" className="modal-backdrop">
          <button onClick={resetAndCloseModal}>close</button>
        </form>
      </dialog>
    </>
  );
}
