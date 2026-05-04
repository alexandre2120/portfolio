type SkillRow = { name: string; pct: number }
type SkillCard = { num: string; title: string; rows: SkillRow[] }

const CARDS: SkillCard[] = [
  {
    num: "/01",
    title: "Development",
    rows: [
      { name: "JavaScript / TypeScript", pct: 85 },
      { name: "React & Next.js", pct: 85 },
      { name: "RESTful APIs", pct: 95 },
      { name: "Supabase / MongoDB", pct: 90 },
    ],
  },
  {
    num: "/02",
    title: "AI & Automation",
    rows: [
      { name: "Claude Code", pct: 95 },
      { name: "AI / LLM APIs", pct: 95 },
      { name: "n8n / Make", pct: 95 },
      { name: "Python Scripting", pct: 90 },
    ],
  },
  {
    num: "/03",
    title: "Infrastructure",
    rows: [
      { name: "Cloud Servers", pct: 80 },
      { name: "Docker / K8s", pct: 65 },
      { name: "Workflow Automation", pct: 95 },
      { name: "Data Analysis", pct: 90 },
    ],
  },
  {
    num: "/04",
    title: "Leadership",
    rows: [
      { name: "Team Management", pct: 95 },
      { name: "Strategic Planning", pct: 85 },
      { name: "Performance Metrics", pct: 90 },
      { name: "Process Optimization", pct: 95 },
    ],
  },
]

export function Skills() {
  return (
    <section className="sec" id="skills">
      <div className="wrap">
        <div className="sec-head">
          <div className="num-col">
            <div className="big">/05</div>
            <div className="lab">Skills</div>
          </div>
          <div className="title-col">
            <h2>
              What I <span className="it">do</span>
              <br />
              well, by area.
            </h2>
          </div>
          <div className="meta-col mono">
            04 categories
            <br />
            17 disciplines
          </div>
        </div>

        <div className="skills">
          {CARDS.map((card) => (
            <div key={card.num} className="skill-card">
              <span className="num">{card.num}</span>
              <h3>{card.title}</h3>
              <div className="skill-list">
                {card.rows.map((r) => (
                  <div
                    key={r.name}
                    className="skill-row"
                    style={
                      { "--p": (r.pct / 100).toString() } as React.CSSProperties
                    }
                  >
                    <div className="top">
                      <span className="name">{r.name}</span>
                      <span className="pct">{r.pct}</span>
                    </div>
                    <div className="skill-bar">
                      <div className="fill" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
