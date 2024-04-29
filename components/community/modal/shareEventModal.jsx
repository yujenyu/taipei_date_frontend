// import { FaRegCircleXmark } from 'react-icons/fa6';
import { useRef } from 'react';
import Swal from 'sweetalert2';

export default function ShareEventModal({ event, eventId, modalId }) {
  const shareEventModalRef = useRef(null);

  const shareUrl = event
    ? `http://localhost:3000/community/event/${eventId}`
    : '';

  // React 複製連結到剪貼板的函數
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        shareEventModalRef.current.close();
        Swal.fire({
          title: '複製連結成功!',
          icon: 'success',
          confirmButtonText: '關閉',
          confirmButtonColor: '#A0FF1F',
          background: 'rgba(0, 0, 0, 0.85)',
        });
      })
      .catch((err) => {
        shareEventModalRef.current.close();
        console.error('無法複製連結: ', err);
        Swal.fire({
          title: '複製連結失敗!',
          icon: 'error',
          confirmButtonText: '關閉',
          confirmButtonColor: '#A0FF1F',
          background: 'rgba(0, 0, 0, 0.85)',
        });
      });
  };

  return (
    <>
      <dialog
        id={modalId}
        ref={shareEventModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div
          className="modal-box sm:w-auto md:w-[500px] h-[300px] "
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
        >
          <p className="font-bold text-lg mb-5 text-h5 flex justify-center">
            分享
          </p>

          <div className="mb-4">
            <input
              type="text"
              className="input input-bordered w-full my-5"
              readOnly
              value={shareUrl}
              onClick={copyToClipboard}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="btn bg-dark border-primary rounded-full text-primary hover:shadow-xl3"
              onClick={copyToClipboard} // 點擊按鈕以複製連結
            >
              複製連結
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
