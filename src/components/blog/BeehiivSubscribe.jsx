export default function BeehiivSubscribe() {
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-white">Join The Critter Digest 🐾</h3>
        <p className="text-sm text-zinc-400 mt-1.5">
          Get weekly wild facts + exclusive updates straight to your inbox.
        </p>
      </div>

      {/* Official Beehiiv Embed */}
      <script async src="https://subscribe-forms.beehiiv.com/v3/loader.js" data-beehiiv-form="3e7bc205-739d-43a2-8468-7718e54540f5"></script>

      <p className="text-[10px] text-center text-zinc-500 mt-4">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}