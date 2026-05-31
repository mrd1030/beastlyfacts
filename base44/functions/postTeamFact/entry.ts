import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// A curated list of "team facts" / behind-the-scenes content about Beastly Facts
const teamFacts = [
  {
    title: "Meet the Team 🐾",
    body: "Beastly Facts was built by a passionate team of animal lovers, reptile keepers, and wildlife enthusiasts. Every fact you read is researched and verified by people who genuinely geek out over the animal kingdom."
  },
  {
    title: "Did You Know? 🌿",
    body: "Our reptile care guides are written by experienced keepers with years of hands-on husbandry knowledge. We believe in education-first pet ownership — because a well-informed keeper means a thriving animal."
  },
  {
    title: "Our Mission 🦎",
    body: "At Beastly Facts, we believe that knowledge creates better pet owners and stronger advocates for wildlife. Every article, fact, and guide is designed to build that connection between humans and the animal world."
  },
  {
    title: "The Critter Digest 📰",
    body: "Our newsletter, The Critter Digest, goes out to thousands of reptile and exotic pet enthusiasts every week. Subscribe for free at beastlyfacts.com — in-depth care guides straight to your inbox!"
  },
  {
    title: "Behind the Facts 🔬",
    body: "Every animal fact on Beastly Facts is backed by scientific research. We cross-reference peer-reviewed studies, wildlife journals, and expert sources before publishing. Fun AND accurate — that's our standard."
  },
  {
    title: "Reptile Keepers Unite 🐍",
    body: "Our team includes bearded dragon, leopard gecko, ball python, and crested gecko keepers. We share husbandry tips from real experience — not just textbook knowledge. Passion meets practice at Beastly Facts."
  },
  {
    title: "Wildlife Advocacy 🌍",
    body: "We're passionate advocates for wild animal welfare. Learning about animals creates empathy — and empathy drives conservation. That's why we make animal facts fun and accessible for everyone."
  },
];

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Rotate through team facts based on the day of the year
    const now = new Date();
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    const chosen = teamFacts[dayOfYear % teamFacts.length];

    const caption = `${chosen.title}\n\n${chosen.body}\n\n🔗 beastlyfacts.com\n\n#BeastlyFacts #AnimalLovers #ReptileKeeper #WildlifeEducation #ExoticPets #AnimalCare`;

    // Get Instagram access token
    const { accessToken } = await base44.asServiceRole.connectors.getConnection("instagram");

    // Get Instagram user ID
    const meRes = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`);
    const meData = await meRes.json();
    if (!meData.id) {
      return Response.json({ error: 'Could not get Instagram user ID', details: meData }, { status: 500 });
    }
    const igUserId = meData.id;

    // Generate an image themed around the post
    const imageResult = await base44.asServiceRole.integrations.Core.GenerateImage({
      prompt: `Beautiful, vibrant wildlife collage featuring reptiles, exotic pets, and wild animals. Professional nature photography aesthetic, warm earthy tones, high quality editorial style`
    });
    const imageUrl = imageResult.url;

    // Step 1: Create media container
    const containerRes = await fetch(`https://graph.instagram.com/${igUserId}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image_url: imageUrl,
        caption: caption,
        access_token: accessToken
      })
    });
    const containerData = await containerRes.json();
    if (!containerData.id) {
      return Response.json({ error: 'Failed to create media container', details: containerData }, { status: 500 });
    }

    // Step 2: Publish the container
    const publishRes = await fetch(`https://graph.instagram.com/${igUserId}/media_publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        creation_id: containerData.id,
        access_token: accessToken
      })
    });
    const publishData = await publishRes.json();

    return Response.json({ success: true, post_id: publishData.id, title: chosen.title });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});