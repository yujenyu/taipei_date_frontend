import { useEffect, useState } from 'react';
import PostCardMedium from '@/components/community/card/postCardMedium';
import Sidebar from '@/components/community/sidebar/sidebar';
import TabbarMobile from '@/components/community/tabbar/tabbarMobile';

export default function Index() {
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

      <div className="flex pt-28 items-center justify-center">
        <div className="flex flex-row items-center justify-center ">
          <div className="hidden md:flex md:w-2/12">
            <Sidebar />
          </div>
          <div className="flex flex-wrap md:w-10/12 gap-5 justify-center">
            <div className="flex flex-wrap gap-5 justify-center">
              {posts.map((post, i) => (
                <PostCardMedium post={post} key={post.post_id || i} />
              ))}
            </div>
            {/* <div className="md:flex md:flex-wrap md:gap-5 md:justify-center hidden">
              {posts.map((_, index) => (
                <PostCardMedium key={index} />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-5 mx-5 md:hidden">
              {posts.map((_, index) => (
                <PostCardMedium key={index} />
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
