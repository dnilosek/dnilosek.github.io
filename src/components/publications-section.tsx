import React from "react";
import { Card, CardBody, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useBibtex } from "../hooks/use-bibtex";
import { LoadingState } from "./loading-state";
import { ErrorState } from "./error-state";

export const PublicationsSection: React.FC = () => {
  const { publications, loading, error } = useBibtex();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;

  const formatVenue = (pub: any) => {
    if (pub.journal) return pub.journal;
    if (pub.booktitle) return pub.booktitle;
    if (pub.publisher) return pub.publisher;
    return null;
  };

  const formatAuthors = (authors: string[]) => {
    return authors
      .map((author) => {
        // Convert "Last, First" to "First Last"
        if (author.includes(",")) {
          const [last, first] = author.split(",").map((s) => s.trim());
          return `${first} ${last}`;
        }
        return author;
      })
      .join(", ");
  };

  return (
    <Card>
      <CardBody className="py-6 lg:py-4 px-6 gap-6">
        <h2 className="text-2xl font-bold text-primary">Publications</h2>

        <div className="space-y-6">
          {publications.map((pub, index) => (
            <div key={pub.id}>
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold">{pub.title}</h3>
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="lucide:calendar"
                      className="text-small text-default-500"
                    />
                    <span className="text-small text-default-500">
                      {pub.year}
                    </span>
                  </div>
                </div>

                <p className="text-medium">{formatAuthors(pub.authors)}</p>

                {formatVenue(pub) && (
                  <p className="text-small text-default-500 italic">
                    {formatVenue(pub)}
                  </p>
                )}

                {pub.note && (
                  <p className="text-small text-default-600">{pub.note}</p>
                )}
              </div>

              {index < publications.length - 1 && <Divider className="mt-4" />}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
