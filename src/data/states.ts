import type { StateMeta } from "../types";

/** All 50 states + DC, alphabetical by name. */
export const STATES: StateMeta[] = [
  { code: "AL", name: "Alabama", demonym: "Alabamian" },
  { code: "AK", name: "Alaska", demonym: "Alaskan" },
  { code: "AZ", name: "Arizona", demonym: "Arizonan" },
  { code: "AR", name: "Arkansas", demonym: "Arkansan" },
  { code: "CA", name: "California", demonym: "Californian" },
  { code: "CO", name: "Colorado", demonym: "Coloradan" },
  { code: "CT", name: "Connecticut", demonym: "Connecticuter" },
  { code: "DE", name: "Delaware", demonym: "Delawarean" },
  { code: "DC", name: "District of Columbia", demonym: "Washingtonian" },
  { code: "FL", name: "Florida", demonym: "Floridian" },
  { code: "GA", name: "Georgia", demonym: "Georgian" },
  { code: "HI", name: "Hawaii", demonym: "Hawaii resident" },
  { code: "ID", name: "Idaho", demonym: "Idahoan" },
  { code: "IL", name: "Illinois", demonym: "Illinoisan" },
  { code: "IN", name: "Indiana", demonym: "Hoosier" },
  { code: "IA", name: "Iowa", demonym: "Iowan" },
  { code: "KS", name: "Kansas", demonym: "Kansan" },
  { code: "KY", name: "Kentucky", demonym: "Kentuckian" },
  { code: "LA", name: "Louisiana", demonym: "Louisianan" },
  { code: "ME", name: "Maine", demonym: "Mainer" },
  { code: "MD", name: "Maryland", demonym: "Marylander" },
  { code: "MA", name: "Massachusetts", demonym: "Massachusettsan" },
  { code: "MI", name: "Michigan", demonym: "Michigander" },
  { code: "MN", name: "Minnesota", demonym: "Minnesotan" },
  { code: "MS", name: "Mississippi", demonym: "Mississippian" },
  { code: "MO", name: "Missouri", demonym: "Missourian" },
  { code: "MT", name: "Montana", demonym: "Montanan" },
  { code: "NE", name: "Nebraska", demonym: "Nebraskan" },
  { code: "NV", name: "Nevada", demonym: "Nevadan" },
  { code: "NH", name: "New Hampshire", demonym: "New Hampshirite" },
  { code: "NJ", name: "New Jersey", demonym: "New Jerseyan" },
  { code: "NM", name: "New Mexico", demonym: "New Mexican" },
  { code: "NY", name: "New York", demonym: "New Yorker" },
  { code: "NC", name: "North Carolina", demonym: "North Carolinian" },
  { code: "ND", name: "North Dakota", demonym: "North Dakotan" },
  { code: "OH", name: "Ohio", demonym: "Ohioan" },
  { code: "OK", name: "Oklahoma", demonym: "Oklahoman" },
  { code: "OR", name: "Oregon", demonym: "Oregonian" },
  { code: "PA", name: "Pennsylvania", demonym: "Pennsylvanian" },
  { code: "RI", name: "Rhode Island", demonym: "Rhode Islander" },
  { code: "SC", name: "South Carolina", demonym: "South Carolinian" },
  { code: "SD", name: "South Dakota", demonym: "South Dakotan" },
  { code: "TN", name: "Tennessee", demonym: "Tennessean" },
  { code: "TX", name: "Texas", demonym: "Texan" },
  { code: "UT", name: "Utah", demonym: "Utahn" },
  { code: "VT", name: "Vermont", demonym: "Vermonter" },
  { code: "VA", name: "Virginia", demonym: "Virginian" },
  { code: "WA", name: "Washington", demonym: "Washingtonian" },
  { code: "WV", name: "West Virginia", demonym: "West Virginian" },
  { code: "WI", name: "Wisconsin", demonym: "Wisconsinite" },
  { code: "WY", name: "Wyoming", demonym: "Wyomingite" },
];

const BY_CODE = new Map(STATES.map((s) => [s.code, s]));

export function stateByCode(code: string): StateMeta | undefined {
  return BY_CODE.get(code as StateMeta["code"]);
}

export function nameOf(code: string): string {
  return BY_CODE.get(code as StateMeta["code"])?.name ?? code;
}
