'use client';

import Script from 'next/script';

const GISCUS_REPO = process.env.NEXT_PUBLIC_GISCUS_REPO;
const GISCUS_REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
const GISCUS_CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
const GISCUS_CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

export function QuestionComments({ questionId }: { questionId: string }) {
  const enabled = Boolean(GISCUS_REPO && GISCUS_REPO_ID && GISCUS_CATEGORY && GISCUS_CATEGORY_ID);

  if (!enabled) {
    return (
      <section className="panel">
        <h2 style={{ marginTop: 0 }}>Comments</h2>
        <p className="subtitle" style={{ marginBottom: 0 }}>
          Comments can be enabled with Giscus environment variables.
        </p>
      </section>
    );
  }

  return (
    <section className="panel">
      <h2 style={{ marginTop: 0 }}>Comments</h2>
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
    </section>
  );
}
