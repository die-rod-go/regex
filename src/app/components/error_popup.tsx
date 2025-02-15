import { XMarkIcon } from "@heroicons/react/16/solid";
import React, { useEffect } from "react";

type ErrorPopupProps = {
  onClose: () => void;
  error?: String;
};

export default function ErrorPopup({ onClose, error }: ErrorPopupProps) {
  //    close popup when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 ">
      <div className="relative mx-auto w-full max-w-sm rounded-lg bg-bg-card p-6 shadow-lg transition-transform duration-300 ease-in-out">
        <button
          onClick={() => onClose()}
          className="absolute right-4 top-4 text-text-secondary p-1 rounded-full hover:bg-bg-sample"
        >
          <XMarkIcon className="size-6" />
        </button>
        <p className="text-text-secondary">Not quite... But keep trying!</p>
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    </div>
  );
}
