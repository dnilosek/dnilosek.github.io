import React from "react";
import { Card, CardBody, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useResume } from "../hooks/use-resume";

export const AboutSection: React.FC = () => {
  const { resume } = useResume();

  if (!resume) return null;

  const { about_me, skills } = resume.cv.sections;

  return (
    <Card>
      <CardBody className="py-6 lg:py-4 px-6 gap-6">
        <div>
          <h2 className="text-2xl font-bold text-primary">About Me</h2>
          {about_me.map((paragraph, index) => (
            <p
              key={index}
              className={index === 0 ? "mt-2 text-medium" : "mt-4 text-medium"}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-primary">Skills</h3>

          {skills.map((skill, index) => (
            <div key={index} className={index === 0 ? "mt-3" : "mt-4"}>
              <h4 className="mb-2 flex items-center gap-2 text-medium font-medium">
                <Icon
                  icon={
                    skill.label.toLowerCase().includes("programming")
                      ? "lucide:code"
                      : skill.label.toLowerCase().includes("framework")
                      ? "lucide:layers"
                      : "lucide:lightbulb"
                  }
                  className="text-primary"
                />
                {skill.label}
              </h4>
              <div className="flex flex-wrap gap-2">
                {skill.details.split(", ").map((item) => (
                  <Chip key={item} variant="flat" size="sm">
                    {item}
                  </Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
