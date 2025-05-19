import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as PropType from "prop-types";
import { Link } from "react-router-dom";

export function ThreadsSidebar() {
  const { data } = useQuery({
    queryKey: ["threads/all"],
    queryFn: async () => {
      return await axios.get("/api/threads").then((res) => res.data);
    },
  });

  return (
    <aside className="hidden flex-col w-56 md:flex bg-gray-700 text-white rounded-lg shadow-md p-3">
      {data?.subscribed.length !== 0 && (
        <>
          <div className="flex flex-col mt-2 space-y-4">
            <div className="flex justify-between w-full cursor-pointer">
              <h2 className="font-semibold uppercase">Subscribed</h2>
              <span className="pr-1 text-sm">ALL</span>
            </div>
            <SideBarComponent threadList={data?.subscribed} />
          </div>
          <hr className="my-4 border-gray-600" />
        </>
      )}
      <div className="flex flex-col mt-2 space-y-4">
        <div className="flex justify-between w-full cursor-pointer">
          <h2 className="font-semibold uppercase">Top Threads</h2>
          <span className="pr-1 text-sm">ALL</span>
        </div>
        <SideBarComponent threadList={data?.all} />
      </div>
      <hr className="my-4 border-gray-600" />
      <div className="flex flex-col mt-2 space-y-4">
        <div className="flex justify-between w-full cursor-pointer">
          <h2 className="font-semibold uppercase">Popular Threads</h2>
          <span className="pr-1 text-sm">ALL</span>
        </div>
        <SideBarComponent threadList={data?.popular} />
      </div>
    </aside>
  );
}

SideBarComponent.propTypes = {
  threadList: PropType.array,
};

function SideBarComponent({ threadList }) {
  return (
    <div className="flex flex-col space-y-3 w-full list-none">
      {threadList?.slice(0, 10).map((thread) => (
        <Link
          to={`/${thread.name}`}
          className="flex justify-between items-center w-full px-2 py-1 transition-colors duration-150 rounded-md hover:bg-gray-600"
          key={thread.name}
        >
          <div className={`flex items-center space-x-3 ${!thread.logo && "pl-9"}`}>
            {thread.logo && (
              <img
                loading="lazy"
                src={thread.logo}
                alt=""
                className="object-cover w-6 h-6 rounded-full"
              />
            )}
            <span className="truncate">{thread.name}</span>
          </div>
          <span className="p-1 px-2 text-sm font-semibold rounded bg-gray-500 text-white">
            {thread.subscriberCount > 9 ? thread.subscriberCount : `0${thread.subscriberCount}`}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default ThreadsSidebar;
