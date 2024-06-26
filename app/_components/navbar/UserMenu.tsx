"use client";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";

import Avatar from "../Avatar";
import MenuItems from "./MenuItems";

import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type UserMenuProps = {
  currentUser?: SafeUser | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      toast.error("Login first");
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  const redirect = (str: string) => {
    setIsOpen(false);
    router.push(str);
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>

        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItems
                  onClick={() => redirect("/trips")}
                  label="My trips"
                />
                <MenuItems
                  onClick={() => redirect("/favorites")}
                  label="My favorites"
                />
                <MenuItems
                  onClick={() => redirect("/reservation")}
                  label="My reservations"
                />
                <MenuItems
                  onClick={() => redirect("/properties")}
                  label="My properties"
                />
                <MenuItems onClick={onRent} label="Airbnb my home" />
                <hr />
                <MenuItems onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItems onClick={loginModal.onOpen} label="Login" />
                <MenuItems onClick={registerModal.onOpen} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
