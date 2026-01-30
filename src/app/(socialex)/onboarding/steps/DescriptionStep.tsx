import { skipRegisterOnboarding } from "@/actions/auth/skip-register-onboarding";
import { OnboardingFormApi } from "@/interfaces";
import { onboardingSchema } from "@/schema/onboarding.schema";

interface Props {
  form: OnboardingFormApi;
  token?: string;
}

export const DescriptionStep = ({ form, token }: Props) => {

  const handleSubmit = (value: string) => {
    const result = onboardingSchema.shape.description.safeParse(value);

    if (!result.success) {
      return result.error.issues[0].message;
    }
  };

  const skipOboarding = async () => {
    await skipRegisterOnboarding(token || '');
  };

  return (
    <form.Field name="description" validators={{ onSubmit: ({ value }) => handleSubmit(value) }}>
      {field => (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <textarea
              id="description"
              value={field.state.value ?? ""}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className={`input-field-text resize-none ${
                field.state.meta.errors.length
                  ? "input-field-text-error"
                  : ""
              }`}
              placeholder="Ejm: Me gustan los gatos..."
            ></textarea>
            {field.state.meta.errors.map(err => (
              <p key={err} className="text-red-500 text-xs">
                {err}
              </p>
            ))}
          </div>
          <button type="button" className="text-bright text-sm text-right cursor-pointer hover:underline" onClick={skipOboarding}>Saltar</button>
        </div>
      )}
    </form.Field>
  );
};