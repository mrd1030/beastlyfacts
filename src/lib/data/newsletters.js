// Aggregator file that imports all individual newsletter posts
import { crestedGeckoHumidity } from './post/crested-gecko-humidity';
import { leopardGeckoTemps } from './post/leopard-gecko-temps';
import { ballPythonFeeding } from './post/ball-python-feeding';
import { bioactiveSetups } from './post/bioactive-setups';
import { uvbLightingGuide } from './post/uvb-lighting-guide';
import { reptileShedding } from './post/reptile-shedding';

// Aggregate all newsletter posts into a single array
export const blogPosts = [
  crestedGeckoHumidity,
  leopardGeckoTemps,
  ballPythonFeeding,
  bioactiveSetups,
  uvbLightingGuide,
  reptileShedding,
];

// Categories for filtering
export const blogCategories = ["All", "Care Tips", "Feeding", "Enclosures", "Lighting", "Health"];
