import React, { useState } from 'react';
import { ExplorerProps, JsonValue, JsonObject, JsonArray } from '../../types';
import styles from './Explorer.module.scss';
import CloseEye from '../../assets/icons/CloseEye';
import OpenEye from '../../assets/icons/OpenEye';

const Explorer: React.FC<ExplorerProps> = ({ data }) => {
  const [expandedPaths, setExpandedPaths] = useState<Record<string, boolean>>({ root: true });

  const toggleExpand = (path: string) =>
    setExpandedPaths((prev) => ({ ...prev, [path]: !prev[path] }));

  const isObject = (value: JsonValue): value is JsonObject | JsonArray =>
    typeof value === 'object' && value !== null;

  const renderItem = (value: JsonValue, path: string, name: string) => {
    const isExpanded = expandedPaths[path] ?? false;
    return (
      <div key={path} className={styles.item}>
        {isObject(value) ? (
          <>
            <span onClick={() => toggleExpand(path)} className={styles.toggle}>
              {isExpanded ? <OpenEye /> : <CloseEye />} {name}
            </span>
            {isExpanded &&
              Object.entries(value).map(([key, val]) =>
                renderItem(val, `${path}.${key}`, key)
              )}
          </>
        ) : (
          <span className={styles.value}>
            {name}: {JSON.stringify(value)}
          </span>
        )}
      </div>
    );
  };

  return <div className={styles.container}>{renderItem(data, 'root', 'Root')}</div>;
};

export default Explorer;
