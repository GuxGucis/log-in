export interface formData {
  Gender: string[]
  Country: string[];
  Region: string[];
  Province: {
    [key: string]: string[];
  };
}