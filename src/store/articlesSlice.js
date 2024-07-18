import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticles } from '../services/nytimesService';

export const fetchArticlesThunk = createAsyncThunk(
  'articles/fetchArticles',
  async (period) => {
    const articles = await fetchArticles(period);
    return articles;
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    period: 1,
    currentPage: 1,
  },
  reducers: {
    setPeriod(state, action) {
      state.period = action.payload;
      state.currentPage = 1; // Reset to first page when period changes
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticlesThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchArticlesThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setPeriod, setCurrentPage } = articlesSlice.actions;

export default articlesSlice.reducer;
