export const AVATAR_COLORS = [
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#f43f5e', // rose
  '#f59e0b', // amber
  '#10b981', // emerald
  '#14b8a6', // teal
  '#6366f1', // indigo
  '#84cc16', // lime
  '#f97316', // orange
  '#e11d48', // crimson
];

export const PRESET_GROUPS = [
  {
    name: 'College Gang',
    players: ['Vijay', 'Midun', 'Arun', 'Kavin', 'Ravi']
  },
  {
    name: 'Hostel Room',
    players: ['Suriya', 'Karthik', 'Dhanush', 'Siva', 'Pradeep', 'Anirudh']
  },
  {
    name: 'Trio Quick Match',
    players: ['Alex', 'Sam', 'Chris']
  }
];

export const DEFAULT_PLAYERS = ['Vijay', 'Midun', 'Arun', 'Kavin'];

export function getPlayerColor(index) {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}
