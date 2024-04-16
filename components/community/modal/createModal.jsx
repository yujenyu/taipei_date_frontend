import { useState, useEffect, useRef } from 'react';
import { FaPhotoVideo } from 'react-icons/fa';
import styles from './modal.module.css';
import Swal from 'sweetalert2';

export default function CreateModal() {
  // 選中的檔案
  const [selectedFile, setSelectedFile] = useState(null);
  // 預覽圖片(呼叫URL.createObjectURL得到的網址)
  const [previewUrl, setPreviewUrl] = useState('');
  const [postContent, setPostContent] = useState('');
  // 標示貼文是否已創建
  const [postCreated, setPostCreated] = useState(false);
  // 儲存創立貼文後的 post id
  const [postId, setPostId] = useState('');

  const fileInputRef = useRef(null);
  const createModalRef = useRef(null);

  const handlePostContentChange = (e) => {
    setPostContent(e.target.value);
  };

  // 選擇檔案有變動時的處理函式
  const handleFileChange = (e) => {
    // 取得檔案，只取第一個檔案
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // 檔案有變時設定回初始值
      setPreviewUrl('');
    } else {
      setSelectedFile(null);
      // 檔案有變時設定回初始值
      setPreviewUrl('');
    }
  };

  // 重置選取內容並關閉視窗
  const resetAndCloseModal = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    createModalRef.current.close();
  };

  // 上傳貼文
  const handlePostUpload = async () => {
    if (!postContent) {
      Swal.fire('請輸入貼文內容', '', 'warning');
      return;
    }
    try {
      // 用fetch送出檔案
      const res = await fetch('http://localhost:3001/community/create-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // ==================================== TODO TODO TODO ====================================
        body: JSON.stringify({ context: postContent, userId: 1 }), // TODO: 需動態更改 userId
        // ==================================== TODO TODO TODO ====================================
      });
      const data = await res.json();
      if (res.ok) {
        setPostId(data.postId.insertId);
        setPostCreated(true);
        return data.postId.insertId; // 返回 postId 給 handleFileUpload
      } else {
        throw new Error(data.message || '新增貼文失敗');
      }
    } catch (error) {
      console.error('upload post failed:', error);
      createModalRef.current.close();
      Swal.fire({
        title: '分享失敗!',
        icon: 'error',
        confirmButtonText: '關閉',
        confirmButtonColor: '#A0FF1F',
        background: 'rgba(0, 0, 0, 0.85)',
      }).then((result) => {
        if (result.isConfirmed) {
          resetAndCloseModal();
        }
      });
    }
  };

  // 上傳圖片到伺服器
  const handleFileUpload = async () => {
    let currentPostId = postId;

    if (!postCreated) {
      currentPostId = await handlePostUpload();
      // console.log('postId:', currentPostId);
      if (!currentPostId) {
        console.error('No post ID returned');
        return; // 如果新增貼文失敗或沒有 postID 則停止執行
      }
      setPostId(currentPostId);
      setPostCreated(true);
    }

    const fd = new FormData();

    // 對照server上要獲取的檔案名稱(req.files.photo)
    fd.append('photo', selectedFile);
    fd.append('postId', currentPostId);

    try {
      // 用fetch送出檔案
      const res = await fetch('http://localhost:3001/community/upload-photo', {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await res.json();

      // console.log(data);

      // 關閉 create modal
      createModalRef.current.close();
      Swal.fire({
        title: '分享成功!',
        icon: 'success',
        confirmButtonText: '關閉',
        confirmButtonColor: '#A0FF1F',
        background: 'rgba(0, 0, 0, 0.85)',
      }).then((result) => {
        if (result.isConfirmed) {
          resetAndCloseModal();
        }
      });
    } catch (error) {
      console.error('upload failed:', error);
      createModalRef.current.close();
      Swal.fire({
        title: '分享失敗!',
        icon: 'error',
        confirmButtonText: '關閉',
        confirmButtonColor: '#A0FF1F',
        background: 'rgba(0, 0, 0, 0.85)',
      }).then((result) => {
        if (result.isConfirmed) {
          resetAndCloseModal();
        }
      });
    }
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

  // 觸發隱藏的 file input 點擊事件
  const handleFilePicker = () => {
    // 利用 ref 引用來觸發 input 的點擊事件
    fileInputRef.current.click();
  };

  return (
    <>
      <dialog
        id="create_modal"
        ref={createModalRef}
        className="modal modal-bottom sm:modal-middle "
      >
        <div
          className="modal-box w-[500px] h-[500px] flex flex-col"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
        >
          <p
            className={`${styles['createModalListItemText']} font-bold text-lg mb-5 text-h5 flex justify-center`}
          >
            創建新貼文
          </p>

          {!selectedFile && (
            <>
              <div className="flex-grow flex flex-col items-center justify-center">
                <FaPhotoVideo
                  className={`${styles['createModalListItemIcon']} text-6xl mb-4`}
                />
                <p
                  className={`${styles['createModalListItemText']} text-h6 mb-3`}
                >
                  請拖曳照片
                </p>

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
                  className="textarea textarea-ghost w-full h-32 resize-none"
                  placeholder="貼文內容"
                  onChange={handlePostContentChange}
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
