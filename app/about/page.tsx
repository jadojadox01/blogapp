export default function AboutPage() {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
            About Jean’s Blog
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Empowering minds through stories, tutorials, and tech insights.
          </p>
        </div>
  
        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            Welcome to <strong>Jean’s Blog</strong> — your go-to destination for thoughtful,
            high-quality content across a wide variety of topics including
            <em> technology, lifestyle, and personal development</em>.
          </p>
  
          <p>
            Our mission is to <strong>educate, inspire, and empower</strong> individuals by sharing
            knowledge that matters. Whether you're here to learn something new, stay updated,
            or find motivation, we’ve got something for you.
          </p>
  
          <p>
            We’re committed to delivering content that is not only helpful but also easy
            to digest and beautifully presented. Everything we publish is crafted with
            intention and care.
          </p>
  
          <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-gray-700 dark:text-gray-300">
            &quot;Learning never exhausts the mind." – Leonardo da Vinci
          </blockquote>
  
          <p>
            Have a question, suggestion, or want to collaborate?{' '}
            <a
              href="mailto:contact@jeansblog.com"
              className="text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Contact us
            </a>{' '}
            — we’d love to hear from you!
          </p>
        </div>
      </main>
    );
  }
  