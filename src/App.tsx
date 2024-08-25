import React, { useState } from 'react';
import { JsonObject, JsonArray } from './types';
import { Explorer, JsonUploader, SearchBar } from './components';
import { filterJson } from './utils/filterJson';

const App: React.FC = () => {
  const [jsonData, setJsonData] = useState<JsonObject | JsonArray | null>(null);
  const [filteredData, setFilteredData] = useState<JsonObject | JsonArray | null>(null);

  const handleJsonUpload = (json: JsonObject | JsonArray) => {
    setJsonData(json);
    setFilteredData(json);
  };

  const handleSearch = (query: string) => {
    if (!jsonData) return;
    setFilteredData(filterJson(jsonData, query));
  };

  return (
    <div className='container'>
      <JsonUploader onJsonUpload={handleJsonUpload} />
      {jsonData && <SearchBar onSearch={handleSearch} />}
      {filteredData && <Explorer data={filteredData} />}
    </div>
  );
};

export default App;
