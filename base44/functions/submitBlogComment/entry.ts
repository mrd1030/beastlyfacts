import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { post_id, post_title, author_name, author_email, content } = await req.json();

    if (!post_id || !author_name || !content) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Basic spam check: block very short comments or obvious spam patterns
    if (content.length < 5) {
      return Response.json({ error: 'Comment is too short' }, { status: 400 });
    }
    if (/http[s]?:\/\//i.test(content) && (content.match(/http/gi) || []).length > 1) {
      return Response.json({ error: 'Comment contains too many links' }, { status: 400 });
    }

    // Save comment as pending
    const comment = await base44.asServiceRole.entities.BlogComment.create({
      post_id,
      post_title: post_title || '',
      author_name: author_name.trim(),
      author_email: author_email?.trim() || '',
      content: content.trim(),
      status: 'pending',
    });

    // Send notification email to site owner
    const adminEmail = 'hello@beastlyfacts.com';
    await base44.asServiceRole.integrations.Core.SendEmail({
      to: adminEmail,
      from_name: 'Beastly Facts Comments',
      subject: `New comment pending approval on "${post_title || post_id}"`,
      body: `A new comment has been submitted and is pending your approval.\n\n` +
        `Post: ${post_title || post_id}\n` +
        `Name: ${author_name}\n` +
        `Email: ${author_email || 'not provided'}\n\n` +
        `Comment:\n${content}\n\n` +
        `To approve or reject, log in to your dashboard and manage the BlogComment entity.\n` +
        `Comment ID: ${comment.id}`
    });

    return Response.json({ success: true, message: 'Comment submitted for moderation!' });
  } catch (error) {
    console.error('submitBlogComment error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});