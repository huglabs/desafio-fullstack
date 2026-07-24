interface AuthErrorAlertProps {
  message: string
  fieldErrors?: Record<string, string[]>
}

export function AuthErrorAlert({ message, fieldErrors = {} }: AuthErrorAlertProps) {
  const extras = Object.entries(fieldErrors).flatMap(([field, messages]) =>
    messages.map((msg) => ({ field, msg })),
  )

  const uniqueMessages = extras.map(({ msg }) => msg).filter((msg) => msg !== message)

  return (
    <div
      role="alert"
      className="border-destructive/35 bg-destructive/10 text-destructive rounded-xl border px-3.5 py-3 text-sm"
    >
      <p className="font-medium">{message}</p>
      {uniqueMessages.length > 0 && (
        <ul className="text-destructive/90 mt-1.5 list-inside list-disc space-y-0.5">
          {uniqueMessages.map((msg) => (
            <li key={msg}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
