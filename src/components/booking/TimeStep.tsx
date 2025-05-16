
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TimeSlot } from "@/types/appointment";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TimeStepProps {
  selectedDate: Date | undefined;
  selectedTime: string;
  onTimeSelect: (time: string) => void;
}

const TimeStep: React.FC<TimeStepProps> = ({
  selectedDate,
  selectedTime,
  onTimeSelect,
}) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  // Simulating loading available time slots for the selected date
  useEffect(() => {
    if (!selectedDate) return;

    // In a real application, this would be an API call
    const generateTimeSlots = () => {
      const slots: TimeSlot[] = [];
      const startHour = 8;
      const endHour = 17;
      const interval = 30; // minutes

      for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += interval) {
          const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
          
          // Randomly determine if the slot is available (in a real app this would come from backend)
          const available = Math.random() > 0.3;
          
          slots.push({
            id: `slot-${hour}-${minute}`,
            time,
            available,
          });
        }
      }
      return slots;
    };

    // Simulate API delay
    setTimeout(() => {
      setTimeSlots(generateTimeSlots());
    }, 300);

  }, [selectedDate]);

  const formattedDate = selectedDate 
    ? format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })
    : "";

  return (
    <Card className="border-booking-accent/20">
      <CardContent className="pt-6">
        <h3 className="text-xl font-medium text-center mb-4">
          Selecione o horário disponível
        </h3>
        <p className="text-center text-booking-primary mb-4 capitalize">
          {formattedDate}
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-4">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              className={cn(
                "py-2 px-4 rounded-md text-sm font-medium transition-colors",
                slot.available
                  ? slot.time === selectedTime
                    ? "bg-booking-primary text-white"
                    : "bg-booking-light text-booking-primary hover:bg-booking-accent/30"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
              )}
              disabled={!slot.available}
              onClick={() => slot.available && onTimeSelect(slot.time)}
            >
              {slot.time}
            </button>
          ))}
        </div>

        {timeSlots.length === 0 && (
          <div className="flex justify-center items-center h-40">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-4 bg-booking-light rounded w-48 mb-4"></div>
              <div className="grid grid-cols-3 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-8 bg-booking-light rounded w-20"></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TimeStep;
