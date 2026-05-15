import { useState } from "react";

// LessonTabs: a small reusable tab bar.
//   <LessonTabs tabs={[{id, label, render: () => <…/>}]} initial="learn" />
//
// Tabs is an array; render() is called when its tab is active. State is local
// to the component, so switching tabs preserves nothing across mounts. If you
// need persistent state inside a tab, keep it in the parent and pass it in.

export default function LessonTabs({ tabs, initial }) {
  const [active, setActive] = useState(initial ?? tabs[0].id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <>
      <div className="lesson-tabs" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === active}
            className={`lesson-tab ${t.id === active ? "active" : ""}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="lesson-tab-panel" role="tabpanel">
        {current.render()}
      </div>
    </>
  );
}
