import LoadingSvg from "../LoadingSpin";

interface ButtonProps {
  text: string;
  isLoading: boolean;
  name?: string | undefined;
  type?: "submit" | "button" | "reset" | undefined;
}

export default function FormButton({ text, isLoading, name = undefined, type = "submit" }: ButtonProps) {
  return (
    <button
      class={`w-full flex flex-row justify-center m-auto p-0.5 rounded ${isLoading ? "bg-nord1" : "bg-nord2 hover:bg-nord3"}`}
      type={type}
      name={name}
      disabled={isLoading}
    >
      {isLoading && <LoadingSvg size={17} />}
      {text}
    </button>
  );
}
