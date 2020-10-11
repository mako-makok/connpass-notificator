interface Connpass {
  results_start: number;
  results_returned: number;
  results_available: number;
  events: Event[];
}

interface Series {
  id: number;
  title: string;
  url: string;
}

interface Event {
  event_id: number;
  title: string;
  catch: string;
  description: string;
  event_url: string;
  started_at: Date;
  ended_at: Date;
  limit?: number;
  hash_tag: string;
  event_type: string;
  accepted: number;
  waiting: number;
  updated_at: Date;
  owner_id: number;
  owner_nickname: string;
  owner_display_name: string;
  place: string;
  address: string;
  lat: string;
  lon: string;
  series: Series;
}