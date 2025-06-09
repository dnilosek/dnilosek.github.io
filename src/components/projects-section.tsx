import React from "react";
import { Card, CardBody, Link, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useResume } from "../hooks/use-resume";

export const ProjectsSection: React.FC = () => {
  const { resume } = useResume();

  if (!resume) return null;

  const { projects } = resume.cv.sections;

  // Format date from YYYY-MM to Month YYYY
  const formatDate = (dateStr: string): string => {
    const [year, month] = dateStr.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  // Extract project name and link from markdown format "[Name](url)"
  const extractProjectInfo = (nameField: string) => {
    const linkMatch = nameField.match(/\[(.*?)\]\((.*?)\)/);
    if (linkMatch) {
      return {
        name: linkMatch[1],
        link: linkMatch[2],
      };
    }
    return { name: nameField, link: undefined };
  };

  return (
    <Card>
      <CardBody className="py-6 lg:py-4 px-6 gap-6">
        <h2 className="text-2xl font-bold text-primary">Projects</h2>

        <div className="space-y-8">
          {projects.map((project) => {
            const { name, link } = extractProjectInfo(project.name);

            return (
              <div key={name} className="rounded-lg border border-divider p-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div>
                    <h3 className="text-xl font-semibold">
                      {link ? (
                        <Link href={link} isExternal color="primary">
                          {name}{" "}
                          <Icon
                            icon="lucide:external-link"
                            className="ml-1 inline h-4 w-4"
                          />
                        </Link>
                      ) : (
                        name
                      )}
                    </h3>
                    <p className="mt-1 text-medium">{project.summary}</p>
                  </div>
                  <div className="flex items-center gap-1 whitespace-nowrap">
                    <Icon
                      icon="lucide:calendar"
                      className="text-small text-default-500"
                    />
                    <span className="text-small text-default-500">
                      {formatDate(project.date)}
                    </span>
                  </div>
                </div>

                <ul className="mt-4 list-inside space-y-2 text-medium">
                  {project.highlights.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <Icon
                        icon="lucide:chevrons-right"
                        className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary"
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
};
