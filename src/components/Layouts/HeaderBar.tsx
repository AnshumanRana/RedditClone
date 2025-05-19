// "use client";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import SearchBar from "./SearchBar";
// import { useSession, signOut } from "next-auth/react";
// import React, { useRef, useState } from "react";
// import useClickOutside from "@/hooks/useClickOutside";
// import LoadingSpinner from "../Common/LoadingSpinner";
// import { useModal } from "@/context/ModalContext";

// const HeaderBar = () => {
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const [isLoggingOut, setIsLoggingOut] = useState(false);
//   const userMenuRef = useRef<HTMLDivElement>(null);
//   const { communityName } = useParams();
//   const { openAuthModal } = useModal();

//   const { data: session, status } = useSession();
//   const user = session?.user;

//   useClickOutside(userMenuRef, () => {
//     setIsUserMenuOpen(false);
//   });

//   const toggleUserMenu = () => {
//     setIsUserMenuOpen((prev) => !prev);
//   };

//   const handleLogout = async () => {
//     if (isLoggingOut) return;
//     setIsLoggingOut(true);
//     try {
//       await signOut({ redirect: false });
//     } catch (error) {
//       console.error("Sign-out error:", error);
//     } finally {
//       setIsLoggingOut(false);
//     }
//   };

//   return (
//     <div className="w-[100%] h-[60px] flex items-center border-b border-[#212121]">
//       <div className="aspect-square h-[100%]"></div>
//       <div className="flex-1 h-[100%] flex justify-end items-center px-[10px]">
//         <div className="flex-1 h-[100%] flex items-center justify-end">
//           <SearchBar />
//         </div>

//         {user?.id && (
//           <Link
//             href={`${
//               communityName ? `/home/r/${communityName}/submit` : `/home/submit`
//             }`}
//             className="h-[100%] aspect-[1/2] flex items-center justify-center p-[5px]"
//           >
//             <Icon icon="majesticons:plus" width="20" height="20" />
//           </Link>
//         )}

//         {status === "authenticated" ? (
//           <div className="h-[100%] w-auto flex items-center justify-center">
//             <div className="w-[20px] h-[100%] flex items-center justify-center">
//               <Icon
//                 onClick={toggleUserMenu}
//                 icon="famicons:chevron-down"
//                 className="w-[15px] h-[15px] text-[#5a5d79] cursor-pointer"
//               />
//             </div>
//             <div className="h-[70%] aspect-[1/1] bg-gray-300/10 border border-[#5b5b5b] rounded-full p-[3px]">
//               <div className="w-[100%] h-[100%]  rounded-full border border-[#5b5b5b] bg-gray-300/20 flex items-center justify-center">
//                 {
//                   <p className="text-sm font-medium">
//                     {user?.username[0].toUpperCase()}
//                   </p>
//                 }
//               </div>
//             </div>

//             {/* user menu */}
//             {isUserMenuOpen && (
//               <div
//                 ref={userMenuRef}
//                 className="absolute w-[200px] h-[auto] flex right-[20px] top-[63px] p-[5px] border border-[#212121] rounded bg-black shadow-[0px_3px_5px_rgba(0,0,0,0.04)] z-2"
//               >
//                 <div className="w-[100%] h-[100%]">
//                   <div className="w-[100%] h-[50px] flex flex-col justify-center bg-gray-300/10 px-[10px] rounded border border-black/10">
//                     <p className="text-sm font-medium">{user?.username}</p>
//                     <p className="text-xs font-normal text-[#9199A3]">
//                       {user?.email}
//                     </p>
//                   </div>
//                   <button
//                     onClick={handleLogout}
//                     className="w-[100%] h-[40px] flex justify-center px-[10px] mt-[5px] cursor-pointer"
//                   >
//                     <div className="h-[100%] w-auto flex items-center justify-center mr-[5px]">
//                       {isLoggingOut ? (
//                         <div className="h-[50%] aspect-square flex items-center justify-center">
//                           <LoadingSpinner color="white" />
//                         </div>
//                       ) : (
//                         <Icon
//                           icon="hugeicons:logout-square-01"
//                           className="w-[15px] h-[15px] text-[#5a5d79]"
//                         />
//                       )}
//                     </div>
//                     <div className="flex-1 h-[100%] flex items-center text-sm">
//                       Sign out
//                     </div>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : (
//           <button
//             onClick={() => openAuthModal()}
//             className="h-[60%] px-4 flex items-center justify-center bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
//           >
//             Sign In
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HeaderBar;

