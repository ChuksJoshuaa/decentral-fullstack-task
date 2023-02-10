import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})


// //Update posts
// export const updatePost = (id, post) => async (dispatch) => {
//   try {
//     const { data } = await api.updatePost(id, post);
//     dispatch({ type: UPDATE, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };