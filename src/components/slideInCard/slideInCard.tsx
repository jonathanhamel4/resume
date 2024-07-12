import { CSSProperties, useEffect, useRef, useState } from "react"
import { useOnScreen } from "../../hooks/use-on-screen"
import styles from './slideInCard.module.css';
import classNames from "classnames";

export function SlideInCard({children, style}: React.PropsWithChildren<{style?: CSSProperties}>) {
    const ref = useRef<HTMLDivElement>(null);
    const [permanentlyVisible, setPermanentlyVisible] = useState(false);
    const visible = useOnScreen(ref)

    useEffect(() => {
        if (visible && !permanentlyVisible) {
            setPermanentlyVisible(true);
        }
    }, [visible])
    
    return (
        <div ref={ref} style={style} className={classNames([styles.Card, permanentlyVisible && styles.Visible])}>
            {children}
        </div>
    )
}