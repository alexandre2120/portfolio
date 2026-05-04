type Role = {
  date: string
  role: string
  company: string
  desc: string
  tag: string
}

const ROLES: Role[] = [
  {
    date: "2025 → Present",
    role: "Director",
    company: "ChatGuru",
    desc: "Strategic leadership driving digital transformation and operational excellence across the organization.",
    tag: "Leadership",
  },
  {
    date: "2021 → 2025",
    role: "CEO & Founder",
    company: "IntegraNinja",
    desc: "Founded a service company specialized in automation and API integrations. Delivered projects across legal, retail, healthcare, real estate, and professional services using n8n, Make, Next.js, and Python microservices.",
    tag: "Founder",
  },
  {
    date: "2020 → 2025",
    role: "Head of Operations",
    company: "ChatGuru",
    desc: "Led cross-functional teams in process optimization, AI integration, and scaling operations for the SaaS platform. Reduced manual processes by 60%+ through automation.",
    tag: "Operations",
  },
  {
    date: "2020",
    role: "Manager of Customer Success",
    company: "ChatGuru",
    desc: "Built and managed the Customer Success team. Established processes for onboarding, retention, and expansion.",
    tag: "CS",
  },
  {
    date: "2019 → 2020",
    role: "Customer Success Analyst",
    company: "ChatGuru",
    desc: "First CS hire. Handled customer onboarding, support, and success workflows from the ground up.",
    tag: "First hire",
  },
]

export function Experience() {
  return (
    <section className="sec" id="experience">
      <div className="wrap">
        <div className="sec-head">
          <div className="num-col">
            <div className="big">/04</div>
            <div className="lab">Experience</div>
          </div>
          <div className="title-col">
            <h2>
              From CS to <span className="it">CEO</span>
              <br />
              and back to code.
            </h2>
          </div>
          <div className="meta-col mono">
            2019 → present
            <br />
            7 years
          </div>
        </div>

        <div className="timeline">
          <div className="tl-list">
            {ROLES.map((r) => (
              <div key={`${r.role}-${r.date}`} className="tl-row reveal">
                <div className="tl-date">{r.date}</div>
                <div className="tl-role">
                  {r.role}
                  <em>{r.company}</em>
                </div>
                <div className="tl-desc">{r.desc}</div>
                <div className="tl-tag">{r.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
