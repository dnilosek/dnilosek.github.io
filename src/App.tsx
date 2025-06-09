import React from "react";
import {
  Card,
  Tabs,
  Tab,
  Divider,
  Link,
  Avatar,
  Chip,
  Button,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { AboutSection } from "./components/about-section";
import { ExperienceSection } from "./components/experience-section";
import { EducationSection } from "./components/education-section";
import { ProjectsSection } from "./components/projects-section";
import { PublicationsSection } from "./components/publications-section";
import { ContactSection } from "./components/contact-section";
import { useResume } from "./hooks/use-resume";
import { LoadingState } from "./components/loading-state";
import { ErrorState } from "./components/error-state";

export default function App() {
  const [selected, setSelected] = React.useState("about");
  const [isLargeScreen, setIsLargeScreen] = React.useState(
    window.innerWidth >= 1024
  );
  const { resume, loading, error } = useResume();

  React.useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle retry on error
  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 text-foreground">
        <LoadingState message="Loading resume data..." />
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="min-h-screen bg-background p-4 text-foreground">
        <ErrorState
          message="Failed to load resume data. Please check your connection and try again."
          onRetry={handleRetry}
        />
      </div>
    );
  }

  const { cv } = resume;
  const { social_networks } = cv;

  // Get social network URLs
  const getSocialUrl = (network: string, username: string): string => {
    switch (network.toLowerCase()) {
      case "github":
        return `https://github.com/${username}`;
      case "linkedin":
        return `https://linkedin.com/in/${username}`;
      case "google scholar":
        return `https://scholar.google.com/citations?user=${username}`;
      default:
        return "#";
    }
  };

  // Get social network icon
  const getSocialIcon = (network: string): string => {
    switch (network.toLowerCase()) {
      case "github":
        return "logos:github-icon";
      case "linkedin":
        return "logos:linkedin-icon";
      case "google scholar":
        return "logos:google-icon";
      default:
        return "lucide:link";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-12 md:px-6">
        <div className="mb-12 flex flex-col items-center">
          <Avatar
            src="/avatar.jpg"
            alt="Dave Nilosek"
            className="h-32 w-32 text-large"
            isBordered
            color="primary"
          />
          <h1 className="mt-4 text-4xl font-bold text-primary">{cv.name}</h1>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
            <Chip
              startContent={
                <Icon icon="lucide:map-pin" className="text-primary" />
              }
              variant="flat"
              size="sm"
            >
              {cv.location}
            </Chip>
            <Chip
              startContent={
                <Icon icon="lucide:mail" className="text-primary" />
              }
              variant="flat"
              size="sm"
            >
              {cv.email}
            </Chip>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex gap-3">
              {social_networks.map((social) => (
                <Link
                  key={social.network}
                  href={getSocialUrl(social.network, social.username)}
                  isExternal
                >
                  <Icon
                    icon={getSocialIcon(social.network)}
                    className="h-6 w-6"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Card className="mx-auto max-w-5xl">
          <Tabs
            aria-label="Portfolio sections"
            selectedKey={selected}
            onSelectionChange={setSelected}
            isVertical={isLargeScreen}
            variant="underlined"
            color="primary"
            classNames={{
              tabList: "px-6 pt-2 flex flex-wrap",
              cursor: "w-full bg-primary",
            }}
          >
            <Tab
              key="about"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:user" />
                  <span>About</span>
                </div>
              }
              className="w-full px-0"
            >
              <AboutSection />
            </Tab>
            <Tab
              key="experience"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:briefcase" />
                  <span>Experience</span>
                </div>
              }
              className="w-full px-0"
            >
              <ExperienceSection />
            </Tab>
            <Tab
              key="education"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:book" />
                  <span>Education</span>
                </div>
              }
              className="w-full px-0"
            >
              <EducationSection />
            </Tab>
            <Tab
              key="projects"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:code" />
                  <span>Projects</span>
                </div>
              }
              className="w-full px-0"
            >
              <ProjectsSection />
            </Tab>
            <Tab
              key="publications"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:book-open" />
                  <span>Publications</span>
                </div>
              }
              className="w-full px-0"
            >
              <PublicationsSection />
            </Tab>
            <Tab
              key="contact"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:phone" />
                  <span>Contact</span>
                </div>
              }
              className="w-full px-0"
            >
              <ContactSection />
            </Tab>
          </Tabs>
        </Card>

        <div className="mt-12 flex flex-col items-center">
          <Button
            as={Link}
            href="https://github.com/dnilosek/resume/releases/latest/download/nilosek_resume.pdf"
            color="primary"
            variant="solid"
            startContent={<Icon icon="lucide:download" />}
            isExternal
          >
            Download Resume
          </Button>
        </div>
      </main>

      <footer className="mt-12 border-t border-divider py-6 text-center text-small text-default-500">
        <div className="container mx-auto">
          <p>
            © {new Date().getFullYear()} Dave Nilosek, PhD. All rights reserved.
          </p>
          <p className="mt-1">Last updated: June 2025</p>
        </div>
      </footer>
    </div>
  );
}
