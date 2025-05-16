
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

interface DateStepProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
}

const DateStep: React.FC<DateStepProps> = ({ selectedDate, onDateSelect }) => {
  // Get current date for disabling past dates
  const today = new Date();
  
  // Function to disable weekends and past dates
  const disabledDays = (date: Date) => {
    const day = date.getDay();
    // Disable weekends (0 is Sunday, 6 is Saturday)
    const isWeekend = day === 0 || day === 6;
    // Disable past dates
    const isPastDate = date < new Date(today.setHours(0, 0, 0, 0));
    
    return isWeekend || isPastDate;
  };

  return (
    <Card className="border-booking-accent/20">
      <CardContent className="pt-6">
        <h3 className="text-xl font-medium text-center mb-4">Selecione uma data para sua consulta</h3>
        <div className="flex justify-center p-2">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            disabled={disabledDays}
            className="rounded-md border-booking-accent/20 p-3 pointer-events-auto"
          />
        </div>
        <p className="text-sm text-booking-gray text-center mt-4">
          * Disponível de segunda a sexta-feira
        </p>
      </CardContent>
    </Card>
  );
};

export default DateStep;
