import React, { useState } from 'react';
import { JsonUploaderProps } from '../../types';
import styles from './JsonUploader.module.scss';

const JsonUploader: React.FC<JsonUploaderProps> = ({ onJsonUpload }) => {
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          onJsonUpload(json);
          setError(null);
        } catch (err) {
          setError('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className={styles.uploader}>
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className={styles.fileInput}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default JsonUploader;
