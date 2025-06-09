import React from "react";
import { Card, CardBody, Input, Textarea, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useResume } from "../hooks/use-resume";

export const ContactSection: React.FC = () => {
  const { resume } = useResume();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [error, setError] = React.useState("");

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Validate form fields
    if (!name.trim()) {
      setIsSubmitting(false);
      setError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setIsSubmitting(false);
      setError("Please enter your email address.");
      return;
    }

    if (!isValidEmail(email)) {
      setIsSubmitting(false);
      setError("Please enter a valid email address.");
      return;
    }

    if (!message.trim()) {
      setIsSubmitting(false);
      setError("Please enter a message.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("message", message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        throw new Error(data.message || "Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);
      setError(
        "Failed to send message. Please try again or contact me directly."
      );
    }
  };

  if (!resume) return null;

  const { email: contactEmail, location, social_networks } = resume.cv;

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
    <Card>
      <CardBody className="py-6 lg:py-4 px-6 gap-6">
        <h2 className="text-2xl font-bold text-primary text-center lg:text-left">
          Get In Touch
        </h2>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col lg:block justify-center items-center">
            <h3 className="mb-3 text-lg font-semibold ">Contact Information</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon icon="lucide:mail" className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-small text-default-500">Email</p>
                  <p className="text-medium">{contactEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon icon="lucide:map-pin" className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-small text-default-500">Location</p>
                  <p className="text-medium">{location}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold">Send a Message</h3>

            {isSubmitted ? (
              <div className="rounded-lg bg-success-100 p-4 text-success-700">
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:check-circle" className="h-5 w-5" />
                  <p className="font-medium">Message sent successfully!</p>
                </div>
                <p className="mt-1 text-small">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="bordered"
                  isRequired
                />

                <Input
                  label="Email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  variant="bordered"
                  isRequired
                />

                <Textarea
                  label="Message"
                  placeholder="How can I help you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  variant="bordered"
                  minRows={4}
                  isRequired
                />

                <Button
                  type="submit"
                  color="primary"
                  isLoading={isSubmitting}
                  startContent={!isSubmitting && <Icon icon="lucide:send" />}
                  className="w-full"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
