import { useForm } from "@tanstack/react-form";
import { ClientSchema } from "../schema/clientSchema";
import { useClients, useCreateClient } from "../features/clients/hooks";
import { z } from "zod";

type FormValues = z.infer<typeof ClientSchema>;

export default function AddClient() {
  const createClient = useCreateClient();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      budget: 0,
      status: "new" as FormValues["status"],
    },
    onSubmit: async ({ value }) => {
      await createClient.mutateAsync(value);
    },
    validators: {
      onBlur: ClientSchema,
      onSubmit: ClientSchema,
    },
  });
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <TextInput placeholder="Jane" name="name" form={form} />
        <TextInput placeholder="jane@email.com" name="email" form={form} />
        <TextInput placeholder="Binex" name="company" form={form} />
        <form.Field name="budget">
          {(field: any) => {
            const { errors } = field.state.meta;
            return (
              <div>
                <input
                  id="budget"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  onBlur={field.handleBlur}
                  placeholder="100$"
                  type="number"
                />
                {errors.length > 0 && (
                  <span className="text-red-600">{errors[0]?.message}</span>
                )}
              </div>
            );
          }}
        </form.Field>
        <form.Field name="status">
          {(field: any) => {
            const { errors } = field.state.meta;
            return (
              <div className="flex flex-col gap-1">
                <select
                  id="status"
                  value={field.state.value}
                  onChange={(e) =>
                    field.handleChange(
                      e.target.value as "new" | "contacted" | "closed",
                    )
                  }
                  onBlur={field.handleBlur}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
                {errors.length > 0 && (
                  <span className="text-red-600">{errors[0]?.message}</span>
                )}
              </div>
            );
          }}
        </form.Field>
        <button type="submit">Submit</button>
      </form>
      {/* Temporary */}
      <ClientList />
    </div>
  );
}

function ClientList() {
  const { data, isLoading } = useClients();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data?.map((client) => (
        <div key={client.email}>
          <p>Name: {client.name}</p>
          <p>Email: {client.email}</p>
          <p>Company: {client.company}</p>
          <p>Budget: {client.budget}</p>
          <p>Status: {client.status}</p>
        </div>
      ))}
    </div>
  );
}

function TextInput({
  name,
  placeholder,
  form,
}: {
  name: string;
  placeholder: string;
  form: any;
}) {
  return (
    <form.Field name={name}>
      {(field: any) => {
        const { errors } = field.state.meta;
        return (
          <div className="flex flex-col gap-1">
            <input
              placeholder={placeholder}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
            {errors.length > 0 && (
              <span className="text-red-600">{errors[0]?.message}</span>
            )}
          </div>
        );
      }}
    </form.Field>
  );
}
