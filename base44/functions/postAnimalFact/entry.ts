import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const facts = [
  { title: "Three Hearts of Love", animal: "Octopus", emoji: "🐙", fact: "Octopuses have three hearts — two pump blood to the gills, and one pumps it to the rest of the body. When they swim, the heart that delivers blood to the body actually stops beating, which is why they prefer crawling!" },
  { title: "Spiny Situation", animal: "Hedgehog", emoji: "🦔", fact: "Hedgehogs have between 5,000 and 7,000 spines on their back! Each spine lasts about a year before it falls out and a new one grows in its place." },
  { title: "Century Talkers", animal: "Parrot", emoji: "🦜", fact: "Some parrot species can live over 80 years! They can also learn over 100 words and even understand context." },
  { title: "Mood Ring Lizards", animal: "Bearded Dragon", emoji: "🦎", fact: "Bearded dragons can change color based on their mood and body temperature! They darken when cold or stressed, and lighten up when warm and happy." },
  { title: "Dolphin Name Tags", animal: "Dolphin", emoji: "🐬", fact: "Each dolphin develops its own unique signature whistle — essentially a name! Dolphins can remember these 'names' for over 20 years." },
  { title: "Tongue Sniffers", animal: "Snake", emoji: "🐍", fact: "Snakes smell with their tongues! They flick their forked tongue to collect chemical particles from the air, then press it into the Jacobson's organ to 'read' the smells." },
  { title: "Immortal Jellyfish", animal: "Jellyfish", emoji: "🪼", fact: "The Turritopsis dohrnii jellyfish is biologically immortal! When it gets old or stressed, it can revert its cells back to a younger state — hitting the reset button on aging." },
  { title: "Elephants Mourn", animal: "Elephant", emoji: "🐘", fact: "Elephants hold funerals for their dead. They'll gently touch the bones of deceased family members with their trunks and stand vigil for hours." },
  { title: "Axolotl Superpowers", animal: "Axolotl", emoji: "🦎", fact: "Axolotls can regenerate entire limbs, their heart, spinal cord, and even parts of their brain — with zero scarring!" },
  { title: "Wombat Cube Poop", animal: "Wombat", emoji: "🐨", fact: "Wombats produce cube-shaped poop! Their intestines mold their droppings into cubes so they don't roll away — perfect for territorial marking." },
  { title: "Honeybee Democracy", animal: "Honeybee", emoji: "🐝", fact: "When honeybees need a new home, they hold a democratic vote! Scout bees dance to advertise locations, and the swarm votes until consensus is reached." },
  { title: "Sea Otter Hand-Holding", animal: "Sea Otter", emoji: "🦦", fact: "Sea otters hold hands while sleeping so they don't drift apart! A group of otters floating together is adorably called a 'raft.'" },
  { title: "Gecko Toe Magic", animal: "Gecko", emoji: "🦎", fact: "Geckos can walk on walls and ceilings thanks to millions of tiny hair-like structures on their toes called setae — using molecular forces to stick to surfaces!" },
  { title: "Breath-Holding Sloths", animal: "Sloth", emoji: "🦥", fact: "Sloths can hold their breath underwater for up to 40 minutes — longer than dolphins! They slow their heart rate to just 1/3 of normal to conserve oxygen." },
  { title: "Dads Give Birth", animal: "Seahorse", emoji: "🐎", fact: "Seahorses are the only animals where the male gives birth! The female deposits eggs into the male's pouch, where he carries them until they hatch." },
  { title: "Hippo Sunscreen", animal: "Hippo", emoji: "🦛", fact: "Hippos secrete a reddish oily fluid that acts as a natural sunscreen and antibiotic! Scientists once thought it was blood, earning it the nickname 'blood sweat.'" },
  { title: "Wolves Change Rivers", animal: "Wolf", emoji: "🐺", fact: "When wolves were reintroduced to Yellowstone in 1995, their predation changed elk grazing patterns, allowing vegetation to recover and literally altering the course of rivers." },
  { title: "No Two Stripes Alike", animal: "Zebra", emoji: "🦓", fact: "Every zebra's stripe pattern is completely unique — like a fingerprint. Foals recognize their mothers by stripe pattern alone within hours of being born." },
  { title: "Crow Tool Users", animal: "Crow", emoji: "🐦", fact: "New Caledonian crows craft hooked tools from twigs to extract grubs from bark — and they pass these techniques on to their young, making it a form of animal culture." },
  { title: "Velvet Antlers Grow Fast", animal: "Deer", emoji: "🦌", fact: "Deer antlers are the fastest-growing tissue in the animal kingdom, growing up to an inch per day!" },
];

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Pick a fact based on current day + hour to vary between the two daily posts
    const now = new Date();
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    const hourSlot = now.getUTCHours() >= 12 ? 1 : 0;
    const index = (dayOfYear * 2 + hourSlot) % facts.length;
    const chosen = facts[index];

    const caption = `${chosen.emoji} ${chosen.title}\n\n${chosen.fact}\n\n#BeastlyFacts #AnimalFacts #${chosen.animal.replace(/\s+/g, '')} #WildlifeWednesday #NatureLovers #AnimalScience`;

    // Get Instagram access token
    const { accessToken } = await base44.asServiceRole.connectors.getConnection("instagram");

    // Get Instagram user ID
    const meRes = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`);
    const meData = await meRes.json();
    if (!meData.id) {
      return Response.json({ error: 'Could not get Instagram user ID', details: meData }, { status: 500 });
    }
    const igUserId = meData.id;

    // Generate an image for the fact
    const imageResult = await base44.asServiceRole.integrations.Core.GenerateImage({
      prompt: `Beautiful wildlife photo of a ${chosen.animal} in its natural habitat, vibrant colors, professional nature photography style, high quality`
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

    return Response.json({ success: true, post_id: publishData.id, fact: chosen.title });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});