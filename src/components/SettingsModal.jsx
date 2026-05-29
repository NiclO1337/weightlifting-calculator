import { X } from 'lucide-react';

export default function SettingsModal({ onClose, children }) {
  return (
    <div
      className='settings-overlay'
      role='dialog'
      aria-modal='true'
      aria-labelledby='settings-heading'
      onClick={onClose}>
      <div className='settings-panel' onClick={(e) => e.stopPropagation()}>
        <button
          className='settings-close'
          onClick={onClose}
          aria-label='Close Settings'>
          <X size={30} />
        </button>

        <h2 id='settings-heading' className='special-font'>
          Settings
        </h2>
        <hr />

        {children}
      </div>
    </div>
  );
}
