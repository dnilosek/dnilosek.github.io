import React from "react";
import { BibtexParser } from "bibtex-js-parser";

export interface Publication {
  id: string;
  type: string;
  title: string;
  authors: string[];
  year: string;
  venue?: string;
  journal?: string;
  booktitle?: string;
  publisher?: string;
  note?: string;
  volume?: string;
  number?: string;
  pages?: string;
  organization?: string;
  month?: string;
}

export const useBibtex = () => {
  const [publications, setPublications] = React.useState<Publication[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const loadBibtex = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch from Google Scholar via CORS proxy
        const scholarUrl =
          import.meta.env.VITE_GOOGLE_SCHOLAR_DOWNLOAD_URL || "";

        const response = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(scholarUrl)}`
        );
        const data = await response.json();
        let bibtexText = data.contents;

        // Clean up problematic lines with # symbols and add missing commas
        const lines = bibtexText.split("\n");
        const cleanedLines = [];

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const nextLine = lines[i + 1];

          // Remove lines that contain # for string concatenation
          if (line.includes("#")) {
            // Skip these problematic lines entirely
            continue;
          }

          // Skip lines with empty field values that cause parsing issues
          if (line.match(/^\s*\w+\s*=\s*\{\s*\}\s*,?\s*$/)) {
            continue;
          }

          // Clean up LaTeX special characters that cause parsing issues
          let cleanedLine = line
            .replace(/\{\\~n\}/g, "ñ")
            .replace(/\{\\~a\}/g, "ã")
            .replace(/\{\\~o\}/g, "õ")
            .replace(/\{\\'\{?e\}?\}/g, "é")
            .replace(/\{\\'\{?a\}?\}/g, "á")
            .replace(/\{\\'\{?i\}?\}/g, "í")
            .replace(/\{\\'\{?o\}?\}/g, "ó")
            .replace(/\{\\'\{?u\}?\}/g, "ú")
            .replace(/\{\\\.\{?([a-z])\}\}/g, "$1") // Remove dot accents
            .replace(/\{\\[`^'"~.=uvH]\{?([a-z])\}?\}/g, "$1") // Remove other accents
            .replace(/\\/g, "") // Remove all backslashes
            .replace(/&/g, "and"); // Replace ampersands with 'and'

          // Check if this is a field line (contains =) and next line is closing brace
          if (
            cleanedLine.includes("=") &&
            nextLine &&
            nextLine.trim() === "}"
          ) {
            // This is the last field in an entry, ensure it ends with comma
            if (!cleanedLine.trim().endsWith(",")) {
              cleanedLines.push(cleanedLine + ",");
            } else {
              cleanedLines.push(cleanedLine);
            }
          } else {
            cleanedLines.push(cleanedLine);
          }
        }

        bibtexText = cleanedLines
          .filter((line: string) => line.trim() !== "")
          .join("\n");

        console.log("Cleaned BibTeX text:", bibtexText);
        // Parse the bibtex
        const parsedEntries = BibtexParser.parseToJSON(bibtexText);

        console.log("Parsed BibTeX entries:", parsedEntries);

        // Transform to our Publication interface
        const transformedPublications: Publication[] = parsedEntries.map(
          (entry: any) => {
            const authors = entry.author
              ? entry.author
                  .split(" and ")
                  .map((author: string) => author.trim())
              : [];

            return {
              id: entry.id,
              type: entry.type,
              title: entry.title || "",
              authors,
              year: entry.year || "",
              venue: entry.journal || entry.booktitle || entry.publisher,
              journal: entry.journal,
              booktitle: entry.booktitle,
              publisher: entry.publisher,
              note: entry.note,
              volume: entry.volume,
              number: entry.number,
              pages: entry.pages,
              organization: entry.organization,
              month: entry.month,
            };
          }
        );

        // Sort by year (newest first)
        transformedPublications.sort(
          (a, b) => parseInt(b.year) - parseInt(a.year)
        );

        setPublications(transformedPublications);
      } catch (err) {
        console.error("Failed to load bibtex:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to load bibtex")
        );
      } finally {
        setLoading(false);
      }
    };

    loadBibtex();
  }, []);

  return { publications, loading, error };
};
