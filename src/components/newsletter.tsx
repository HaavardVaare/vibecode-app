export function Newsletter() {
  return (
    <section className="section container-prose text-center">
      <p className="eyebrow mb-4 text-muted">Stay close</p>
      <h2 className="heading-1">Be first to know</h2>
      <p className="mx-auto mt-4 max-w-sm text-muted">
        New arrivals, private sales and stories from the atelier, delivered
        sparingly.
      </p>
      <form className="mx-auto mt-8 flex max-w-lg flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="Email address"
          className="field flex-1"
        />
        <button type="submit" className="btn btn-primary">
          Subscribe
        </button>
      </form>
    </section>
  );
}
