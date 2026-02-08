import AppLogoIcon from "./app-logo-icon"

export default function AppLogo() {
  return (
    <>
      <div className="flex shrink-0 items-center justify-center">
        <AppLogoIcon className="size-9 text-cyan-400" />
      </div>
      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="arc-text mb-0.5 truncate leading-tight font-semibold transition-colors duration-300">
          {import.meta.env.VITE_APP_NAME ?? "Jarvis"}
        </span>
      </div>
    </>
  )
}
