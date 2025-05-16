
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@/types/appointment";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ServiceStepProps {
  selectedService: string;
  onServiceSelect: (serviceId: string) => void;
}

const ServiceStep: React.FC<ServiceStepProps> = ({
  selectedService,
  onServiceSelect,
}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulating loading services data
  useEffect(() => {
    // In a real application, this would be an API call
    const fetchServices = () => {
      const servicesData: Service[] = [
        {
          id: "1",
          name: "Consulta Inicial",
          description: "Avaliação completa para novos pacientes",
          duration: 60,
          price: 250,
        },
        {
          id: "2",
          name: "Retorno",
          description: "Consulta de acompanhamento",
          duration: 30,
          price: 180,
        },
        {
          id: "3",
          name: "Procedimento Especializado",
          description: "Tratamento específico conforme necessidade",
          duration: 45,
          price: 320,
        },
        {
          id: "4",
          name: "Consulta Online",
          description: "Atendimento remoto via videoconferência",
          duration: 40,
          price: 200,
        },
      ];

      setServices(servicesData);
      setLoading(false);
    };

    // Simulate API delay
    setTimeout(() => {
      fetchServices();
    }, 300);
  }, []);

  return (
    <Card className="border-booking-accent/20">
      <CardContent className="pt-6">
        <h3 className="text-xl font-medium text-center mb-6">
          Selecione o serviço desejado
        </h3>

        {loading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="h-5 bg-booking-light rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-booking-light rounded w-2/3 mb-1"></div>
                  <div className="h-4 bg-booking-light rounded w-1/4"></div>
                </div>
                <div className="h-6 w-6 bg-booking-light rounded-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <RadioGroup
            value={selectedService}
            onValueChange={onServiceSelect}
            className="space-y-3"
          >
            {services.map((service) => (
              <div
                key={service.id}
                className={cn(
                  "flex items-center border rounded-lg p-4 transition-colors",
                  selectedService === service.id
                    ? "border-booking-primary bg-booking-light"
                    : "border-gray-200 hover:bg-gray-50"
                )}
              >
                <div className="flex-1">
                  <Label
                    htmlFor={`service-${service.id}`}
                    className={cn(
                      "text-base font-medium mb-1 block",
                      selectedService === service.id && "text-booking-primary"
                    )}
                  >
                    {service.name}
                  </Label>
                  <p className="text-gray-500 text-sm">{service.description}</p>
                  <div className="flex space-x-4 mt-2 text-sm">
                    <span className="text-booking-primary">
                      {service.duration} min
                    </span>
                    <span className="font-medium">
                      R$ {service.price.toFixed(2)}
                    </span>
                  </div>
                </div>
                <RadioGroupItem
                  value={service.id}
                  id={`service-${service.id}`}
                  className="text-booking-primary"
                />
              </div>
            ))}
          </RadioGroup>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceStep;
