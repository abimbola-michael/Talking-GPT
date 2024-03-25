import React from "react";
import AppButton from "./AppButton";
import { tintLight, tintLighter } from "../colors";

export default function AlertDialog({
  title,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  showCancel = true,
  children,
}) {
  return (
    <div
      className="h-screen w-screen flex items-center justify-center"
      style={{ color: tintLight }}
    >
      <div className="w-[50%] h-[50%] flex flex-col rounded-xl">
        <h1 className="text-lg font-bold py-2">{title}</h1>
        {children}
        <div className="flex justify-between px-3 py-2">
          {showCancel && (
            <AppButton color={tintLighter} onClick={onCancel}>
              {cancelText}
            </AppButton>
          )}
          <AppButton onClick={onConfirm}>{confirmText}</AppButton>
        </div>
      </div>
    </div>
  );
}
