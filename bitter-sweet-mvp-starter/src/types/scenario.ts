export type Weight = 'Light' | 'Medium' | 'Heavy';

export interface ScenarioOption {
  text: string;
  outcome: string;
  weight: Weight;
}

export interface ScenarioData {
  age?: number;
  character?: 'Mila' | 'Lucy' | 'Canela' | string;
  scenario: string;
  options: ScenarioOption[]; // length 2
}

