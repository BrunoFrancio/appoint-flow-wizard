
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CustomerInfo } from "@/types/appointment";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface InfoStepProps {
  customerInfo: CustomerInfo;
  onInfoSubmit: (data: CustomerInfo) => void;
  onNext: () => void;
}

const formSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z
    .string()
    .min(10, { message: "Telefone deve ter pelo menos 10 dígitos" })
    .regex(/^\d+$/, { message: "Apenas números são permitidos" }),
  notes: z.string().optional(),
});

const InfoStep: React.FC<InfoStepProps> = ({
  customerInfo,
  onInfoSubmit,
  onNext,
}) => {
  const form = useForm<CustomerInfo>({
    resolver: zodResolver(formSchema),
    defaultValues: customerInfo,
  });

  const onSubmit = (data: CustomerInfo) => {
    onInfoSubmit(data);
    onNext();
  };

  return (
    <Card className="border-booking-accent/20">
      <CardContent className="pt-6">
        <h3 className="text-xl font-medium text-center mb-6">
          Preencha seus dados
        </h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="seu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="(00) 00000-0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Informações adicionais relevantes para o atendimento"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4 hidden">
              <button type="submit">Próximo</button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default InfoStep;
