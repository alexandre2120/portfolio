export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="inner">
          <div className="available">
            <span
              style={{
                display: "inline-block",
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
            Available for work · Q2 — Q3 2026
          </div>
          <h2>
            Let&apos;s <span className="it">build</span>
            <br />
            something good.
          </h2>
          <a href="mailto:alexandrjaques@gmail.com" className="email">
            <span>alexandrjaques@gmail.com</span>
            <span>↗</span>
          </a>
          <div className="socials">
            <a
              href="https://github.com/alexandre2120"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <span className="arr">↗</span>
            </a>
            <a
              href="https://www.linkedin.com/in/alexandre-jaques-b66249135/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <span className="arr">↗</span>
            </a>
            <a
              href="https://www.instagram.com/alexandrejaquees/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram <span className="arr">↗</span>
            </a>
            <a href="mailto:alexandrjaques@gmail.com">
              Email <span className="arr">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
