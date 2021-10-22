import { Article } from "../../../../interfaces";
import ArticleItem from "./ArticleItem/Components";

export default function ArticlePreview({ feeds }: { feeds: Article[] }) {
  return (
    <div>
      {feeds && feeds.length > 0 ? (
        feeds.map((feed) => (
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
