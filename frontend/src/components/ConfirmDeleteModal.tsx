interface Props {
  entryTitle: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmDeleteModal({ entryTitle, onCancel, onConfirm }: Props) {
  return (
    <div className="modal-backdrop" role="presentation">
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="delete-title">
        <h2 id="delete-title">Удалить запись?</h2>
        <p>{entryTitle}</p>
        <div className="modal-actions">
          <button className="secondary-button" type="button" onClick={onCancel}>Отмена</button>
          <button className="danger-button" type="button" onClick={onConfirm}>Удалить</button>
        </div>
      </div>
    </div>
  );
}
