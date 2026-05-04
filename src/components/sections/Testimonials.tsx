type Quote = {
  body: string
  initials: string
  name: string
  role: string
}

const QUOTES: Quote[] = [
  {
    body: "Alexandre was our very first hire at ChatGuru, and since then he has proven to be an extremely versatile, committed, and responsible professional. He has a unique ability to learn and adapt, is easy to work with, intelligent, and someone you can trust completely.",
    initials: "FC",
    name: "Fernando Cavalcanti",
    role: "CEO & Co-Founder · ChatGuru",
  },
  {
    body: "Alex was one of the first people at ChatGuru and played a key role in our growth. He learns fast, adapts quickly, and consistently delivered what we needed, even in the most demanding moments. Reliable, easy to work with, and very attentive to details.",
    initials: "IS",
    name: "Iaron Simis",
    role: "Co-Founder & CTO · ChatGuru",
  },
]

export function Testimonials() {
  return (
    <section className="sec" id="testimonials">
      <div className="wrap">
        <div className="sec-head">
          <div className="num-col">
            <div className="big">/06</div>
            <div className="lab">Testimonials</div>
          </div>
          <div className="title-col">
            <h2>
              What <span className="it">colleagues</span>
              <br />
              say.
            </h2>
          </div>
          <div className="meta-col mono">
            02 quotes
            <br />
            ChatGuru founders
          </div>
        </div>

        <div className="quotes">
          {QUOTES.map((q) => (
            <div key={q.name} className="quote reveal">
              <p className="quote-body">{q.body}</p>
              <div className="quote-foot">
                <div className="avatar">{q.initials}</div>
                <div className="who">
                  <span className="n">{q.name}</span>
                  <span className="r">{q.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
