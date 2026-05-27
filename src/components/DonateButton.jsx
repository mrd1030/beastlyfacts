import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart } from 'lucide-react';
import DonateModal from './DonateModal';

export default function DonateButton({ className, variant = "secondary" }) {
  return (
    <DonateModal>
      <Button className={className} variant={variant}>
        <Heart className="mr-2 h-4 w-4 fill-white" />
        Donate
      </Button>
    </DonateModal>
  );
}