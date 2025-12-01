export interface CharacterSearchResult {
  Avatar: string;
  ID: number;
  Lang: string;
  Name: string;
  RankName: string;
  RankIcon: string;
  World: string;
  DC: string;
}

export interface GearItem {
  Name: string;
  ItemLevel?: number;
  Stain?: string;
  MirageName?: string;
}

export interface IconItem {
  Icon: string;
  Name: string;
}

export interface FreeCompany {
  Name: string;
  IconLayers?: {
    Bottom?: string;
    Middle?: string;
    Top?: string;
  };
}

export interface ClassJobIcon {
  Icon: string;
}

export interface CharacterDetail {
  Name: string;
  Title?: string;
  Avatar: string;
  Race: string;
  Tribe: string;
  Gender: string;
  World: string;
  DC: string;
  Nameday: string;
  GuardianDeity?: IconItem;
  Town?: IconItem;
  FreeCompany?: FreeCompany;
  Level: number;
  Strength: number;
  Dexterity: number;
  Vitality: number;
  Intelligence: number;
  Mind: number;
  Piety: number;
  CriticalHitRate: number;
  Determination: number;
  DirectHitRate: number;
  SkillSpeed: number;
  SpellSpeed: number;
  Tenacity: number;
  Hp: number;
  MpGpCp: number;
  MpGpCpParameterName: string;
  Mainhand?: GearItem;
  Head?: GearItem;
  Body?: GearItem;
  Hands?: GearItem;
  Legs?: GearItem;
  Feet?: GearItem;
  Earrings?: GearItem;
  Necklace?: GearItem;
  Bracelets?: GearItem;
  Ring1?: GearItem;
  Ring2?: GearItem;
  Soulcrystal?: GearItem;
  ClassjobIcons?: {
    List: ClassJobIcon[];
  };
}
