export default function AboutPage() {
  return (
    <main className="min-h-screen font-montserrat max-w-3xl mx-auto px-6 py-16">
      <section className="prose prose-lg dark:prose-invert">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        
        <p className="text-lg leading-relaxed">
          Welcome to <span className="font-semibold text-primary">Skillnest</span>! This platform is your go-to source for insightful tutorials, thoughtful articles, and engaging content across technology, freelancing, and work from Home.
        </p>

        <p className="text-lg leading-relaxed">
          Our mission is to create valuable resources that not only inform but also inspire. We aim to empower our readers with knowledge, spark new ideas, and keep you updated with practical and fresh information.
        </p>

        <div className="bg-muted p-4 rounded-xl mt-8 shadow-md border border-gray-300 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-2">💬 Get In Touch</h2>
          <p>
            Have questions, ideas, or feedback? We’d love to hear from you.
            <br />
            <a href="/contact" className="text-blue-600 hover:underline dark:text-blue-400">Contact us here →</a>
          </p>
        </div>
      </section>
    </main>
  );
}
