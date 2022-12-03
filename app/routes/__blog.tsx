import { json } from "@remix-run/node";
import { Link, NavLink, Outlet } from "@remix-run/react";
import ROUTERS from "~/constants/routers";
import { getPublishPosts } from "~/models/note.server";
import type { LinksFunction } from "@remix-run/server-runtime";

import lineWavy from "~/styles/line-wavy.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: lineWavy }];
};

export async function loader() {
  const postArticles = await getPublishPosts();

  return json({ postArticles });
}

export default function BlogIndex() {
  return (
    <main className="bg-slate-800">
      <div className="mx-auto md:max-w-3xl lg:max-w-5xl 2xl:max-w-7xl">
        <header className="flex text-lg items-center justify-between px-4 py-4 md:px-0 sm:px-3">
          <Link to={ROUTERS.ROOT} title='Home'>
            <img
              alt="Blog Logo"
              src="/assets/images/logo.webp"
              width="75"
              height="50"
            />
          </Link>
          <nav className="flex items-center gap-8 font-bold dark:text-gray-400">
            <NavLink
              className={({ isActive }) =>
                `pb-2 decoration-wavy hover:underline ${
                  isActive ? "underline" : ""
                }`
              }
              to={ROUTERS.ROOT}
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
              `pb-2 decoration-wavy hover:underline ${
                isActive ? "underline" : ""
              }`
            }
              to={ROUTERS.ABOUT_ME}
            >
              About me
            </NavLink>
          </nav>
        </header>

        <Outlet />
      </div>
      <hr className="line-wavy" style={{ margin: 0 }} />
      <footer className="p-4 text-center text-lg dark:text-gray-300">
        Made with <span className="text-red">&#10084;</span> by Phat Truong
      </footer>
    </main>
  );
}