import { useEffect } from 'react';
import { usePostContext } from '@/context/post-context';
import { FaPhotoVideo } from 'react-icons/fa';
import styles from './modal.module.css';

export default function CreateModalMobile() {
  const {
    selectedFile,
    previewUrl,
    setPreviewUrl,
    setPostContent,
    handleFileChange,
    resetAndCloseModal,
    handleFilePicker,
    handleFileUpload,
    fileInputRef,
    handleKeyPress,
    createModalMobileRef,
  } = usePostContext();

  const handlePostContentChange = (e) => {
    setPostContent(e.target.value);
  };

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
        id="create_modal_mobile"
        ref={createModalMobileRef}
        className="modal modal-bottom sm:modal-middle max-w-full"
      >
        <div
          className="modal-box flex flex-col"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
        >
          <p
            className={`${styles['createModalListItemText']} font-bold text-lg mb-5 text-h5 flex justify-center`}
          >
            創建新貼文
          </p>

          {!selectedFile && (
            <>
              <div className="flex-grow flex flex-col items-center justify-center ">
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
              <div className="flex flex-col items-center">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full max-h-full object-cover mb-4"
                />
                <textarea
                  className="textarea textarea-ghost w-full h-32 resize-none my-3"
                  placeholder="貼文內容"
                  onChange={handlePostContentChange}
                  onKeyDown={(e) =>
                    // 使用 onKeyDown 並檢查是否按下 Enter 鍵
                    handleKeyPress(e, () => handleFileUpload())
                  }
                />
                <button
                  className={`${styles['createModalListItemText']} btn bg-dark border-primary rounded-full text-primary hover:shadow-xl3`}
                  onClick={handleFileUpload}
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
