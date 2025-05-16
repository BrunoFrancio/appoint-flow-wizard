
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AppointmentData, CustomerInfo, StepType } from "@/types/appointment";
import ProgressBar from "./ProgressBar";
import DateStep from "./DateStep";
import TimeStep from "./TimeStep";
import ServiceStep from "./ServiceStep";
import InfoStep from "./InfoStep";
import SummaryStep from "./SummaryStep";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const steps = [
  { id: "date" as StepType, label: "Data" },
  { id: "time" as StepType, label: "Horário" },
  { id: "service" as StepType, label: "Serviço" },
  { id: "info" as StepType, label: "Dados" },
  { id: "summary" as StepType, label: "Resumo" },
];

const AppointmentStepper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    date: undefined,
    time: "",
    service: "",
    customerInfo: {
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });
  const [formRef, setFormRef] = useState<HTMLFormElement | null>(null);

  const handleDateSelect = (date: Date | undefined) => {
    setAppointmentData({ ...appointmentData, date });
  };

  const handleTimeSelect = (time: string) => {
    setAppointmentData({ ...appointmentData, time });
  };

  const handleServiceSelect = (serviceId: string) => {
    setAppointmentData({ ...appointmentData, service: serviceId });
  };

  const handleInfoSubmit = (data: CustomerInfo) => {
    setAppointmentData({
      ...appointmentData,
      customerInfo: data,
    });
  };

  const handleNext = () => {
    // Validation for each step before proceeding
    if (currentStep === 0 && !appointmentData.date) {
      toast.error("Por favor, selecione uma data para continuar.");
      return;
    }

    if (currentStep === 1 && !appointmentData.time) {
      toast.error("Por favor, selecione um horário para continuar.");
      return;
    }

    if (currentStep === 2 && !appointmentData.service) {
      toast.error("Por favor, selecione um serviço para continuar.");
      return;
    }

    if (currentStep === 3) {
      // For the info step, we need to submit the form
      if (formRef) {
        formRef.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
      }
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    // Final submission would normally involve an API call
    console.log("Appointment submitted:", appointmentData);
    // The actual submission is handled in the SummaryStep component
  };

  // Set form reference for the personal info step
  useEffect(() => {
    if (currentStep === 3) {
      setFormRef(document.querySelector("form"));
    } else {
      setFormRef(null);
    }
  }, [currentStep]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-booking-primary">
          Agende sua consulta
        </h2>
        <p className="text-center text-booking-gray mt-2">
          Complete as etapas abaixo para agendar sua consulta
        </p>
      </div>

      <ProgressBar currentStep={currentStep} steps={steps} />

      <div className="mb-8">
        {currentStep === 0 && (
          <DateStep
            selectedDate={appointmentData.date}
            onDateSelect={handleDateSelect}
          />
        )}

        {currentStep === 1 && (
          <TimeStep
            selectedDate={appointmentData.date}
            selectedTime={appointmentData.time}
            onTimeSelect={handleTimeSelect}
          />
        )}

        {currentStep === 2 && (
          <ServiceStep
            selectedService={appointmentData.service}
            onServiceSelect={handleServiceSelect}
          />
        )}

        {currentStep === 3 && (
          <InfoStep
            customerInfo={appointmentData.customerInfo}
            onInfoSubmit={handleInfoSubmit}
            onNext={() => setCurrentStep(currentStep + 1)}
          />
        )}

        {currentStep === 4 && (
          <SummaryStep
            appointmentData={appointmentData}
            onSubmit={handleSubmit}
          />
        )}
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`${
            currentStep === 0 ? "invisible" : ""
          } border-booking-primary text-booking-primary hover:bg-booking-light`}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        {currentStep < 4 && (
          <Button
            onClick={handleNext}
            className="bg-booking-primary hover:bg-booking-secondary ml-auto"
          >
            {currentStep === 3 ? "Revisar" : "Próximo"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default AppointmentStepper;
