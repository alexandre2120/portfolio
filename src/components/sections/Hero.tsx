import Image from "next/image"

export function Hero() {
  return (
    <>
      <section className="hero" id="top">
        <div className="wrap">
          <div className="hero-meta mono">
            <div className="col">
              <span>Index/01</span>
              <span>Portfolio &mdash; 2026</span>
            </div>
            <div className="col" style={{ textAlign: "center" }}>
              <span>Lat 38.7223° N</span>
              <span>Lon 9.1393° W</span>
            </div>
            <div className="col" style={{ textAlign: "right" }}>
              <span>Status</span>
              <span style={{ color: "#22c55e" }}>Available for work</span>
            </div>
          </div>

          <h1>
            Alexandre
            <br />
            <span className="it">
              Jaques<span className="accent">.</span>
            </span>
          </h1>

          <div className="hero-sub">
            <p className="lede">
              Full-stack developer based in Lisbon — I build{" "}
              <em>scalable products</em>, AI workflows, and the unsexy plumbing
              that makes them ship.
            </p>
            <div className="meta-block">
              <div>
                <span className="lab">Currently</span>
                Director, ChatGuru
                <br />
                Studying AI &amp; ML Engineering
              </div>
              <div>
                <span className="lab">Stack</span>
                JavaScript · TypeScript · React · Next.js
                <br />
                Python · n8n · Make · Supabase
              </div>
              <div>
                <span className="lab">Available</span>
                Selective freelance &amp; collaborations
                <br />
                Q2 — Q3 2026
              </div>
            </div>
          </div>

          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary">
              Get in touch
              <span className="arr">↗</span>
            </a>
            <a href="#work" className="btn">
              View selected work
              <span className="arr">→</span>
            </a>
          </div>

          <div className="stamp">
            <Image
              src="/profile.png"
              alt="Alexandre Jaques"
              fill
              sizes="200px"
              style={{ objectFit: "cover" }}
              priority
            />
            <span className="badge">Lisbon · 2026</span>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>
            Full-Stack <span className="star">✦</span> AI Engineering{" "}
            <span className="star">✦</span> Workflow Automation{" "}
            <span className="star">✦</span> Next.js{" "}
            <span className="star">✦</span> Operations{" "}
            <span className="star">✦</span> Founder{" "}
            <span className="star">✦</span> Lisbon{" "}
            <span className="star">✦</span>
          </span>
          <span>
            Full-Stack <span className="star">✦</span> AI Engineering{" "}
            <span className="star">✦</span> Workflow Automation{" "}
            <span className="star">✦</span> Next.js{" "}
            <span className="star">✦</span> Operations{" "}
            <span className="star">✦</span> Founder{" "}
            <span className="star">✦</span> Lisbon{" "}
            <span className="star">✦</span>
          </span>
        </div>
      </div>
    </>
  )
}
