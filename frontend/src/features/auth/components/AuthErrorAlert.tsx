interface AuthErrorAlertProps {
  message: string
  fieldErrors?: Record<string, string[]>
}

export function AuthErrorAlert({ message, fieldErrors = {} }: AuthErrorAlertProps) {
  const extras = Object.entries(fieldErrors).flatMap(([field, messages]) =>
    messages.map((msg) => ({ field, msg })),
  )

  const uniqueMessages = extras
    .map(({ msg }) => msg)
    .filter((msg) => msg !== message)

  return (
    <div
      role="alert"
      className="rounded-xl border border-destructive/35 bg-destructive/10 px-3.5 py-3 text-sm text-destructive"
    >
      <p className="font-medium">{message}</p>
      {uniqueMessages.length > 0 && (
        <ul className="mt-1.5 list-inside list-disc space-y-0.5 text-destructive/90">
          {uniqueMessages.map((msg) => (
            <li key={msg}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
