type RollProps = {
  text: string;
  className?: string;
};

/** Text that rolls upward on hover, revealing a duplicate from below. */
export function Roll({ text, className = "" }: RollProps) {
  return (
    <span className={`roll ${className}`}>
      <span>{text}</span>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}
