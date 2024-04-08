import { useEffect, useState } from 'react';
import Sidebar from '@/components/community/sidebar/sidebar';
import ProfileCard from '@/components/community/card/profileCard';
import TabbarMobile from '@/components/community/tabbar/tabbarMobile';
import ProfileInfo from '@/components/community/profileInfo/profileInfo';

export default function Profile() {
  const [posts, setPosts] = useState([]);

  const getCommunityIndexPost = async () => {
    try {
      const res = await fetch('http://localhost:3001/community/posts');
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch index posts:', error);
    }
  };

  useEffect(() => {
    getCommunityIndexPost();
  }, []);

  return (
    <>
      <title>{'Community - Taipei Date'}</title>

      {/* sidebar for mobile */}
      <div className="block md:hidden">
        <TabbarMobile />
      </div>

      <div className="flex flex-col w-full items-center justify-center sm:w-full pt-28">
        <div className="flex flex-wrap justify-center">
          <div className="hidden md:flex md:w-2/12">
            <Sidebar />
          </div>

          <div className="flex flex-col w-full md:w-10/12 items-center">
            <div className="flex flex-col items-center">
              {/* info area */}
              <ProfileInfo />
              {/* post area */}
              <div className="flex flex-wrap gap-5 justify-center">
                {posts.map((post, i) => (
                  <ProfileCard post={post} key={post.post_id || i} />
                ))}
              </div>
              {/* <div className="md:flex md:flex-wrap md:gap-5 md:justify-center hidden">
                {posts.map((_, index) => (
                  <ProfileCard key={index} />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-5 mx-5 md:hidden">
                {posts.map((_, index) => (
                  <ProfileCard key={index} />
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
