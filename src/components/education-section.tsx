import React from "react";
import { Card, CardBody, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useResume } from "../hooks/use-resume";

export const EducationSection: React.FC = () => {
  const { resume } = useResume();

  if (!resume) return null;

  const { education } = resume.cv.sections;

  // Format date from YYYY-MM to Month YYYY
  const formatDate = (dateStr: string): string => {
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

  return (
    <Card>
      <CardBody className="py-6 lg:py-4 px-6 gap-6">
        <h2 className="text-2xl font-bold text-primary">Education</h2>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <div key={`${edu.degree}-${edu.institution}`}>
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                <div>
                  <h3 className="text-xl font-semibold">
                    {edu.degree} in {edu.area}
                  </h3>
                  <p className="text-medium text-primary">{edu.institution}</p>
                </div>
                <div className="flex flex-col items-start sm:items-end">
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="lucide:map-pin"
                      className="text-small text-default-500"
                    />
                    <span className="text-small text-default-500">
                      {edu.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="lucide:calendar"
                      className="text-small text-default-500"
                    />
                    <span className="text-small text-default-500">
                      {formatPeriod(edu.start_date, edu.end_date)}
                    </span>
                  </div>
                </div>
              </div>

              {edu.highlights && edu.highlights.length > 0 && (
                <ul className="mt-3 list-inside space-y-2 text-medium">
                  {edu.highlights.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <Icon
                        icon="lucide:chevrons-right"
                        className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary"
                      />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}

              {index < education.length - 1 && <Divider className="mt-6" />}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
