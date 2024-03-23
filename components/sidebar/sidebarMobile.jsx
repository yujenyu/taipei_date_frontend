import Link from 'next/link';
import CreateModalMobile from '../modal/createModalMobile';
import SearchModalMobile from '../modal/searchModalMobile';

export default function SidebarMobile() {
  return (
    <>
      <div role="tablist" className="tabs tabs-bordered md:hidden">
        <Link role="tab" className="tab tab-active" href="/community">
          <span>首頁</span>
        </Link>
        <a
          role="tab"
          className="tab"
          onClick={() =>
            document.getElementById('search_modal_mobile').showModal()
          }
        >
          搜尋
          <SearchModalMobile />
        </a>
        <Link role="tab" className="tab" href="/community/explore">
          探索
        </Link>
        <a
          role="tab"
          className="tab"
          onClick={() =>
            document.getElementById('create_modal_mobile').showModal()
          }
        >
          建立
          <CreateModalMobile />
        </a>
        <Link role="tab" className="tab" href="/community/events">
          活動
        </Link>
        <Link role="tab" className="tab" href="/community/profile">
          個人檔案
        </Link>
      </div>
    </>
  );
}
