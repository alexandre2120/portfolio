import Image from "next/image"

export function About() {
  return (
    <section className="sec" id="about">
      <div className="wrap">
        <div className="sec-head">
          <div className="num-col">
            <div className="big">/01</div>
            <div className="lab">About</div>
          </div>
          <div className="title-col">
            <h2>
              An engineer
              <br />
              who <span className="it">runs ops.</span>
            </h2>
          </div>
          <div className="meta-col mono">
            Section 01 / 05
            <br />
            Last updated · 04.05.26
          </div>
        </div>

        <div className="about-grid">
          <div className="about-portrait reveal">
            <div className="frame">
              <Image
                src="/portrait-suit.jpg"
                alt="Alexandre Jaques"
                fill
                sizes="(max-width: 900px) 100vw, 30vw"
                style={{ objectFit: "cover" }}
              />
              <div className="corners">
                <i />
              </div>
            </div>
            <div className="tag">
              <span>Alexandre Jaques · Lisbon</span>
              <span>EST. 2019 — 6Y</span>
            </div>
          </div>

          <div className="about-body reveal">
            <p className="about-lede">
              Six years at a SaaS startup taught me that <em>shipping</em> is
              just the beginning — what compounds is the system around it.
            </p>
            <p className="about-p">
              I&apos;m a Full-Stack Developer based in Lisbon with an unusual
              combination: 6+ years of Operations leadership at ChatGuru,
              founding IntegraNinja to design automation systems for clients in
              legal, retail, healthcare, and real estate, and hands-on
              engineering across the React/Next.js stack.
            </p>
            <p className="about-p">
              Lately I&apos;ve been deep in AI Engineering — Claude Code, LLM
              APIs, agentic workflows — and integrating them into the kind of
              operational backbones I spent years optimizing by hand. Currently
              studying AI &amp; Machine Learning Engineering, focused on
              building scalable, useful systems.
            </p>

            <div className="about-stats">
              <div className="stat">
                <div className="v">
                  6<sup>+</sup>
                </div>
                <div className="l">Years in SaaS</div>
              </div>
              <div className="stat">
                <div className="v">
                  60<sup>%</sup>
                </div>
                <div className="l">Manual work cut</div>
              </div>
              <div className="stat">
                <div className="v">5</div>
                <div className="l">Active products</div>
              </div>
              <div className="stat">
                <div className="v">∞</div>
                <div className="l">Workflows shipped</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
