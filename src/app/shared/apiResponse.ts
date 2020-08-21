export interface ApiResponse {
  Results?: ((ResultsEntity)[] | null)[] | null;
  Statistics: Statistics;
  Status: string;
}
export interface ResultsEntity {
  Field: string;
  Value: string;
}
export interface Statistics {
  BytesScanned: number;
  RecordsMatched: number;
  RecordsScanned: number;
}
