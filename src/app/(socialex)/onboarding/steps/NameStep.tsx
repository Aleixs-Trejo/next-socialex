import { OnboardingFormApi } from "@/interfaces";
import { useSession } from "@/lib/auth-client";
import { onboardingSchema } from "@/schema/onboarding.schema";

interface Props {
  form: OnboardingFormApi;
}

export const NameStep = ({ form }: Props) => {

  const handleChange = (value: string) => {
    if (!value)  {
      return 'El nombre es obligatorio';
    }

    const result = onboardingSchema.shape.name.safeParse(value);

    if (!result.success) {
      return result.error.issues[0].message;
    }
  };

  return (
    <form.Field name="name" validators={{ onSubmit: ({ value }) => handleChange(value) }}>
      {field => (
        <div className="flex flex-col gap-1">
          <input
            id="name"
            value={field.state.value ?? ""}
            onChange={e => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            className={`input-field-text ${
              field.state.meta.errors.length
                ? "input-field-text-error"
                : ""
            }`}
            placeholder="Ejm: Juanito Alcachofa"
          />
          {field.state.meta.errors.map(err => (
            <p key={err} className="text-red-500 text-xs">
              {err}
            </p>
          ))}
        </div>
      )}
    </form.Field>
  );
};