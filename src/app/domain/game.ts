export interface GameData {
  date: string;
  id: string;
  name: string;
  shortName: string;
  venue: any;
  homeTeam: TeamData;
  awayTeam: TeamData;
  broadcasts: any;
}

export interface TeamData {
  record: string;
  name: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName: string;
  location: string;
  logo: string;
  color: number;
  altColor: number;
}
