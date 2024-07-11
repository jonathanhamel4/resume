import { useEffect, useState } from "react";
import { useApi } from "../../utilities/apiService";
import styles from "./footer.module.css";
import classNames from "classnames";
import { useLinks } from "../../utilities/linkService";

export function Footer() {
  const api = useApi();
  const [latestSha, setLatestSha] =
    useState<Awaited<ReturnType<typeof api.getLatestCommit>>>(null);
  const links = useLinks();

  useEffect(() => {
    api.getLatestCommit().then((sha) => {
      setLatestSha(sha);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.footer}>
      <div className={styles.footerRow}>
        <p>
          Made with
          <i
            className={classNames({
              fa: true,
              "fa-heart": true,
              [styles.heart]: true,
            })}
          ></i>
          in Montréal
        </p>
        <p className={classNames([styles.iconRow, styles.latestSha])}>
          <a target="__blank" href={latestSha?.link}>
            <i className="fa fa-github"></i>
            <span className={styles.sha}>{latestSha?.sha}</span>
          </a>
        </p>
        <p className={styles.iconRow}>
          {links.socialLinks.map((link, index) => {
            return (
              <a
                key={link.display}
                className={classNames([styles.aboutLink, styles.anchor])}
                target="__blank"
                href={link.href}
              >
                <span className={styles.linkDisplay}>{link.display}</span>
                {index !== links.socialLinks.length - 1 && (
                  <span className={styles.linkSeparator}>|</span>
                )}
                <i className={classNames([styles.linkIcon, link.icon])}></i>
              </a>
            );
          })}
        </p>
      </div>
    </div>
  );
}
