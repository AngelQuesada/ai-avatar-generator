import { tv } from "tailwind-variants";

export const homePage = tv({
  slots: {
    // Estructura
    main: "flex flex-col items-center justify-center min-h-screen p-8 font-sans bg-gray-50 text-gray-900",
    container: "w-full max-w-lg space-y-8",

    // Header
    header: "text-center space-y-2",
    title: "text-4xl font-extrabold text-gray-800",
    subtitle: "text-gray-500",

    // Wrappers
    dropzoneWrapper: "transition-opacity duration-300",

    // Elementos de Feedback
    errorAlert:
      "p-4 text-sm text-red-700 bg-red-100 border border-red-200 rounded-lg animate-in fade-in slide-in-from-top-2 flex items-center gap-2",
    spinner: "w-5 h-5 mr-3 animate-spin text-white",

    // Botón de Acción
    button:
      "relative w-full py-4 text-lg font-bold text-white transition-all rounded-xl shadow-lg overflow-hidden flex items-center justify-center",
  },

  variants: {
    isAnalyzing: {
      true: {
        dropzoneWrapper: "pointer-events-none opacity-50",
        button: "cursor-wait opacity-90",
      },
      false: {
        dropzoneWrapper: "",
        button: "",
      },
    },
    isButtonDisabled: {
      true: {
        button: "bg-gray-300 cursor-not-allowed shadow-none opacity-80",
      },
      false: {
        button:
          "bg-violet-600 hover:bg-violet-700 hover:shadow-violet-200 hover:-translate-y-0.5 active:translate-y-0",
      },
    },
  },
});
