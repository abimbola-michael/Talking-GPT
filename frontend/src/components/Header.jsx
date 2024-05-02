import React, { useState } from "react";
import AppIcon from "./AppIcon";
import SearchInput from "./SearchInput";

export default function Header({
  mode,
  opened,
  searching,
  setSearching,
  onSearch,
  categoryName,
  toggleSearch,
  selectVoice,
  setOpened,
}) {
  return (
    <div className="relative w-full flex justify-between items-center px-4 py-2 h-20">
      <AppIcon
        name={opened ? "close.svg" : "drawer_menu.svg"}
        size={24}
        onClick={setOpened}
      />
      <div className="absolute left-[100px] right-[100px] top-0 bottom-0">
        {searching ? (
          <div className="w-[60%]">
            <SearchInput placeholder={"Search Chats..."} onSearch={onSearch} />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="font-bold text-lg dark:text-white">Talking GPT</p>{" "}
            <p className="text-sm dark:text-white">{categoryName}</p>{" "}
          </div>
        )}
      </div>

      <div className="flex gap-4 items-center">
        <AppIcon
          name={"voice_mode.svg"}
          size={24}
          onClick={() => selectVoice(true)}
        />
        {/* <div className={mode === "chat" ? "visible" : "invisible"}>
          <AppIcon
            name={searching ? "close.svg" : "search.svg"}
            size={24}
            onClick={toggleSearch}
          />
        </div> */}
      </div>
    </div>
  );
}
