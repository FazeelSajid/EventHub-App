import {useDispatch, useSelector} from 'react-redux';
import {addBookmark, removeBookmark} from '../statesSlices/BookmarksSlice';

const useApp = () => {
  const dispatch = useDispatch();

  const Bookmarks = useSelector(state => state.BookmarksSlice);

  const addBookmarks = (Bookmark) => {
    dispatch(addBookmark(Bookmark));
  };
  const removeBookmarks = (BookmarkId) => {
    dispatch(removeBookmark(BookmarkId));
  };
  return {
    
    Bookmarks,
    addBookmarks,
    removeBookmarks,
  };
};

export default useApp;
