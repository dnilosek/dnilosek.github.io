import React from "react";
import { Card, CardBody, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useResume } from "../hooks/use-resume";

export const ExperienceSection: React.FC = () => {
  const { resume } = useResume();

  if (!resume) return null;

  const { experience } = resume.cv.sections;

  // Format date from YYYY-MM to Month YYYY
  const formatDate = (dateStr: string): string => {
    if (dateStr === "present") return "present";

    const [year, month] = dateStr.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  // Create period string from start and end dates
  const formatPeriod = (start: string, end: string): string => {
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  // Check if location contains "Remote"
  const isRemote = (location: string): boolean => {
    return location.toLowerCase().includes("remote");
  };

  // Extract location without "(Remote)" part
  const extractLocation = (location: string): string => {
    return location.replace(/\s*\(Remote\)\s*/, "");
  };

  return (
    <Card>
      <CardBody className="py-6 lg:py-4 px-6 gap-6">
        <h2 className="text-2xl font-bold text-primary">
          Professional Experience
        </h2>

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <div key={`${exp.company}-${exp.position}`}>
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-xl font-semibold">{exp.position}</h3>
                  <p className="text-medium text-primary">{exp.company}</p>
                </div>
                <div className="flex flex-col items-start sm:items-end">
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="lucide:map-pin"
                      className="text-small text-default-500"
                    />
                    <span className="text-small text-default-500">
                      {extractLocation(exp.location)}
                    </span>
                    {isRemote(exp.location) && (
                      <span className="ml-1 rounded-full bg-default-100 px-2 py-0.5 text-tiny text-default-700">
                        Remote
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="lucide:calendar"
                      className="text-small text-default-500"
                    />
                    <span className="text-small text-default-500">
                      {formatPeriod(exp.start_date, exp.end_date)}
                    </span>
                  </div>
                </div>
              </div>

              <ul className="mt-3 list-inside space-y-2 text-medium">
                {exp.highlights.map((highlight, respIndex) => (
                  <li key={respIndex} className="flex items-start">
                    <Icon
                      icon="lucide:chevrons-right"
                      className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {index < experience.length - 1 && <Divider className="mt-6" />}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
