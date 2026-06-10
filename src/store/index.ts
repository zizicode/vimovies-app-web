import { useMoviesStore } from "./api/media.store";
import { useGenresStore } from "./api/genres.store";
import { usePlatformsStore } from "./api/platforms.store";
import { useArticlesStore } from "./api/articles.store";
import { usePeopleStore } from "./api/people.store";
import { usePageLoaderStore } from "./pageLoader.store";

const Store = {
  useMoviesStore,
  useGenresStore,
  usePlatformsStore,
  useArticlesStore,
  usePeopleStore,
  usePageLoaderStore,
};

export default Store;