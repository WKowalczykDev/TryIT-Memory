interface ActionButtonProps {
  onClick: () => void;
  label: string;
}

function ActionButton({ onClick, label }: ActionButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

export default ActionButton;