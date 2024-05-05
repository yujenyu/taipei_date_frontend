import { useAuth } from '@/context/auth-context';
import { usePostContext } from '@/context/post-context';
import { useState } from 'react';
import { FiSend, FiMoreHorizontal } from 'react-icons/fi';
import ShareEventModal from '../modal/shareEventModal';
import EditEventModal from '../modal/editEventModal';
import styles from './card.module.css';

export default function EventCard({ event }) {
  const { auth } = useAuth();
  const { handleAttendedClick, attendedEvents, handleDeleteEventClick } =
    usePostContext();
  const [isFlipped, setIsFlipped] = useState(false);

  const userId = auth.id;

  // 基於 comm_event_id 的唯一 edit modal id
  const editEventModalId = `edit_event_modal_${event?.comm_event_id}`;

  // 基於 post_id 的唯一 share modal id
  const shareEventModalId = `share_event_modal_${event?.comm_event_id}`;

  const isAttended = attendedEvents[event?.comm_event_id] || false;

  const handleDoubleClick = () => {
    setIsFlipped(!isFlipped);
  };

  // 於前端處理地點顯示
  const formatLocation = (location) => {
    // 檢查 location 是否有足夠長度, 如果沒有直接返回原字串
    return location.length > 6 ? location.substring(0, 6) : location;
  };

  return (
    <>
      <div className={styles['flip-card']} onDoubleClick={handleDoubleClick}>
        <div
          className={`${styles['flip-card-inner']} ${
            isFlipped ? styles.flipped : ''
          }`}
        >
          <div
            className={`${styles['flip-card-front']} eventCard card md:w-[330px] md:h-[480px] flex items-center justify-center border-grayBorder`}
          >
            <figure className="card-photo">
              <img
                src={event.img || '/unavailable-image.jpg'}
                alt={event.photo_name || 'No Image Available'}
                className="card-photo w-[330px] h-[330px] object-cover rounded-2xl"
                loading="lazy"
              />
            </figure>
            <div className="card-body h-auto w-[330px] p-0 overflow-auto flex flex-col justify-between">
              <div className="card-info text-h4 flex flex-col justify-between">
                <div className="flex flex-row justify-between items-start">
                  <div className="card-infoLeft flex flex-row gap-2 px-1 py-1">
                    <div className="flex flex-col gap-3">
                      <p className="text-h5 font-bold">{event.title}</p>
                      <p className="text-h6">
                        {formatLocation(event.location)}
                      </p>
                      <p className="text-h6">
                        {`${event.start_date} ${event.start_time}`}
                      </p>
                    </div>
                  </div>

                  <div className="card-iconListRight flex justify-end items-center px-1 py-1 ">
                    <FiSend
                      className="card-icon hover:text-neongreen"
                      onClick={() =>
                        document.getElementById(shareEventModalId).showModal()
                      }
                    />
                    <ShareEventModal
                      event={event}
                      key={event.post_id}
                      eventId={event.comm_event_id}
                      modalId={shareEventModalId}
                    />
                    {userId === event.user_id ? (
                      <div className="dropdown dropdown-end">
                        <div tabIndex={0} className="m-2">
                          <FiMoreHorizontal className="card-icon hover:text-neongreen" />
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
                          style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.85)',
                          }}
                        >
                          <li>
                            <a
                              className="hover:text-neongreen"
                              onClick={() =>
                                document
                                  .getElementById(editEventModalId)
                                  .showModal()
                              }
                            >
                              編輯活動
                            </a>
                          </li>
                          <li>
                            <a
                              className="hover:text-neongreen"
                              onClick={() => handleDeleteEventClick(event)}
                            >
                              刪除活動
                            </a>
                          </li>
                        </ul>
                      </div>
                    ) : null}
                    <EditEventModal
                      event={event}
                      modalId={editEventModalId}
                      key={event.comm_event_id}
                    />
                  </div>
                </div>
              </div>
              {userId !== 0 && userId !== null && (
                <div className="card-actions flex justify-center px-1 py-1 ">
                  <button
                    className="btn bg-dark border-primary rounded-full text-primary hover:shadow-xl3"
                    onClick={() => handleAttendedClick(event)}
                  >
                    {isAttended ? <span>已參加</span> : <span>參加</span>}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className={`${styles['flip-card-back']} flex flex-col gap-5`}>
            <p className="text-h5 font-bold">{event.title}</p>
            <p className="text-h6">{event.description}</p>
            <p className="text-h6">{event.location}</p>
            <p className="text-h6">
              {`${event.start_date} ${event.start_time} - ${event.end_date} ${event.end_time}`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
