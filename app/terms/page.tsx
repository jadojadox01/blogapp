export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <section className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Terms & Conditions
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          Last updated: July 2025
        </p>

        <div className="space-y-6 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
          <p>
            By accessing and using this website, you agree to comply with and be
            bound by the following terms and conditions of use.
          </p>

          <p>
            The content provided is for informational purposes only, and we make no
            guarantees about its accuracy or completeness.
          </p>

          <p>
            Unauthorized use of this site may give rise to a claim for damages
            and/or be considered a criminal offense.
          </p>

          <p>
            We reserve the right to modify these terms at any time without prior
            notice. Please review them regularly to stay informed of any changes.
          </p>
        </div>
      </section>
    </main>
  );
}
