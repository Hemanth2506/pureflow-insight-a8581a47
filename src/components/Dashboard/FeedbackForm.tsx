import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (feedback.trim()) {
      toast({
        title: "Feedback Received!",
        description: "Thank you for your feedback.",
      });
      setFeedback("");
    } else {
      toast({
        title: "Empty Feedback",
        description: "Please type a message before submitting.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="bg-accent max-w-md mx-auto rounded-2xl p-6 shadow-lg">
      <h3 className="text-2xl font-bold text-primary text-center mb-4">
        Send Feedback
      </h3>
      <Textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Your thoughts..."
        rows={3}
        className="mb-4"
      />
      <Button onClick={handleSubmit} className="w-full bg-primary hover:bg-secondary">
        Submit
      </Button>
    </section>
  );
}
