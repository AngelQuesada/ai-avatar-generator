import { tv } from "tailwind-variants";

export const dropzone = tv({
  slots: {
    base: "relative flex flex-col items-center justify-center w-full h-80 p-4 transition-all duration-200 border-2 border-dashed rounded-2xl cursor-pointer ease-in-out group overflow-hidden",
    iconWrapper: "flex items-center justify-center w-16 h-16 rounded-full bg-violet-100 text-violet-600",
    iconSvg: "w-8 h-8",
    textWrapper: "flex flex-col items-center justify-center text-center space-y-4 pointer-events-none",
    textMain: "text-lg font-medium text-gray-700",
    textHighlight: "text-violet-600",
    textSub: "text-sm text-gray-400",
    previewWrapper: "relative w-full h-full overflow-hidden rounded-lg group",
    previewImage: "object-contain",
    overlay: "absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/50 group-hover:opacity-100",
    overlayText: "font-medium text-white pointer-events-none",
    errorMessage: "absolute bottom-4 px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg shadow-sm animate-pulse z-10",
  },
  
  variants: {
    isDragging: {
      true: {
        base: "border-violet-500 bg-violet-50 scale-[1.02]",
      },
      false: {
        base: "border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400",
      },
    },
    isError: {
      true: {
        base: "border-red-400 bg-red-50 hover:bg-red-50",
      },
    },
    hasFile: {
      true: {
        base: "border-solid border-violet-200 bg-violet-50/30",
      },
    },
  },

  defaultVariants: {
    isDragging: false,
    isError: false,
    hasFile: false,
  },
});