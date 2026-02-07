import GridBackground from "@/components/GridBackground";
import SocialIcon from "@/components/SocialIcon";
import { getSectionContent } from "@/lib/content";

type SocialLink = {
  label?: string;
  url?: string;
  icon?: string;
};

export default async function Home() {
  const [hero, experience, education, projects] = await Promise.all([
    getSectionContent("hero"),
    getSectionContent("experience"),
    getSectionContent("education"),
    getSectionContent("projects"),
  ]);

  const heroData = hero.data as {
    name?: string;
    title?: string;
    social?: SocialLink[];
  };

  const socialLinks = Array.isArray(heroData.social) ? heroData.social : [];

  return (
    <main className="page">
      <GridBackground />
      <div className="container">
        <section className="card hero-card">
          {heroData.title ? <p className="hero-tag">{heroData.title}</p> : null}
          <h1 className="hero-name">{heroData.name ?? "Satya Ananda"}</h1>
          <div
            className="markdown hero-desc"
            dangerouslySetInnerHTML={{ __html: hero.html }}
          />
          <div className="socials">
            {socialLinks.map((link) => (
              <a
                key={`${link.label}-${link.url}`}
                className="social-link"
                href={link.url ?? "#"}
                aria-label={link.label ?? "Social link"}
              >
                <span className="social-icon">
                  <SocialIcon name={link.icon ?? "link"} />
                </span>
                <span className="social-label">{link.label ?? "Link"}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="card section-card">
          <h2 className="section-title">
            {(experience.data.title as string) ?? "Experience"}
          </h2>
          <div
            className="markdown"
            dangerouslySetInnerHTML={{ __html: experience.html }}
          />
        </section>

        <section className="card section-card">
          <h2 className="section-title">
            {(education.data.title as string) ?? "Education"}
          </h2>
          <div
            className="markdown"
            dangerouslySetInnerHTML={{ __html: education.html }}
          />
        </section>

        <section className="card section-card">
          <h2 className="section-title">
            {(projects.data.title as string) ?? "Projects"}
          </h2>
          <div
            className="markdown"
            dangerouslySetInnerHTML={{ __html: projects.html }}
          />
        </section>
      </div>
    </main>
  );
}
