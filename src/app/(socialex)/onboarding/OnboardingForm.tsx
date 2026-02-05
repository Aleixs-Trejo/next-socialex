'use client';

import { useState, useMemo, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { onboardingSteps } from "@/config/steps-form";
import { updateRegisterOnboarding } from "@/actions";
import { registerPassword } from "@/actions";
import { finishOnboarding } from "@/actions";
import { redirect } from "next/navigation";
import { useUIStore } from "@/stores";
import { useRouter } from "next/navigation";

interface Props {
  token: string;
  defaultValues: {
    name: string;
    password: string;
    birthdate: string;
    image: string;
    description: string;
    profession: string;
  };
  hasRegister: boolean;
}

export const OnboardingForm = ({ token, defaultValues, hasRegister }: Props) => {
  const isFinishOnboarding = useUIStore(state => state.isFinishOnboarding);
  const setIsFinishOnboarding = useUIStore(state => state.setIsFinishOnboarding);

  const router = useRouter();
  const [stepIdx, setStepIdx] = useState(0);
  const steps = useMemo(() => {
    return onboardingSteps.filter(step => {
      if (step.key === "password" && hasRegister) return false;
      return true;
    });
  }, [hasRegister]);

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => console.log('Validando datos...'),
  });

  const step = steps[stepIdx];
  // if (!step) redirect('/auth/register');

  const StepComponent = step.component;

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues]);

  const goNext = async () => {
    if (step.key) {
      const errors = await form.validateField(step.key, "submit");
      if (errors.length > 0) return;
    }

    const values = form.state.values;

    switch (step.action) {
      case "REGISTER":
        await registerPassword({
          password: values.password, 
          token, 
        });
        break;
      case "UPDATE":
        await updateRegisterOnboarding(values, token);
        router.refresh();
        break;
      case "FINISH":
        setIsFinishOnboarding(true);
        await finishOnboarding(values.image, token);
        router.refresh();
        window.location.replace('/socialex/profile');
        break;
    }

    if (stepIdx < steps.length - 1) {
      setStepIdx(i => i + 1);
    } else {
      form.handleSubmit();
    }
  };

  const goPrev = () => {
    if (stepIdx > 1) {
      setStepIdx(i => i - 1);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-6">
      <h2 className="text-xl font-semibold max-w-full">
        {step.title}
      </h2>
      <div className="flex flex-col gap-2">
        <label htmlFor={step.key} className="label-text">{step.subtitle}</label>
        <StepComponent form={form} token={token} />
      </div>
      <div className="flex items-center gap-4 justify-between">
        <button className={`text-white px-6 py-2 hover:bg-quaternary cursor-pointer transition-colors duration-300 rounded-4xl ${(stepIdx === 1 || stepIdx === 0) ? 'btn-disabled' : ''}`} onClick={goPrev} disabled={(stepIdx === 1 || stepIdx === 0 || isFinishOnboarding)}>Volver</button>
        <button className={`${isFinishOnboarding ? 'btn-disabled' : 'btn-primary'} transition-colors duration-300`} onClick={goNext} disabled={isFinishOnboarding}>{isFinishOnboarding ? 'Cargando...' : 'Siguiente'}</button>
      </div>
    </div>
  );
};

