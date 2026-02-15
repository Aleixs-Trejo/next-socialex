interface Props {
  children: React.ReactNode;
  onCancel: () => void;
}

export const OverlayConfirmAction = ({ children, onCancel }: Props) => {
  return (
    <div className="overlay-logout-btns fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={onCancel}>
      <div className="w-9/10 max-w-sm mx-auto bg-accent-dark px-4 py-8 rounded-4xl" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
};