import { ComponentType } from "react";
import { useForm } from "@tanstack/react-form";
import { OnboardingValues } from "@/schema/onboarding.schema";
import { defaultValues } from "@/config/steps-form";

const _createFormInstance = () => useForm({ defaultValues });

export type OnboardingFormApi = ReturnType<typeof _createFormInstance>;

export interface OnboardingStep {
  key?: keyof OnboardingValues;
  title: string;
  subtitle: string;
  component: ComponentType<{ form: OnboardingFormApi, token?: string }>;
  action?: "START" | "UPDATE" | "COMPLETE" | "SKIP" | "REGISTER" | "FINISH";
}

export interface OnboardingUpdateInput {
  name?: string;
  description?: string;
  profession?: string;
  birthdate?: string;
  image?: string;
};