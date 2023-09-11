import { asset } from "$fresh/runtime.ts";
import { useDarkMode } from "../hooks/useDarkMode.ts";

export default function Footer() {
  useDarkMode();
  return (
    <footer className={"bg-black text-white p-8"}>
      <div className="p-8 max-w-4xl mx-auto">
        <div
          className={"flex justify-between items-center flex-wrap gap-y-4"}
        >
          <div>
            <p>
              Website by{" "}
              <a
                href="https://asqit.deno.dev"
                className={"underline"}
                target={"_blank"}
                rel={"external"}
              >
                Ondřej Tuček
              </a>
            </p>
            <a href="https://fresh.deno.dev" target="_blank" rel="external">
              <span className={"flex items-center gap-x-2"}>
                <img
                  src={asset("images/logo.svg")}
                  className={"w-[32px] aspect-square"}
                  alt={"Fresh framework logo"}
                />{" "}
                Made with <b>Fresh</b>
              </span>
            </a>
          </div>
          <div className={"md:text-right"}>
            <p>
              Feedback? Issue?{" "}
              <a
                rel="external"
                target="blank"
                className={"underline"}
                href={"https://github.com/asqit/deno-chatter"}
              >
                Let me know!
              </a>
            </p>
            <p>Copyright &copy; 2023</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