"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useParams } from "next/navigation";
import SearchBar from "./SearchBar";
import { useSession, signOut } from "next-auth/react";
import React, { useRef, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import LoadingSpinner from "../Common/LoadingSpinner";
import { useModal } from "@/context/ModalContext";

const HeaderBar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { communityName } = useParams();
  const { openAuthModal } = useModal();

  const { data: session, status } = useSession();
  const user = session?.user;

  useClickOutside(userMenuRef, () => {
    setIsUserMenuOpen(false);
  });

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await signOut({ redirect: false });
    } catch (error) {
      console.error("Sign-out error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="w-full h-[60px] flex items-center border-b border-red-700 bg-red-600 text-white">
      {/* Title */}
      <div className="h-full flex items-center px-4 text-xl font-bold">
        RedClone
      </div>

      {/* Right Section */}
      <div className="flex-1 h-full flex justify-end items-center px-4">
        <div className="flex-1 h-full flex items-center justify-end">
          <SearchBar />
        </div>

        {user?.id && (
          <Link
            href={`${
              communityName ? `/home/r/${communityName}/submit` : `/home/submit`
            }`}
            className="h-full aspect-[1/2] flex items-center justify-center p-2 hover:bg-red-500 transition rounded"
          >
            <Icon icon="majesticons:plus" width="20" height="20" />
          </Link>
        )}

        {status === "authenticated" ? (
          <div className="h-full w-auto flex items-center justify-center ml-2">
            <div className="w-5 h-full flex items-center justify-center">
              <Icon
                onClick={toggleUserMenu}
                icon="famicons:chevron-down"
                className="w-4 h-4 text-white cursor-pointer"
              />
            </div>
            <div className="h-[70%] aspect-square bg-white/10 border border-white/30 rounded-full p-1 ml-2">
              <div className="w-full h-full rounded-full border border-white/30 bg-white/20 flex items-center justify-center">
                <p className="text-sm font-medium text-white">
                  {user?.username[0].toUpperCase()}
                </p>
              </div>
            </div>

            {/* user menu */}
            {isUserMenuOpen && (
              <div
                ref={userMenuRef}
                className="absolute w-[200px] right-5 top-[63px] p-2 border border-white/20 rounded bg-red-700 shadow-md z-20 text-white"
              >
                <div className="w-full">
                  <div className="w-full h-[50px] flex flex-col justify-center bg-white/10 px-3 rounded border border-white/10">
                    <p className="text-sm font-medium">{user?.username}</p>
                    <p className="text-xs font-normal text-white/60">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full h-10 flex justify-center px-3 mt-2 hover:bg-red-600 transition rounded"
                  >
                    <div className="h-full flex items-center justify-center mr-2">
                      {isLoggingOut ? (
                        <div className="h-[50%] aspect-square flex items-center justify-center">
                          <LoadingSpinner color="white" />
                        </div>
                      ) : (
                        <Icon
                          icon="hugeicons:logout-square-01"
                          className="w-4 h-4 text-white"
                        />
                      )}
                    </div>
                    <div className="flex-1 h-full flex items-center text-sm">
                      Sign out
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => openAuthModal()}
            className="h-[60%] px-4 flex items-center justify-center bg-white text-red-600 rounded-full text-sm font-medium hover:bg-red-100 transition-colors ml-4"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default HeaderBar;

