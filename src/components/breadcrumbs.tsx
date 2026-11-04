import Link from "next/link";
import { Fragment } from "react";

export function Breadcrumbs({
  links,
  current,
}: {
  links: { label: string; href: string }[];
  current: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className="container-page py-4 lg:py-6">
      <ol className="meta flex flex-wrap items-center gap-2">
        {links.map((link) => (
          <Fragment key={link.href}>
            <li>
              <Link href={link.href} className="link-quiet">
                {link.label}
              </Link>
            </li>
            <li aria-hidden>/</li>
          </Fragment>
        ))}
        <li aria-current="page" className="text-ink">
          {current}
        </li>
      </ol>
    </nav>
  );
}
