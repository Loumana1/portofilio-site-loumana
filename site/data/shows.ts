// Upcoming shows only. These four are examples until real dates exist.
// Decisions: docs/DESIGN_BACKLOG.md §4, block 3.

export type Show = {
  date: string; // ISO date, YYYY-MM-DD
  venue: string;
  city: string;
  status: 'on air' | 'tickets' | 'free' | 'sold out';
  link?: string;
  example?: true;
};

export const shows: Show[] = [
  { date: '2026-11-07', venue: 'BRUZZ Radio Live', city: 'Brussels, BE', status: 'on air', example: true },
  { date: '2026-11-21', venue: 'C12', city: 'Brussels, BE', status: 'tickets', example: true },
  { date: '2026-12-05', venue: 'Kiosk Radio', city: 'Brussels, BE', status: 'free', example: true },
  { date: '2026-12-19', venue: 'La Cabane', city: 'Brussels, BE', status: 'tickets', example: true },
];
