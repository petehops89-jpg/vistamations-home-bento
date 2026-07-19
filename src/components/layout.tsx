import { useEffect, useMemo, useState, useCallback } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { TabKey } from "../App";
import {
  ContactLayouts,
  AboutLayout,
  ProjectsLayouts,
  keys,
} from "../utils/layout.helper";

interface LayoutProps {
  tab: TabKey;
  setTab: React.Dispatch<React.SetStateAction<TabKey>>;
  left?: number;
  sliderWidth?: number;
}

const STORAGE_KEY = "vistamations-layouts";

function loadSavedLayouts(): Record<string, any> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Failed to load saved layouts:", e);
  }
  return {};
}

function Layout({ tab }: LayoutProps) {
  const [currentLayout, setCurrentLayout] = useState(AboutLayout);
  const [savedLayouts, setSavedLayouts] = useState<Record<string, any>>(loadSavedLayouts);

  useEffect(() => {
    const tabKey = tab as string;
    if (savedLayouts[tabKey]) {
      setCurrentLayout(savedLayouts[tabKey]);
    } else {
      switch (tab) {
        case TabKey.Projects:
          setCurrentLayout(ProjectsLayouts);
          break;
        case TabKey.About:
          setCurrentLayout(AboutLayout);
          break;
        case TabKey.Contact:
          setCurrentLayout(ContactLayouts);
          break;
        default:
          setCurrentLayout(AboutLayout);
      }
    }
  }, [tab]);

  const onLayoutChange = useCallback(
    (_layout: any, allLayouts: any) => {
      const tabKey = tab as string;
      const updated = { ...savedLayouts, [tabKey]: allLayouts };
      setSavedLayouts(updated);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save layouts:", e);
      }
    },
    [tab, savedLayouts]
  );

  const ResponsiveReactGridLayout = useMemo(
    () => WidthProvider(Responsive),
    []
  );

  return (
    <div className="w-auto max-w-[1280px] mx-auto flex justify-between b-10">
      <ResponsiveReactGridLayout
        className="m-auto w-full"
        breakpoints={{ xl: 1920, lg: 1200, md: 768, sm: 480, xs: 200 }}
        cols={{ xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
        rowHeight={300}
        layouts={currentLayout}
        onLayoutChange={onLayoutChange}
      >
        {keys.map((key) => (
          <div
            key={key}
            className="flex justify-center items-center shadow-[inset_0_0_0_2px_rgba(0,0,0,0)] rounded-3.5xl text-2xl text-[#FFFFFF] visible cursor-grab active:cursor-grabbing fade-in"
          >
            <Block keyProp={"Tile " + key} />
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
}

const Block = ({ keyProp }: { keyProp: string }) => {
  const [label, keyPart] = keyProp.split(" ");

  return (
    <div
      style={{ backgroundColor: "rgba(20, 20, 20, 0.65)" }}
      className="h-full w-full flex flex-col justify-center items-center p-6 text-[var(--black-1)] rounded-3xl"
    >
      <span>
        <span className="normal-case">{label}</span>{" "}
        <span className="uppercase">{keyPart}</span>
      </span>
    </div>
  );
};

export default Layout;
