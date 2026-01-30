import { skipRegisterOnboarding } from "@/actions";
import { OnboardingFormApi } from "@/interfaces";
import { onboardingSchema } from "@/schema/onboarding.schema";

interface Props {
  form: OnboardingFormApi;
  token?: string;
}

export const BirthdateStep = ({ form, token }: Props) => {

  const handleSubmit = (value: string) => {
    const result = onboardingSchema.shape.birthdate.safeParse(value);

    if (!result.success) {
      return result.error.issues[0].message;
    }
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 12);

  const maxDateISO = maxDate.toISOString().split("T")[0];

  const skipOboarding = async () => {
    await skipRegisterOnboarding(token || '');
  };

  return (
    <form.Field name="birthdate" validators={{ onSubmit: ({ value }) => handleSubmit(value) }}>
      {field => (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <input
              id="birthdate"
              type="date"
              value={field.state.value || ""}
              max={maxDateISO}
              onChange={e => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className={`input-field-text ${
                field.state.meta.errors.length
                  ? "input-field-text-error"
                  : ""
              }`}
              placeholder="Otontólogo de gallos de pelea"
            />
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