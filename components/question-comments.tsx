'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

const GISCUS_REPO = process.env.NEXT_PUBLIC_GISCUS_REPO;
const GISCUS_REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
const GISCUS_CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
const GISCUS_CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;
const UTTERANCES_REPO =
  process.env.NEXT_PUBLIC_UTTERANCES_REPO ?? 'leksarodic/devops-interview-math-practice';

export function QuestionComments({ questionId }: { questionId: string }) {
  const giscusEnabled = Boolean(GISCUS_REPO && GISCUS_REPO_ID && GISCUS_CATEGORY && GISCUS_CATEGORY_ID);
  const utterancesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (giscusEnabled || !utterancesContainerRef.current) return;

    utterancesContainerRef.current.innerHTML = '';
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('repo', UTTERANCES_REPO);
    script.setAttribute('issue-term', `question-${questionId}`);
    script.setAttribute('label', 'question-discussion');
    script.setAttribute('theme', 'preferred-color-scheme');
    utterancesContainerRef.current.appendChild(script);
  }, [giscusEnabled, questionId]);

  return (
    <section className="panel">
      <h2 style={{ marginTop: 0 }}>Comments</h2>
      {giscusEnabled ? (
        <>
          <div className="giscus" />
          <Script
            src="https://giscus.app/client.js"
            data-repo={GISCUS_REPO}
            data-repo-id={GISCUS_REPO_ID}
            data-category={GISCUS_CATEGORY}
            data-category-id={GISCUS_CATEGORY_ID}
            data-mapping="specific"
            data-term={`question-${questionId}`}
            data-strict="1"
            data-reactions-enabled="1"
            data-emit-metadata="0"
            data-input-position="top"
            data-theme="preferred_color_scheme"
            data-lang="en"
            crossOrigin="anonymous"
            async
          />
        </>
      ) : (
        <>
          <div id="utterances-comments" ref={utterancesContainerRef} />
        </>
      )}
    </section>
  );
}
