interface TextareaProps {
  placeholder: string;
  value: string | null;
  onInput: (target: HTMLTextAreaElement) => void;
  type?: string;
  required?: boolean;
  maxLength?: number | undefined;
  rows?: number | undefined;
}

export default function FormTexarea({ placeholder, value, onInput, type = "text", required = true, maxLength = undefined, rows = undefined }: TextareaProps) {
  return (
    <textarea
      class="p-0.5 px-2 mb-1 rounded resize-none bg-nord2 hover:bg-nord3 focus:bg-nord3 outline-none"
      placeholder={placeholder}
      value={value}
      onInput={e => onInput(e.target as HTMLTextAreaElement)}
      type={type}
      required={required}
      maxLength={maxLength}
      rows={rows}
    />
  );
}
