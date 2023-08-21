interface FormProps {
  onSubmit: (event: SubmitEvent) => void;
  children: JSX.Element | JSX.Element[];
}

export default function Form({ onSubmit, children }: FormProps) {
  return (
    <form class="flex flex-col gap-1 p-2 rounded bg-nord1 drop-shadow-sm" onSubmit={e => onSubmit(e as unknown as SubmitEvent)}>
      {children}
    </form>
  );
}
