"use client";
import axios from "axios";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.log("[BILING_ERROR]", error);
      toast.error("Something went Wrong\nTry Again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button disabled={loading} variant={isPro ? "default" : "premium"}>
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};

export default SubscriptionButton;
