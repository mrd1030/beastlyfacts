// functions/api/sanity-to-beehiiv.js
import { toHTML } from '@portabletext/to-html';

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // 1. Grab the raw incoming message data sent by Sanity
    const payload = await request.json();
    
    // 2. Destructure the exact keys we found in your post.js schema
    const { title, excerpt, body } = payload;

    // 3. Convert your Sanity 'body' blocks into an HTML string for beehiiv
    const htmlBody = toHTML(body);

    // 4. Set up the custom beehiiv API endpoint using your hidden Publication ID
    const beehiivUrl = `https://api.beehiiv.com/v2/publications/${env.BEEHIIV_PUBLICATION_ID}/posts`;

    // 5. Send the formatted article payload over to beehiiv
    const beehiivResponse = await fetch(beehiivUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.BEEHIIV_API_KEY}` // Your secure API credential
      },
      body: JSON.stringify({
        title: title,
        subtitle: excerpt, // Mapping Sanity's 'excerpt' to beehiiv's 'subtitle'
        body: htmlBody,
        status: 'draft' // We send it as a draft so you can review the layout first!
      })
    });

    // 6. Check if beehiiv accepted our article payload
    if (!beehiivResponse.ok) {
      const errorData = await beehiivResponse.json();
      return new Response(
        JSON.stringify({ success: false, error: errorData }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 7. If successful, return a clean confirmation message
    const data = await beehiivResponse.json();
    return new Response(
      JSON.stringify({ success: true, message: 'Draft successfully pushed to beehiiv!', data }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    // Safety Net: Catch any unexpected code bugs or crashes
    return new Response(
      JSON.stringify({ success: false, error: error.message }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}