import Link from 'next/link';
import CreateModalMobile from '../modal/createModalMobile';
import SearchModalMobile from '../modal/searchModalMobile';

export default function TabbarMobile() {
  return (
    <>
      {/* <div
        role="tablist"
        className="tabs tabs-bordered md:hidden z-40 bg-dark fixed top-[64px] h-8 w-full mb-3 flex flex-row justify-between"
      >
        <Link role="tab" className="tab" href="/community">
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="首頁"
            checked
          />
          
        </Link>
        <div role="tabpanel" className="tab-content p-10"></div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="搜尋"
          onClick={() =>
            document.getElementById('search_modal_mobile').showModal()
          }
        />
        <SearchModalMobile />
        <div role="tabpanel" className="tab-content p-10"></div>

        <Link role="tab" className="tab" href="/community/explore">
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="探索"
          />
        
        </Link>
        <div role="tabpanel" className="tab-content p-10"></div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="建立"
          onClick={() =>
            document.getElementById('create_modal_mobile').showModal()
          }
        />
        <CreateModalMobile />
        <div role="tabpanel" className="tab-content p-10"></div>

        <Link role="tab" className="tab" href="/community/events">
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="活動"
          />
        </Link>
        <div role="tabpanel" className="tab-content p-10"></div>

        <Link role="tab" className="tab" href="/community/profile">
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="個人"
          />
        </Link>
        <div role="tabpanel" className="tab-content p-10"></div>
      </div> */}

      <div
        role="tablist"
        className="tabs tabs-bordered md:hidden z-40 bg-dark fixed top-16 w-full h-8"
      >
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
          <span>搜尋</span>
          <SearchModalMobile />
        </a>
        <Link role="tab" className="tab" href="/community/explore">
          <span>探索</span>
        </Link>
        <a
          role="tab"
          className="tab"
          onClick={() =>
            document.getElementById('create_modal_mobile').showModal()
          }
        >
          <span>建立</span>
          <CreateModalMobile />
        </a>
        <Link role="tab" className="tab" href="/community/events">
          <span>活動</span>
        </Link>
        <Link role="tab" className="tab" href="/community/profile">
          <span>個人</span>
        </Link>
      </div>
    </>
  );
}
