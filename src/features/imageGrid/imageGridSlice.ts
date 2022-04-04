import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
 import { RootState } from '../../app/store';
import { fetchImages } from './imageGridAPI';

export interface ImageState {
  images: Array<{
      name:string,
      'poster-image':string
  }>;
  totalImageCount: number;
  fetchedImageCount: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ImageState = {
  images: [],
  totalImageCount: 0,
  fetchedImageCount:0,
  status: 'idle',
};

export const fetchImageAsync = createAsyncThunk(
  'imageGrid/fetchImages',
  async (pageNumber: number,{getState}:any) => {
    const { totalImageCount,fetchedImageCount } = getState().images;
    if(totalImageCount && fetchedImageCount === totalImageCount) return
    const response = await fetchImages(pageNumber);
    return response;
  }
);

export const imageGridSlice = createSlice({
  name: 'imageGrid',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImageAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImageAsync.fulfilled, (state, action:PayloadAction<any>) => {
        state.status = 'idle';
         state.images.push(...action.payload.page['content-items'].content);
         state.fetchedImageCount += +action.payload.page['page-size-returned'];
         state.totalImageCount = +action.payload.page['total-content-items'];
      });
  },
});

export const selectImages = (state: RootState) => state.images.images;
export const selectTotalImageCount = (state: RootState) => state.images.totalImageCount;
export const selectFetchedImageCount = (state: RootState) => state.images.fetchedImageCount;


export default imageGridSlice.reducer;
