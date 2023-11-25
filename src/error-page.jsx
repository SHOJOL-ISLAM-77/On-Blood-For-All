import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      className="h-screen bg-contain bg-center w-auto"
      style={{
        backgroundImage: "url('/public/404.gif')",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        id="error-page"
        className="h-screen flex justify-center flex-col gap-9 text-[#4c84f5] backdrop-blur-sm bg-black/20 items-center"
      >
        <h1 className="text-6xl font-bold">Oops!</h1>
        <i className="text-5xl font-bold">{404}</i>
        <p className="text-3xl">Sorry, an unexpected error has occurred.</p>
        <p>
          <i className="text-4xl">{error.statusText || error.message}</i>
        </p>

        <Link to="/" className="text-2xl bg-zinc-800 py-4 px-9 rounded-2xl">
          Go Home
        </Link>
      </div>
    </div>
  );
}
