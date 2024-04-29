import { useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/router';
import { usePostContext } from '@/context/post-context';
import { FiSend, FiMoreHorizontal } from 'react-icons/fi';
import EditEventModal from '../../../components/community/modal/editEventModal';
import ShareEventModal from '../../../components/community/modal/shareEventModal';
import TabbarMobile from '@/components/community/tabbar/tabbarMobile';
import Sidebar from '@/components/community/sidebar/sidebar';

export default function Event() {
  const { auth } = useAuth();

  const router = useRouter();

  const { eid } = router.query;

  const {
    getEventPage,
    eventPageCard,
    attendedEvents,
    handleAttendedClick,
    handleDeleteEventClick,
  } = usePostContext();

  const isAttended = attendedEvents[eventPageCard?.comm_event_id] || false;

  const userId = auth.id;

  // 基於 comm_event_id 的唯一 edit modal id
  const editEventModalId = `edit_event_modal_${getEventPage?.comm_event_id}`;

  // 基於 post_id 的唯一 share modal id
  const shareEventModalId = `share_event_modal_${getEventPage?.comm_event_id}`;

  useEffect(() => {
    getEventPage(eid);
  }, [eid]);

  return (
    <>
      <title>{'Community - Taipei Date'}</title>

      {/* sidebar for mobile */}
      <div className="block md:hidden w-full">
        <TabbarMobile />
      </div>

      <div className="flex flex-col w-full items-center justify-center pt-28 ">
        <div className="flex flex-wrap justify-center w-full min-h-screen">
          <div className="hidden md:flex md:w-2/12">
            <Sidebar />
          </div>

          <div className="flex flex-col md:w-10/12 items-center">
            <div className="flex max-w-[80vw] max-h-[80vh] overflow-auto">
              <div className="container flex flex-col md:flex-row">
                <figure className="flex flex-col w-full md:w-1/2 card-photo m-0 ">
                  <img
                    src={eventPageCard.img || '/unavailable-image.jpg'}
                    alt={eventPageCard.photo_name || 'No Image Available'}
                    className="object-contain h-full w-full"
                  />
                </figure>

                <div className="flex flex-col card-body h-full w-full md:w-1/2 overflow-auto px-5">
                  <div className="eventTitle flex flex-row justify-between items-center w-full my-5">
                    <div className="text-h5 font-bold">
                      {eventPageCard.title}
                    </div>

                    {/* 只有當用戶登入時顯示這些元件 */}
                    {userId !== 0 && userId !== null && (
                      <div className="flex justify-end items-center">
                        <FiSend
                          className="card-icon hover:text-neongreen text-h5"
                          onClick={() =>
                            document
                              .getElementById(shareEventModalId)
                              .showModal()
                          }
                        />
                        <div className="dropdown dropdown-end">
                          <div tabIndex={0} className="m-2">
                            <FiMoreHorizontal className="card-icon hover:text-neongreen text-h5" />
                          </div>
                          <ul
                            tabIndex={0}
                            className="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-32"
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
                                onClick={() =>
                                  handleDeleteEventClick(eventPageCard)
                                }
                              >
                                刪除活動
                              </a>
                            </li>
                          </ul>
                        </div>

                        <EditEventModal
                          event={eventPageCard}
                          modalId={editEventModalId}
                          key={eventPageCard.comm_event_id}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row first-letter:card-user h-10 items-center gap-2 justify-between my-10">
                    <div className="flex flex-col justify-start gap-5 my-5">
                      <div className="text-h6">{eventPageCard.description}</div>
                      <div className="text-h6">{eventPageCard.location}</div>
                      <div className="text-h6">
                        {`${eventPageCard.start_date} ${eventPageCard.start_time} - ${eventPageCard.end_date} ${eventPageCard.end_time}`}
                      </div>
                    </div>
                  </div>
                  <div className="context flex mb-10">
                    <p>{eventPageCard.post_context}</p>
                  </div>

                  {/* 只有當用戶登入時顯示這些元件 */}
                  {userId !== 0 && userId !== null && (
                    <div className="flex justify-center my-5 h-auto">
                      <div className="card-iconList text-h4 flex flex-row justify-between mb-5">
                        <div className="card-iconListLeft flex flex-row gap-2">
                          <ShareEventModal
                            event={eventPageCard}
                            key={eventPageCard.post_id}
                            eventId={eventPageCard.comm_event_id}
                            modalId={shareEventModalId}
                          />
                        </div>
                        <div className="card-iconListRight flex justify-end"></div>
                      </div>
                      <div className="flex justify-center items-center my-5 h-auto">
                        <button
                          className="btn bg-dark border-primary rounded-full text-primary hover:shadow-xl3"
                          onClick={() => {
                            handleAttendedClick(eventPageCard);
                          }}
                        >
                          {isAttended ? <span>已參加</span> : <span>參加</span>}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
