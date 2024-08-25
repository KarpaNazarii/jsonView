export type JsonValue = string | number | boolean | JsonObject | JsonArray | null;

export interface JsonObject {
  [key: string]: JsonValue;
}

export interface JsonArray extends Array<JsonValue> { }

export interface JsonUploaderProps {
  onJsonUpload: (json: JsonObject | JsonArray) => void;
}

export interface ExplorerProps {
  data: JsonObject | JsonArray;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
}

