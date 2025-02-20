export interface PlantInfo {
  name: string;
  species: string;
  description: string;
  family: string;
  nativeRegion: string;
  toxicity: string;
  growthHabit: string;
  careRequirements: {
    water: string;
    light: string;
    soil: string;
    temperature: string;
  };
  characteristics: {
    height: string;
    spread: string;
    flowerColor: string;
    seasonality: string;
  };
}
