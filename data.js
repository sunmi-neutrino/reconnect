// REConnect Base — sample data
window.RC_DATA = (() => {
  const PROP_IMGS = [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format",
    "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&auto=format",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format",
  ];
  const AVAS = [
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format",
  ];

  const listings = [
    { id: "L01", address: "7447 W Mercer Way", city: "Mercer Island, WA 98040", mls: "2516113", mlsName: "Stellar MLS", price: 3690000, type: "Residential", role: "Representing Seller", status: "Active", added: "May 5, 2026", updated: "12:43pm", photos: 39, online: true, owner: "me", img: PROP_IMGS[0], beds: 5, baths: 4.5, sqft: 4820 },
    { id: "L02", address: "3208 175th Street SE", city: "Bothell, WA 98012", mls: "2518679", mlsName: "Stellar MLS", price: 1449950, type: "Residential", role: "Representing Seller", status: "Active", added: "May 5, 2026", updated: "12:43pm", photos: 34, online: true, owner: "me", img: PROP_IMGS[1], beds: 4, baths: 3, sqft: 3120 },
    { id: "L03", address: "7931 E Mercer Way", city: "Mercer Island, WA 98040", mls: "2515701", mlsName: "Stellar MLS", price: 1998000, type: "Residential", role: "Representing Seller", status: "Active", added: "May 5, 2026", updated: "12:43pm", photos: 32, online: true, owner: "me", img: PROP_IMGS[2], beds: 4, baths: 3.5, sqft: 3680 },
    { id: "L04", address: "6428 201st Avenue SW", city: "Centralia, WA 98531", mls: "2517000", mlsName: "Stellar MLS", price: 650000, type: "Residential", role: "Representing Seller", status: "Pending", added: "May 2, 2026", updated: "12:25pm", photos: 29, online: true, owner: "me", img: PROP_IMGS[3], beds: 3, baths: 2, sqft: 1980 },
    { id: "L05", address: "805 NW 63rd Street #B", city: "Seattle, WA 98107", mls: "2517116", mlsName: "Stellar MLS", price: 1049950, type: "Residential", role: "Representing Seller", status: "Active", added: "May 1, 2026", updated: "12:43pm", photos: 36, online: true, owner: "me", img: PROP_IMGS[4], beds: 3, baths: 2.5, sqft: 2240 },
    { id: "L06", address: "12224 SE 38th St", city: "Bellevue, WA 98006", mls: "2518820", mlsName: "Stellar MLS", price: 2750000, type: "Residential", role: "Representing Seller", status: "Active", added: "Apr 28, 2026", updated: "9:15am", photos: 41, online: false, owner: "me", img: PROP_IMGS[5], beds: 5, baths: 4, sqft: 4210 },
    { id: "L07", address: "418 Queen Anne Ave N", city: "Seattle, WA 98109", mls: "2519411", mlsName: "Stellar MLS", price: 875000, type: "Condo", role: "Representing Buyer", status: "Active", added: "Apr 25, 2026", updated: "3:02pm", photos: 22, online: true, owner: "network", sharedBy: "Sarah Chen", img: PROP_IMGS[6], beds: 2, baths: 2, sqft: 1180 },
    { id: "L08", address: "9904 Renton Avenue S", city: "Seattle, WA 98118", mls: "2519990", mlsName: "Stellar MLS", price: 1280000, type: "Residential", role: "Representing Seller", status: "Active", added: "Apr 22, 2026", updated: "11:48am", photos: 31, online: true, owner: "network", sharedBy: "Marcus Lee", img: PROP_IMGS[7], beds: 4, baths: 2.5, sqft: 2680 },
  ];

  const spotlights = [
    { id: "S01", title: "Mercer Island Luxury Collection", description: "High-end waterfront and view properties on Mercer Island — curated for discerning buyers.", count: 6, views: 1284, leads: 23, created: "Jan 12, 2026", updated: "2 days ago", updatedFull: "May 10, 2026", cover: PROP_IMGS[0], thumbs: [PROP_IMGS[0], PROP_IMGS[2], PROP_IMGS[5]], owner: "me", status: "published" },
    { id: "S02", title: "Eastside New Construction 2026", description: "Brand-new builds in Bellevue, Bothell, and Redmond — move-in ready with modern finishes.", count: 4, views: 842, leads: 11, created: "Feb 3, 2026", updated: "1 week ago", updatedFull: "May 5, 2026", cover: PROP_IMGS[5], thumbs: [PROP_IMGS[5], PROP_IMGS[1], PROP_IMGS[4]], owner: "me", status: "published" },
    { id: "S03", title: "Seattle Condos Under $1M", description: "The best urban condos in Seattle priced under $1M — walkable neighborhoods, great amenities.", count: 8, views: 2110, leads: 47, created: "Mar 20, 2026", updated: "3 days ago", updatedFull: "May 9, 2026", cover: PROP_IMGS[6], thumbs: [PROP_IMGS[6], PROP_IMGS[4], PROP_IMGS[7]], owner: "me", status: "draft" },
    { id: "S04", title: "Coastal Retreats — Sarah Chen", description: "Waterfront escapes and coastal retreats shared by Sarah Chen — vacation-ready properties.", count: 5, views: 660, leads: 14, created: "Apr 8, 2026", updated: "5 days ago", updatedFull: "May 7, 2026", cover: PROP_IMGS[3], thumbs: [PROP_IMGS[3], PROP_IMGS[7]], owner: "network", sharedBy: "Sarah Chen", status: "published" },
  ];

  const network = [
    { id: "N1", name: "Sarah Chen", role: "Realtor · Coldwell Banker Bain", listings: 12, sharing: 8, since: "Jan 2025", ava: AVAS[1], spotlightsShared: 3, spotlightsCreated: 5, email: "sarah.chen@coldwellbanker.com", phone: "(206) 555-0142", license: "WA-22041983", location: "Mercer Island, WA", website: "sarahchen.homes" },
    { id: "N2", name: "Marcus Lee", role: "Broker · Windermere", listings: 24, sharing: 18, since: "Mar 2024", ava: AVAS[2], spotlightsShared: 1, spotlightsCreated: 8, email: "marcus.lee@windermere.com", phone: "(425) 555-0278", license: "WA-19873302", location: "Bellevue, WA", website: "marcuslee.windermere.com" },
    { id: "N3", name: "Priya Natarajan", role: "Realtor · Compass", listings: 9, sharing: 6, since: "Aug 2025", ava: AVAS[1], spotlightsShared: 2, spotlightsCreated: 3, email: "priya.natarajan@compass.com", phone: "(206) 555-0391", license: "WA-23119047", location: "Seattle, WA", website: "priya.compass.com" },
    { id: "N4", name: "David Okafor", role: "Broker · John L. Scott", listings: 31, sharing: 22, since: "Jun 2023", ava: AVAS[3], spotlightsShared: 4, spotlightsCreated: 12, email: "david.okafor@johnlscott.com", phone: "(253) 555-0417", license: "WA-17654821", location: "Tacoma, WA", website: "davidokafor.johnlscott.com" },
    { id: "N5", name: "Elena Volkov", role: "Realtor · RE/MAX", listings: 7, sharing: 4, since: "Dec 2025", ava: AVAS[4], spotlightsShared: 0, spotlightsCreated: 2, email: "elena.volkov@remax.com", phone: "(206) 555-0563", license: "WA-24087156", location: "Kirkland, WA", website: "elenavolkov.remax.com" },
    { id: "N6", name: "Jordan Park", role: "Marketing Lead · Neutrino", listings: 0, sharing: 0, since: "Pending", ava: AVAS[5], pending: true, spotlightsShared: 0, spotlightsCreated: 0, email: "jordan.park@neutrinoinc.com", phone: "(206) 555-0099", license: "—", location: "Seattle, WA", website: "neutrinoinc.com" },
  ];

  const recentShares = [
    { who: "Sarah Chen", action: "shared a spotlight with you", item: "Coastal Retreats", time: "2h ago", thumb: PROP_IMGS[3], avas: [AVAS[1]] },
    { who: "Marcus Lee", action: "shared a listing with you", item: "9904 Renton Avenue S", time: "5h ago", thumb: PROP_IMGS[7], avas: [AVAS[2]] },
    { who: "You", action: "shared 3 listings with", item: "12 network members", time: "Yesterday", thumb: PROP_IMGS[0], avas: [AVAS[1], AVAS[2], AVAS[3]] },
    { who: "Priya Natarajan", action: "viewed your spotlight", item: "Mercer Island Luxury Collection", time: "2d ago", thumb: PROP_IMGS[0], avas: [AVAS[1]] },
    { who: "David Okafor", action: "shared a spotlight with you", item: "Eastside New Construction 2026", time: "3d ago", thumb: PROP_IMGS[5], avas: [AVAS[3]] },
  ];

  const templates = [
    { id: "T1", name: "Open House Flyer", source: "Neutrino", uses: 218, cover: PROP_IMGS[0] },
    { id: "T2", name: "Just Listed — Square Post", source: "Neutrino", uses: 432, cover: PROP_IMGS[1] },
    { id: "T3", name: "Property Story Reel", source: "Neutrino", uses: 184, cover: PROP_IMGS[2] },
    { id: "T4", name: "Mercer Island Brand", source: "My Templates", uses: 14, cover: PROP_IMGS[5] },
    { id: "T5", name: "Price Reduced Banner", source: "Neutrino", uses: 96, cover: PROP_IMGS[3] },
    { id: "T6", name: "Spotlight Hero Card", source: "My Templates", uses: 8, cover: PROP_IMGS[6] },
    { id: "T7", name: "Coming Soon Teaser", source: "Neutrino", uses: 311, cover: PROP_IMGS[4] },
    { id: "T8", name: "Sold — Celebration Post", source: "Neutrino", uses: 552, cover: PROP_IMGS[7] },
  ];

  return { PROP_IMGS, AVAS, listings, spotlights, network, recentShares, templates };
})();
