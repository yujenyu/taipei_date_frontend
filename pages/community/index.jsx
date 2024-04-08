import { useEffect, useState } from 'react';
import SuggestionBar from '@/components/community/suggestionbar/SuggestionBar';
import Sidebar from '@/components/community/sidebar/sidebar';
import TabbarMobile from '@/components/community/tabbar/tabbarMobile';
import PostCardLarge from '@/components/community/card/postCardLarge';

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
      <div className="block md:hidden w-full">
        <TabbarMobile />
      </div>

      <div className="flex flex-col w-full pt-28">
        <div className="flex flex-wrap">
          <div className="hidden md:flex md:basis-3/12">
            <Sidebar />
          </div>
          <div className="flex w-full md:basis-6/12 justify-center">
            <div className="grid grid-cols-1 gap-8 min-h-screen">
              {posts.map((post, i) => (
                <PostCardLarge post={post} key={post.post_id || i} />
              ))}
            </div>
          </div>
          <div className="hidden lg:flex w-full lg:basis-3/12 justify-end pr-10">
            <SuggestionBar />
          </div>
        </div>
      </div>
    </>
  );
}
