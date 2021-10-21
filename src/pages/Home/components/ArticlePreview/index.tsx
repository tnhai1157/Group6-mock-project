import ArticleItem from "./ArticleItem/Components";

export default function ArticlePreview({ feeds }: any) {
  return (
    <div>
      {feeds && feeds.length > 0 ? (
        feeds.map((feed: any) => (
          <div key={feed.slug}>
            <ArticleItem feed={feed} />
          </div>
        ))
      ) : (
        <p>No articles are here... yet.</p>
      )}
    </div>
  );
}
