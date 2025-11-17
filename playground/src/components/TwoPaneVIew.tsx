import { batch, children, createRenderEffect, createSignal, onMount } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import * as styles from "./TwoPaneView.css";
import { clsx } from "clsx";

interface TwoPaneViewProps {
  children: [JSX.Element, JSX.Element];
  containerStyle?: string;
  leftStyle?: string;
  rightStyle?: string;
  separatorStyle?: string;
  disableResponsiveLayout?: boolean;
}

function TwoPaneView(props: TwoPaneViewProps) {
  const c = children(() => props.children).toArray();
  if (c.length !== 2) {
    throw new Error("Expected exactly 2 children.");
  }

  const [isPortrait, setIsPortrait] = createSignal(window.innerHeight > window.innerWidth);
  const [leftContent, setLeftContent] = createSignal<JSX.Element>();
  const [rightContent, setRightContent] = createSignal<JSX.Element>();

  createRenderEffect(() => {
    batch(() => {
      setLeftContent(c[0]);
      setRightContent(c[1]);
    });
  });

  onMount(() => {
    const onResize = () => {
      setIsPortrait(props.disableResponsiveLayout ? false : window.innerHeight > window.innerWidth);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  return (
    <div style={{ 
      display: "grid",
      "grid-template-columns": isPortrait() ? "1fr" : "1fr 1fr",
      "grid-template-rows": isPortrait() ? "1fr 1fr" : "1fr",
      height: "100%",
      width: "100%"
    }} class={styles.twoPaneViewContainer}>
      <div>{leftContent()}</div>
      <div>{rightContent()}</div>
    </div>
  );
}

export default TwoPaneView;
