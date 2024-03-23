import { useState, useEffect } from 'react';
import { FaRegPlusSquare } from 'react-icons/fa';

export default function CreateModal() {
  // 選中的檔案
  const [selectedFile, setSelectedFile] = useState(null);
  // 預覽圖片(呼叫URL.createObjectURL得到的網址)
  const [previewUrl, setPreviewUrl] = useState('');

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

  // 上傳到伺服器
  const handleFileUpload = async () => {
    const fd = new FormData();

    // 對照server上要獲取的檔案名稱(req.files.photo)
    fd.append('photo', selectedFile);

    // 用fetch送出檔案
    const res = await fetch('http://localhost:5555/upload-photo', {
      method: 'POST',
      body: fd,
    });

    const data = await res.json();

    console.log(data);
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

  //

  return (
    <>
      <dialog
        id="create_modal_mobile"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box w-[500px] h-[500px] flex flex-col">
          <p className="font-bold text-lg mb-5 text-h5 flex justify-center">
            創建新貼文
          </p>

          {!previewUrl && (
            <>
              <div className="flex-grow flex flex-col items-center justify-center">
                <p className="text-h6 mb-3">請拖曳照片</p>
                <FaRegPlusSquare className="text-8xl mb-4" />

                <label
                  htmlFor="photo-upload"
                  className="btn bg-neongreen hover:bg-neongreen text-light cursor-pointer flex justify-center"
                >
                  從電腦瀏覽
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </>
          )}
          {previewUrl && (
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
                />
                <button
                  className="btn bg-neongreen hover:bg-neongreen text-light"
                  onClick={handleFileUpload}
                >
                  分享
                </button>
              </div>
            </>
          )}
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
