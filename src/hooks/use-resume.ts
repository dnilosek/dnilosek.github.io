import React from "react";
import yaml from "js-yaml";
import { Resume } from "../types/resume";

export const useResume = () => {
  const [resume, setResume] = React.useState<Resume | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_RESUME_DATA_URL || ""
        );

        const yamlText = await response.text();
        const parsedResume = yaml.load(yamlText) as Resume;
        setResume(parsedResume);
      } catch (err) {
        console.error("Error fetching resume:", err);
        setError(
          err instanceof Error ? err : new Error("Unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  return { resume, loading, error };
};
