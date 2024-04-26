import { useState, useEffect, useRef } from 'react';
import { usePostContext } from '@/context/post-context';
import styles from './modal.module.css';

export default function EditModal({ post, modalId }) {
  const {
    selectedFile,
    previewUrl,
    setPreviewUrl,
    resetAndCloseModal,
    handleFilePicker,
    handlePostUpdate,
    handleFileChange,
    postContent,
    fileInputRef,
    handleKeyPress,
  } = usePostContext();

  const editModalRef = useRef(null);

  const [localPostContext, setLocalPostContext] = useState(postContent);

  const handlePostContentChange = (e) => {
    setLocalPostContext(e.target.value);
  };

  // 監聽 post.post_context 的變化來更新狀態
  useEffect(() => {
    // 更新 textarea 的值
    setLocalPostContext(post.post_context);
  }, [post.post_context]);

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
        ref={editModalRef}
        className="modal modal-bottom sm:modal-middle max-w-full"
      >
        <div
          className="modal-box flex flex-col"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
        >
          <p
            className={`${styles['createModalListItemText']} font-bold text-lg mb-5 text-h5 flex justify-center`}
          >
            編輯貼文
          </p>

          <div className="flex flex-col items-center">
            {selectedFile ? (
              <img
                src={previewUrl}
                alt={post.photo_name || 'No Image Available'}
                className="w-full max-h-full object-cover mb-4"
              />
            ) : (
              <img
                src={post.img || '/unavailable-image.jpg'}
                alt={post.photo_name || 'No Image Available'}
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
            <textarea
              className="textarea textarea-ghost w-full h-32 resize-none my-3"
              placeholder="編輯貼文內容"
              value={localPostContext}
              onChange={handlePostContentChange}
              onKeyDown={(e) =>
                // 使用 onKeyDown 並檢查是否按下 Enter 鍵
                handleKeyPress(e, () =>
                  handlePostUpdate(post, localPostContext, editModalRef)
                )
              }
            />
            <button
              className={`${styles['createModalListItemText']} btn bg-dark border-primary rounded-full text-primary hover:shadow-xl3`}
              onClick={() =>
                handlePostUpdate(post, localPostContext, editModalRef)
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
