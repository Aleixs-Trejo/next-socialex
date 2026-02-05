import { NameStep } from "@/app/(socialex)/onboarding/steps/NameStep";
import { PasswordStep } from "@/app/(socialex)/onboarding/steps/PasswordStep";
import { DescriptionStep } from "@/app/(socialex)/onboarding/steps/DescriptionStep";
import { OnboardingStep } from "@/interfaces";
import { ProfessionStep } from "@/app/(socialex)/onboarding/steps/ProfessionStep";
import { BirthdateStep } from "@/app/(socialex)/onboarding/steps/BirthdateStep";
import { ImageStep } from "@/app/(socialex)/onboarding/steps/ImageStep";

export const defaultValues = {
  name: "",
  password: "",
  description: "",
  profession: "",
  birthdate: "",
  image: "/img/user-profile-default.avif"
};

export const onboardingSteps: OnboardingStep[] = [
  {
    key: "password",
    title: 'Contraseña',
    subtitle: 'Ingresa alguna contraseña segura',
    component: PasswordStep,
    action: "REGISTER",
  },
  {
    key: "name",
    title: 'Nombre',
    subtitle: 'Ingresa un nombre apropiado dentro de la plataforma',
    component: NameStep,
    action: "UPDATE"
  },
  {
    key: "description",
    title: 'Descripción',
    subtitle: '¿Alguna descripción de ti?, puedes omitir si deseas',
    component: DescriptionStep,
    action: "UPDATE"
  },
  {
    key: "profession",
    title: 'Profesión',
    subtitle: '¿Qué eres en esta vida?',
    component: ProfessionStep,
    action: "UPDATE"
  },
  {
    key: "birthdate",
    title: 'Fecha de nacimiento',
    subtitle: '¿Eres un mocoso aún?',
    component: BirthdateStep,
    action: "UPDATE"
  },
  {
    key: "image",
    title: 'Imagen',
    subtitle: 'Usa alguna foto falsa si quieres',
    component: ImageStep,
    action: "FINISH"
  },
];