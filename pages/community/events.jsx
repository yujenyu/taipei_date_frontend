import { useEffect, useState } from 'react';
import EventCard from '@/components/community/card/eventCard';
import Sidebar from '@/components/community/sidebar/sidebar';
import TabbarMobile from '@/components/community/tabbar/tabbarMobile';

export default function Index() {
  const [events, setEvents] = useState([]);

  const getCommetEvents = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/comm-events');
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  useEffect(() => {
    getCommetEvents();
  }, []);

  return (
    <>
      <title>{'Community - Taipei Date'}</title>

      <div className="flex md:hidden">
        <TabbarMobile />
      </div>
      <div className="flex pt-28 items-center justify-center">
        <div className="flex flex-row items-center justify-center">
          <div className="hidden md:flex md:w-2/12">
            <Sidebar />
          </div>
          <div className="flex md:w-10/12 flex-wrap gap-5 justify-center">
            {events.map((event, i) => (
              <EventCard event={event} key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
