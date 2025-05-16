
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AppointmentData, Service } from "@/types/appointment";
import { toast } from "sonner";
import { Check } from "lucide-react";

interface SummaryStepProps {
  appointmentData: AppointmentData;
  onSubmit: () => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({
  appointmentData,
  onSubmit,
}) => {
  const [service, setService] = useState<Service | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // In a real app, you would fetch this from your API
  useEffect(() => {
    // Simulate getting service details
    const getServiceDetails = () => {
      const services: Record<string, Service> = {
        "1": {
          id: "1",
          name: "Consulta Inicial",
          description: "Avaliação completa para novos pacientes",
          duration: 60,
          price: 250,
        },
        "2": {
          id: "2",
          name: "Retorno",
          description: "Consulta de acompanhamento",
          duration: 30,
          price: 180,
        },
        "3": {
          id: "3",
          name: "Procedimento Especializado",
          description: "Tratamento específico conforme necessidade",
          duration: 45,
          price: 320,
        },
        "4": {
          id: "4",
          name: "Consulta Online",
          description: "Atendimento remoto via videoconferência",
          duration: 40,
          price: 200,
        },
      };

      return services[appointmentData.service];
    };

    setService(getServiceDetails());
  }, [appointmentData.service]);

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Agendamento realizado com sucesso!", {
        description: "Você receberá uma confirmação por e-mail em breve.",
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSubmit();
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <Card className="border-booking-accent/20">
        <CardContent className="pt-6 flex flex-col items-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-medium text-center">Agendamento confirmado!</h3>
          <p className="text-booking-gray text-center mt-2 mb-6">
            Enviamos um e-mail de confirmação para {appointmentData.customerInfo.email}
          </p>
          
          <div className="w-full max-w-md bg-booking-light p-4 rounded-lg mb-6">
            <div className="text-center mb-4">
              <p className="text-sm text-booking-gray">CÓDIGO DA RESERVA</p>
              <p className="text-xl font-bold text-booking-primary">
                #{Math.random().toString(36).substring(2, 8).toUpperCase()}
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-booking-gray">DATA E HORA</p>
              <p className="font-medium">
                {appointmentData.date && format(
                  appointmentData.date,
                  "dd 'de' MMMM 'de' yyyy, EEEE",
                  { locale: ptBR }
                )}
              </p>
              <p className="font-medium">{appointmentData.time}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-booking-accent/20">
      <CardContent className="pt-6">
        <h3 className="text-xl font-medium text-center mb-6">
          Resumo do agendamento
        </h3>

        <div className="space-y-6">
          <div className="bg-booking-light p-4 rounded-lg">
            <h4 className="font-medium mb-2">Data e horário</h4>
            <p className="capitalize">
              {appointmentData.date && format(
                appointmentData.date, 
                "dd 'de' MMMM 'de' yyyy, EEEE", 
                { locale: ptBR }
              )}
            </p>
            <p className="text-booking-primary font-medium">
              {appointmentData.time}
            </p>
          </div>

          <div className="bg-booking-light p-4 rounded-lg">
            <h4 className="font-medium mb-2">Serviço</h4>
            {service && (
              <>
                <p className="text-booking-primary font-medium">
                  {service.name}
                </p>
                <p className="text-sm text-gray-500">{service.description}</p>
                <div className="flex justify-between mt-2">
                  <span>Duração: {service.duration} min</span>
                  <span className="font-medium">R$ {service.price.toFixed(2)}</span>
                </div>
              </>
            )}
          </div>

          <div className="bg-booking-light p-4 rounded-lg">
            <h4 className="font-medium mb-2">Informações de contato</h4>
            <p>{appointmentData.customerInfo.name}</p>
            <p>{appointmentData.customerInfo.email}</p>
            <p>{appointmentData.customerInfo.phone}</p>
            {appointmentData.customerInfo.notes && (
              <div className="mt-2">
                <p className="text-sm font-medium">Observações:</p>
                <p className="text-sm text-gray-500">
                  {appointmentData.customerInfo.notes}
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 text-sm text-center text-booking-gray">
            <p>
              Ao confirmar, você concorda com nossos{" "}
              <a href="#" className="text-booking-primary underline">
                termos de serviço
              </a>{" "}
              e{" "}
              <a href="#" className="text-booking-primary underline">
                política de cancelamento
              </a>
              .
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryStep;
