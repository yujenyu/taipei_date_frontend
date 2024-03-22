import { FiHeart, FiSend, FiMessageCircle, FiBookmark } from 'react-icons/fi';
import PostCardLarge from '../card/postCardLarge';

export default function Feed() {
  return (
    <>
      <div className="feed flex justify-center items-center min-h-screen">
        <div className="feedWrapper">
          {Array.from({ length: 5 }).map((_, index) => (
            <PostCardLarge />
          ))}
        </div>
      </div>
    </>
  );
}
